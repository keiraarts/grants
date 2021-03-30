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
  const [filteredResults, setFilteredResults] = useState({ mintable: [], unmintable: [] });
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [newCriteria, setNewCriteria] = useState(false);

  useEffect(() => {
    let filtered = { mintable: [], unmintable: [] };
    if (results && results.length && selectedProgram) {
      let i = 0;
      results.forEach(result => {
        if (selectedProgram.passByVotes && !result.published) {
          if (result.approvalCount >= selectedProgram.voteThreshold) filtered.mintable.push(result);
          else filtered.unmintable.push(result);
        } else if (!result.published) {
          if (i < selectedProgram.topThreshold) filtered.mintable.push(result);
          else filtered.unmintable.push(result);
          i++;
        }
      });
    } else filtered = { mintable: [], unmintable: [] }

    setFilteredResults(filtered);
  }, [results, selectedProgram]);

  const loadCuration = program => {
    setSelectedProgram(program);
    setNewCriteria({ passByVotes: program.passByVotes, blindVoting: program.blindVoting, topThreshold: program.topThreshold, voteThreshold: program.voteThreshold });
    setApplicants({});
    fetch(`${ apiUrl() }/program/viewAllApplications`, {
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

    fetch(`${ apiUrl() }/program/viewResults`, {
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

  const saveCriteria = () => {
    setSelectedProgram({ ...selectedProgram, passByVotes: newCriteria.passByVotes, blindVoting: newCriteria.blindVoting, topThreshold: newCriteria.topThreshold, voteThreshold: newCriteria.voteThreshold });
    setCriteria(false);
    const index = programs.findIndex(e => e.id === selectedProgram.id)
    programs[index] = { ...programs[index], passByVotes: newCriteria.passByVotes, blindVoting: newCriteria.blindVoting, topThreshold: newCriteria.topThreshold, voteThreshold: newCriteria.voteThreshold };
    setPrograms(programs);
    fetch(`${ apiUrl() }/program/updateCurationCriteria`, {
      method: 'POST',
      body: JSON.stringify({ ...newCriteria, id: selectedProgram.id, org: selectedProgram.organizers[0].id }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json())
    .then(json => {});
  }

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

      const index = results.findIndex(e => e.id === id)
      results[index].approvalCount++;
      setResults([...results]);
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

      const rIndex = results.findIndex(e => e.id === id)
      results[rIndex].approvalCount--;
      setResults([...results]);
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

  const updateMintTo = (mintToArtist) => {
    setProgramAdmin({ ...programAdmin, mintToArtist })
    fetch(`${ apiUrl() }/program/mintToArtist`, {
      method: 'POST',
      body: JSON.stringify({ program: selectedProgram.id, mintToArtist }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json())
    .then(json => {});
  }

  const mint = () => {
    setSelectedProgram({ ...selectedProgram, mintInProgress: true })
    fetch(`${ apiUrl() }/program/mint`, {
      method: 'POST',
      body: JSON.stringify({ id: selectedProgram.id, org: selectedProgram.organizers[0].id }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json())
    .then(json => {});
  }

  console.log(selectedProgram);
  const isAdmin = selectedProgram && selectedProgram.organizers[0].admins.find(e => e === auth.id);

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
          { !adminTab &&
            <div className='margin-right-s'>
              <div className='small-button' onClick={ () => { setSelectedProgram(null); setAdminTab(false); } }>Close</div>
            </div>
          }
          <div className='flex-full center'>
            <div className='text-xs'>{ selectedProgram.organizers[0].name }</div>
            { adminTab ?
              <div className='text-m'>{ selectedProgram.name } Settings</div>
            :
              <div className='text-m'>{ selectedProgram.name }{ viewTab === 'results' ? ' Results' : ' Curation' }</div>
            }
          </div>
          <div className='small-space' />
          { !adminTab &&
            <div>
              { viewTab === 'results' ?
                <div className='small-button' onClick={ () => setViewTab('curate') }>Curation</div>
              :
                <div className='small-button' onClick={ () => setViewTab('results') }>Results</div>
              }
            </div>
          }
        </div>
      }
      { (selectedProgram && adminTab && programAdmin) &&
        <div className='margin-top'>
          <div className='text-mid flex'>
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
            { criteria ?
              <div>
                <div className='small-button margin-left-s' onClick={ () => setCriteria(!criteria) }>Cancel</div>
                <div className='small-button margin-left-s' onClick={ () => saveCriteria() }>Save</div>
              </div>
              :
              <div className='small-button margin-left-s' onClick={ () => setCriteria(!criteria) }>Edit</div>
            }
          </div>
          { criteria &&
            <div>
              <div className='text-s margin-top form__title'>Selection Type</div>
              <div className='select-dropdown margin-top-minus'>
                <select name='Mint' className='text-black' defaultValue={ `${ newCriteria.passByVotes }` } value={ `${ newCriteria.passByVotes }` } required onChange={e => setNewCriteria({ ...newCriteria, passByVotes: (e.target.value === 'true') })}>
                  <option value='default' disabled hidden>
                    Select an option
                  </option>
                  <option value='false'>Top Submissions</option>
                  <option value='true'>Vote Count</option>
                </select>
              </div>
              { newCriteria.passByVotes ?
                <div className='form__group field'>
                  <input type='number' className='form__field' placeholder='Number' name='number' id='number' maxLength='4' value={ `${ newCriteria.voteThreshold }` } onChange={e => setNewCriteria({ ...newCriteria, voteThreshold: Number(e.target.value) }) } />
                  <label className='form__label'>Needed Votes Count</label>
                </div>
                :
                <div className='form__group field'>
                  <input type='number' className='form__field' placeholder='Number' name='number' id='number' maxLength='4' value={ `${ newCriteria.topThreshold }` } onChange={e => setNewCriteria({ ...newCriteria, topThreshold: Number(e.target.value) }) } />
                  <label className='form__label'>Top Artworks Threshold Count</label>
                </div>
              }
              <div className='text-s margin-top form__title'>Blind Curation</div>
              <div className='select-dropdown margin-top-minus'>
                <select name='Mint' className='text-black' defaultValue={ `${ newCriteria.blindVoting }` } value={ `${ newCriteria.blindVoting }` } required onChange={e => setNewCriteria({ ...newCriteria, blindVoting: (e.target.value === 'true') })}>
                  <option value='default' disabled hidden>
                    Select an option
                  </option>
                  <option value='false'>Show Artist Info</option>
                  <option value='true'>Hide Artist Info</option>
                </select>
              </div>
            </div>
          }
          <div className='margin-top text-mid flex'>
            <div>
              <div className='text-s'>
                Exhibition Contract
              </div>
              { programAdmin.contractAddress ?
                <div>{ programAdmin.contractAddress }</div>
                :
                <div>Not Created</div>
              }
            </div>
            { !programAdmin.contractAddress &&
              <div className='small-button margin-left-s'>Create</div>
            }
          </div>
          <div className='margin-top text-mid flex'>
            <div>
              <div className='text-s'>
                Mint to Artist or Curator
              </div>
              <div className='select-dropdown margin-top-minus'>
                <select name='Mint' className='text-black' defaultValue={ `${ programAdmin.mintToArtist }` } value={ `${ programAdmin.mintToArtist }` } required onChange={e => updateMintTo(e.target.value === "true") }>
                  <option value='default' disabled hidden>
                    Select an option
                  </option>
                  <option value='true'>Artist&nbsp;&nbsp;&nbsp;&nbsp;</option>
                  <option value='false'>Curator&nbsp;&nbsp;&nbsp;&nbsp;</option>
                </select>
              </div>
              { !programAdmin.mintToArtist && 
                <div className='margin-top-s'>
                  <div className='text-xs'>
                    Address
                  </div>
                  <div className='text-s'>{ selectedProgram.organizers[0].wallet }</div>
                </div>
              }
            </div>
          </div>
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
              { resultsTab === 'unminted' ?
                <div>
                  <div className='flex margin-top'>
                    <div>{ selectedProgram.passByVotes ? `Received ${ selectedProgram.voteThreshold } Votes` : `Top ${ selectedProgram.topThreshold } Artworks` }</div>
                    <div className='flex-full' />
                    { selectedProgram.mintInProgress ? 
                      <div className='text-s'>Minting In Progress</div>
                      :
                      <div className='button-green small-button' onClick={ () => mint() }>Mint</div>
                    }
                  </div>
                  <div className='margin-top-s'>
                    <React.Fragment key={ filteredResults.mintable.length }>
                      <masonry-layout cols={ cols }>
                        { filteredResults.mintable.map((item, index) => {
                          return (<DecidedBlock key={ index } nft={ item } undo={ undo } blind={ selectedProgram.blindVoting } type='approve' />);
                        }) }
                      </masonry-layout>
                    </React.Fragment>
                  </div>
                  <div className='margin-top'>Criteria Unmet</div>
                  <div className='margin-top-s'>
                    <React.Fragment key={ filteredResults.unmintable.length }>
                      <masonry-layout cols={ cols }>
                        { filteredResults.unmintable.map((item, index) => {
                            return (<DecidedBlock key={ index } nft={ item } undo={ undo } blind={ selectedProgram.blindVoting } type='approve' />);
                        }) }
                      </masonry-layout>
                    </React.Fragment>
                  </div>
                </div>
              :
                <div className='margin-top-s'>
                  Total: { results.length }
                  <div className='margin-top-s' />
                  <React.Fragment key={ results.length }>
                    <masonry-layout cols={ cols }>
                      { results.map((item, index) => {
                          if (item.published)
                            return (<DecidedBlock key={ index } nft={ item } undo={ undo } blind={ selectedProgram.blindVoting } type='approve' />);
                      }) }
                    </masonry-layout>
                  </React.Fragment>
                </div>
              }
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
                    <Curation nft={ applicants.unapproved[0] } small={ small } blind={ selectedProgram.blindVoting } />
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
