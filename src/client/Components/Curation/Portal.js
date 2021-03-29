import React, { useEffect, useState, useRef } from 'react';
import { useStoreState } from 'easy-peasy';
import { apiUrl } from '../../baseUrl';

import Resizer from '../Tools/Resizer.js';
import Curation from './Curation';
import DecidedBlock from './DecidedBlock';

import '../../styles.scss';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function Portal() {
  const small = useStoreState(state => state.app.small);
  const cols = useStoreState(state => state.app.cols);
  const auth = useStoreState(state => state.user.auth);

  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [viewTab, setViewTab] = useState('curate');
  const [resultsTab, setResultsTab] = useState('unminted');
  const [adminTab, setAdminTab] = useState(false);
  useEffect(() => {
    fetch(`${ apiUrl() }/program/getCurationPrograms`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json())
    .then(json => setPrograms(json.success || []));
  }, [])

  const [applicants, setApplicants] = useState({});
  const [results, setResults] = useState([]);
  const loadCuration = async program => {
    setSelectedProgram(program);
    setApplicants({});
    await fetch(`${ apiUrl() }/program/viewAllApplications`, {
      method: 'POST',
      body: JSON.stringify({ program: program._id }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
    .then(res => res.json())
    .then(json => setApplicants({
      ...json,
      unapproved: shuffle(json.unapproved),
    }))

    await fetch(`${ apiUrl() }/program/viewResults`, {
      method: 'POST',
      body: JSON.stringify({ program: program._id }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
    .then(res => res.json())
    .then(json => setResults(json))
  }

  const [programAdmin, setProgramAdmin] = useState({});
  useEffect(() => {
    if (adminTab && selectedProgram) {
      setProgramAdmin({});
      fetch(`${ apiUrl() }/program/getProgramAdmin`, {
        method: 'POST',
        body: JSON.stringify({ program: selectedProgram.id }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })
      .then(res => res.json())
      .then(json => setProgramAdmin(json))
    }
  }, [adminTab]);

  const decide = (type) => {
    const id = applicants.unapproved[0].id;
    let update;
    const unapproved = applicants.unapproved.slice(1);
    if (type === 'approve') {
      const approved = [applicants.unapproved[0], ...applicants.approved];
      update = {
        ...applicants,
        unapproved,
        approved
      }
    } else if (type === 'reject') {
      const rejected = [applicants.unapproved[0], ...applicants.rejected];
      update = {
        ...applicants,
        unapproved,
        rejected
      }
    }

    setApplicants(update);
    fetch(`${ apiUrl() }/program/approveOrReject`, {
      method: 'POST',
      body: JSON.stringify({ id, type }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
    .then(res => res.json())
    .then(json => {})
  }

  const undo = (id, type) => {
    let update;
    if (type === 'approve') {
      const index = applicants.approved.findIndex(e => e.id === id);
      const unapproved = [applicants.approved[index], ...applicants.unapproved];
      update = {
        ...applicants,
        unapproved,
        approved: [
          ...applicants.approved.slice(0, index),
          ...applicants.approved.slice(index + 1)
        ]
      }
    } else if (type === 'reject') {
      const index = applicants.rejected.findIndex(e => e.id === id);
      const unapproved = [applicants.rejected[index], ...applicants.unapproved];
      update = {
        ...applicants,
        unapproved,
        rejected: [
          ...applicants.rejected.slice(0, index),
          ...applicants.rejected.slice(index + 1)
        ]
      }
    }
    console.log(type, update);
    setApplicants(update);
    fetch(`${ apiUrl() }/program/undoApplicant`, {
      method: 'POST',
      body: JSON.stringify({ id, type }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
    .then(res => res.json())
    .then(json => {})
  }


  const [foundUsers, setFoundUsers] = useState([]);
  const [search, setSearch] = useState(false);
  const [criteria, setCriteria] = useState(false);
  const searchUsers = (search) => {
    if (!search) setFoundUsers([]);
    else {
      fetch(`${ apiUrl() }/searchUsers`, {
        method: 'POST',
        body: JSON.stringify({ user: search }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })
      .then(res => res.json())
      .then(json => setFoundUsers(json))
    }
  }

  const addRemoveCurator = (type, curator) => {
    let update;
    if (type === 'add') {
      setSearch(false);
      programAdmin.curators.push(curator);
      update = {
        ...programAdmin,
        curators: programAdmin.curators
      }
    } else if (type === 'remove') {
      const index = applicants.rejected.findIndex(e => e.id === curator.id);
      update = {
        ...programAdmin,
        curators: [
          ...applicants.rejected.slice(0, index),
          ...applicants.rejected.slice(index + 1)
        ]
      }
    }

    setProgramAdmin(update);
    fetch(`${ apiUrl() }/program/addRemoveCurator`, {
      method: 'POST',
      body: JSON.stringify({ program: selectedProgram.id, curator: curator.id, type }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
    .then(res => res.json())
    .then(json => {})
  }

  console.log(selectedProgram);
  const isAdmin = selectedProgram && selectedProgram.organizers[0].admins.find(e => e === auth.id)

  return (
    <div className='content-block'>
      <Resizer />
      <div className='text-l flex'>
        Curation Portal
        <div className='flex-full' />
        { isAdmin &&
          <div className='text-s center'>
            <div className='text-grey pointer text-right' onClick={ () => setAdminTab(!adminTab) }>{ adminTab ? 'Close Admin' : 'Curation Admin' }</div>
          </div>
        }
      </div>
      <div className='text-s margin-top-s'>
        Let's highlight great art.
      </div>
      { !selectedProgram ?
        programs.map((program, index) => {
          return (
            <div key={ index } className='button' onClick={ () => loadCuration(program) } >
              <div className='text-xs'>{ program.organizers[0].name }</div>
              <span>{ program.name }</span>
            </div>
          );
        })
      :
        <div className='margin-top flex'>
          <div className='margin-right-s'>
            <div className='small-button' onClick={ () => { setSelectedProgram(null); setAdminTab(false); } }>Back</div>
          </div>
          <div className='flex-full center'>
            <div className='text-xs'>{ selectedProgram.organizers[0].name }</div>
            <div className='text-m'>{ selectedProgram.name }{ viewTab === 'results' ? ' Results' : ' Curation' }</div>
          </div>
          <div className='small-space' />
          <div>
            { viewTab === 'results' ?
              <div className='small-button' onClick={ () => setViewTab('curate') }>Curation</div>
            :
              <div className='small-button' onClick={ () => setViewTab('results') }>Results</div>
            }
          </div>
        </div>
      }
      { (selectedProgram && adminTab) &&
        <div className='margin-top'>
          Curation Settings
          <div className='margin-top text-mid flex'>
            <div>
              <div className='text-s'>
                Exhibition Criteria
              </div>
              { selectedProgram.passByVotes ?
                <div>{ selectedProgram.voteThreshold } Votes Needed</div>
                :
                <div>Top { selectedProgram.topThreshold } Submissions</div>
              }
            </div>
            <div className='small-button margin-left-s' onClick={ () => setCriteria(!criteria) }>{ criteria ? 'Save' : 'Edit' }</div>
            <div className='flex-full' />
          </div>
          { criteria &&
            <div>
              <div className='text-s margin-top form__title'>Selection Type</div>
              <div className='select-dropdown margin-top-minus'>
                <select name='Mint' className='text-black' defaultValue={ `${ selectedProgram.passByVotes }` } value={ `${ selectedProgram.passByVotes }` } required onChange={e => setNewCriteria({ ...newCriteria, passByVotes: e.target.value })}>
                  <option value='default' disabled hidden>
                    Select an option
                  </option>
                  <option value='false'>Top Submissions</option>
                  <option value='true'>Vote Count</option>
                </select>
              </div>
              <div className='form__group field'>
                <input type='number' className='form__field' placeholder='Number' name='number' id='number' maxLength='4' onChange={e => setNewCriteria({ ...newCriteria, number: e.target.value }) } />
                <label className='form__label'>Number</label>
              </div>
            </div>
          }
          <div className='margin-top text-mid'>
            Curators:
            <div className='small-button margin-left-s' onClick={ () => setSearch(!search) }>{ search ? 'Close' : 'Add' }</div>
            { search &&
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Search' name='search' id='search' maxLength='100' onChange={e => searchUsers(e.target.value) } />
                <label className='form__label'>Search by name or username</label>
              </div>
            }
          </div>
          { (search && programAdmin && foundUsers) &&
            <div>
              { foundUsers.map((item, index) => {
                return (
                <div key={ index } className='margin-top-s flex'>
                  <div>
                    <div className='text-xs'>{ item.username }</div>
                    <div className='text-s'>{ item.first } { item.last }</div>
                  </div>
                  <div className='margin-left-s'>
                    <div className='text-grey text-xs pointer' onClick={ () => addRemoveCurator('add', item) }>
                      - Add
                    </div>
                  </div>
                </div>);
              })}
            </div>
          }
          { (!search && programAdmin && programAdmin.curators) &&
            <div>
              { programAdmin.curators.map((item, index) => {
                return (
                <div key={ index } className='margin-top-s flex'>
                  <div>
                    <div className='text-xs'>{ item.username }</div>
                    <div className='text-s'>{ item.first } { item.last }</div>
                  </div>
                  { auth.id !== item.id &&
                    <div className='margin-left-s'>
                      <div className='text-grey text-xs pointer' onClick={ () => addRemoveCurator('remove', item) }>
                        - Remove
                      </div>
                    </div>
                  }
                </div>);
              })}
            </div>
          }
        </div>
      }
      { (selectedProgram && !adminTab) &&
        <div>
          { viewTab !== 'results' &&
            <div className='flex margin-top-s'>
              <div className={ viewTab === 'curate' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => setViewTab('curate') }>
                Curate
              </div>
              <div className='info-block-space' />
              <div className={ viewTab === 'approved' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => setViewTab('approved') }>
                Approved
              </div>
              <div className='info-block-space' />
              <div className={ viewTab === 'rejected' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => setViewTab('rejected') }>
                Declined
              </div>
            </div>
          }
          { viewTab === 'results' &&
            <div>
              <div className='flex margin-top-s'>
                <div className={ resultsTab === 'unminted' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => setResultsTab('unminted') }>
                  Unminted
                </div>
                <div className='info-block-space' />
                <div className={ resultsTab === 'minted' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => setResultsTab('minted') }>
                  Minted
                </div>
              </div>
              <div className='margin-top-s'>
                <React.Fragment key={ results.length }>
                  <masonry-layout cols={ cols }>
                    { results.map((item, index) => {
                        if ((resultsTab === 'minted' && item.published) || (resultsTab === 'unminted' && !item.published))
                          return (<DecidedBlock key={ index } nft={ item } undo={ undo } type='approve' />);
                    }) }
                  </masonry-layout>
                </React.Fragment>
              </div>
            </div>
          }
          { (viewTab === 'curate') &&
            <div className='margin-top-s'>
              { (applicants && applicants.unapproved && applicants.unapproved.length) ?
                <div>
                  Remaining: { applicants.unapproved.length }
                  <div className='flex margin-top-s'>
                    <div className='small-button flex-full' onClick={ () => decide('approve') }>
                      Approve
                    </div>
                    <div className='info-block-space' />
                    <div className='small-button flex-full' onClick={ () => decide('reject') }>
                      Decline
                    </div>
                  </div>
                  <React.Fragment key={ applicants.unapproved[0].id }>
                    <Curation nft={ applicants.unapproved[0] } small={ small } />
                  </React.Fragment>
                </div>
              :
                <div className='margin-top center'>
                  Whew, you've gone through all of the submissions!
                  <div className='margin-top' />
                </div>
              }
            </div>
          }
        </div>
      }
      { (viewTab === 'approved' && selectedProgram && !adminTab) &&
        <div className='margin-top-s'>
          { applicants && applicants.approved &&
            <div>
              Total: { applicants.approved.length }
              <div className='margin-top-s' />
              <React.Fragment key={ applicants.approved.length }>
                <masonry-layout cols={ cols }>
                  { applicants.approved.map((item, index) => {
                      return (<DecidedBlock key={ index } nft={ item } undo={ undo } type='approve' />);
                  }) }
                </masonry-layout>
              </React.Fragment>
            </div>
          }
        </div>
      }
      { (viewTab === 'rejected' && selectedProgram && !adminTab) &&
        <div className='margin-top-s'>
          { applicants && applicants.rejected &&
            <div>
              Total: { applicants.rejected.length }
              <div className='margin-top-s' />
              <React.Fragment key={ applicants.rejected.length }>
                <masonry-layout cols={ cols }>
                  { applicants.rejected.map((item, index) => {
                      return (<DecidedBlock key={ index } nft={ item } undo={ undo } type='reject' />);
                  }) }
                </masonry-layout>
              </React.Fragment>
            </div>
          }
        </div>
      }
    </div>
  );
}
