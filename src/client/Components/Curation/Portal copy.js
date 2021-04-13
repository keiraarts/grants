import React, { useEffect, useState, useRef } from 'react';
import ReactModal from 'react-modal';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../baseUrl';

import Close from '../../assets/close.png';
import Switch from '../../assets/switch.png';
import Tile from '../../assets/tile.png';
import Gallery from '../../assets/gallery.png';
import Resizer from '../Tools/Resizer.js';
import Curation from './Curation';
import ArtList from './ArtList';
import ReorderList from './ReorderList';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

  const contentRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [viewTab, setViewTab] = useState('curate');
  const [curationView, setCurationView] = useState('gallery');
  const [resultsTab, setResultsTab] = useState('results');
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
    .then(json => {
      setPrograms(json.success || []);
      setLoaded(true);
    });
  }, [])

  const [applicants, setApplicants] = useState({});
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState({ mintable: [], unmintable: [] });
  const [finalResults, setFinalResults] = useState({ minted: [], unminted: [] });
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [newCriteria, setNewCriteria] = useState(false);

  useEffect(() => {
    let filtered = { mintable: [], unmintable: [] };
    let final = { minted: [], unminted: [] };
    if (results && results.length && selectedProgram) {
      let i = 0;
      results.forEach(result => {
        if (!result.finalized) {
          if (selectedProgram.passByVotes && !result.published) {
            if (result.approvalCount >= selectedProgram.voteThreshold) filtered.mintable.push(result);
            else filtered.unmintable.push(result);
          } else if (!result.published) {
            if (i < selectedProgram.topThreshold) filtered.mintable.push(result);
            else filtered.unmintable.push(result);
            i++;
          }
        } else {
          if (result.published) final.minted.push(result);
          else final.unminted.push(result);
        }
      });
    }

    setFilteredResults(filtered);
    setFinalResults(final);
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
      const index = programAdmin.curators.findIndex(e => e.id === curator.id);
      update = {
        ...programAdmin,
        curators: [
          ...programAdmin.curators.slice(0, index),
          ...programAdmin.curators.slice(index + 1)
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

  const reorderCurators = (curators) => {
    console.log(curators);

    // fetch(`${ apiUrl() }/program/reorderCurators`, {
    //   method: 'POST',
    //   body: JSON.stringify({ program: selectedProgram.id, curators }),
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': auth.token
    //   },
    // })
    // .then(res => res.json())
    // .then(json => {
    //   if (json.success) setProgramAdmin(...programAdmin, curators);
    // })
  }

  const updateMintTo = (mintToArtist) => {
    setProgramAdmin({ ...programAdmin, mintToArtist })
    setSelectedProgram({ ...selectedProgram, mintToArtist })
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

  const [mintConfirm, setMintConfirm] = useState(false);
  const [reorder, setReorder] = useState(false);
  const [newOrder, setNewOrder] = useState(null);
  const mint = () => {
    setMintConfirm(false);
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

  const [deferConfirm, setDeferConfirm] = useState(false);
  const finalizeDeferred = () => {
    setDeferConfirm(false);
    fetch(`${ apiUrl() }/program/finalizeDeferred`, {
      method: 'POST',
      body: JSON.stringify({ program: selectedProgram.id, org: selectedProgram.organizers[0].id, applicants: filteredResults.unmintable }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json())
    .then(json => {
      setFinalResults({ minted: finalResults.minted, unminted: [...filteredResults.unmintable, ...finalResults.unminted] });
      setFilteredResults({ mintable: filteredResults.mintable, unmintable: [] });
    });
  }

  const [approveConfirm, setApproveConfirm] = useState(false);
  const finalizeApproved = () => {
    setDeferConfirm(false);
    fetch(`${ apiUrl() }/program/finalizeApproved`, {
      method: 'POST',
      body: JSON.stringify({ program: selectedProgram.id, org: selectedProgram.organizers[0].id, applicants: filteredResults.mintable }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json())
    .then(json => {
      if (json.success) setSelectedProgram({ ...selectedProgram, finalized: true })
    });
  }

  const closePage = () => {
    setSelectedProgram(null);
    setAdminTab(false);
    setViewTab('curate');
    setFilteredResults({ mintable: [], unmintable: [] });
  }

  const isAdmin = selectedProgram && selectedProgram.organizers[0].admins.find(e => e === auth.id);

  return (
    <div className='content-block' ref={ contentRef }>
      <Resizer />
      <ReactModal
        isOpen={ mintConfirm }
        style={{ content: { margin: 'auto', width: '15rem', height: '23rem' } }}
        onRequestClose={ () => setMintConfirm(false) }
        shouldCloseOnOverlayClick={ true }
        ariaHideApp={ false }
      >
        { selectedProgram && selectedProgram.organizers &&
          <div className='text-s font'>
            Are you sure you want to mint to your exhibition?<br /><br />
            You will be minting { filteredResults.mintable.length } artworks that will
            end up in the <strong>{ selectedProgram.mintToArtist ? `artist's wallet` : `curator's wallet` }</strong><br /><br />
            <div className='center'>
              <div className='small-button button-red' onClick={ () => setMintConfirm(false) }>Cancel</div><br /><br />
              <div className='margin-top-s small-button button-green' onClick={ () => mint() }>Confirm</div>
            </div>
          </div>
        }
      </ReactModal>
      <ReactModal
        isOpen={ approveConfirm }
        style={{ content: { margin: 'auto', width: '15rem', height: '23rem' } }}
        onRequestClose={ () => setApproveConfirm(false) }
        shouldCloseOnOverlayClick={ true }
        ariaHideApp={ false }
      >
        { selectedProgram && selectedProgram.organizers &&
          <div className='text-s font'>
            Are you sure you want to finalize these artworks?<br /><br />
            <strong>{ filteredResults.mintable.length } artworks</strong> will be prepared for you to re-order them
            to your liking before minting.<br /><br />
            <div className='center'>
              <div className='small-button' onClick={ () => setApproveConfirm(false) }>Cancel</div><br /><br />
              <div className='margin-top-s small-button' onClick={ () => finalizeApproved() }>Confirm</div>
            </div>
          </div>
        }
      </ReactModal>
      <ReactModal
        isOpen={ deferConfirm }
        style={{ content: { margin: 'auto', width: '15rem', height: '23rem' } }}
        onRequestClose={ () => setDeferConfirm(false) }
        shouldCloseOnOverlayClick={ true }
        ariaHideApp={ false }
      >
        { selectedProgram && selectedProgram.organizers &&
          <div className='text-s font'>
            Are you sure you want to defer these artworks?<br /><br />
            <strong>{ filteredResults.unmintable.length } artworks</strong> will be finalized into the deferred results page and
            an email notification will be sent about the results being finalized.<br /><br />
            <div className='center'>
              <div className='small-button' onClick={ () => setDeferConfirm(false) }>Cancel</div><br /><br />
              <div className='margin-top-s small-button' onClick={ () => finalizeDeferred() }>Confirm</div>
            </div>
          </div>
        }
      </ReactModal>
      <div className='text-l flex'>
        <strong>Curation Portal</strong>
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
        <div>
          { !loaded &&
            <div className='flex center'>
              <div className='block-loading'><div className='loading'><div></div><div></div></div></div>
            </div>
          }
          { programs && programs.length ?
            programs.map((program, index) => {
              return (
                <div key={ index } className='button' onClick={ () => loadCuration(program) } >
                  <div className='text-xs'>{ program.organizers[0].name }</div>
                  <span>{ program.name }</span>
                </div>
              );
            })
          :
            <div className='margin-top-l center'>
              { loaded && <div>Please <Link to='/login' className='text-grey'>log in</Link> to curate!</div> }
              <div className='spacer' />
            </div>
          }
        </div>
      :
        <div>
          <div className='margin-top flex'>
            { !adminTab &&
              <div className='margin-right-s'>
                <div className='small-button' onClick={ () => closePage() }>
                  <img src={ Close } className='close-icon' />
                </div>
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
                  <div>
                    <div className='small-button' onClick={ () => setViewTab('curate') }>
                      Curation
                      <img src={ Switch } className='switch-icon' />
                    </div>
                  </div>
                :
                  <div>
                    <div className='small-button' onClick={ () => setViewTab('results') }>
                      Results
                      <img src={ Switch } className='switch-icon' />
                    </div>
                  </div>
                }
              </div>
            }
          </div>
          <div className='line-spacer' />
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
              <div className='small-button margin-left-s'>Create (Coming Soon ❤️)</div>
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
                <div className={ viewTab === 'curate' ? 'text-grey' : '' }>
                  Curate
                </div>
              </div>
              <div className='info-block-space' />
              <div className={ viewTab === 'approved' ? 'info-block info-block-selected button-green' : 'info-block button-green' } onClick={ () => setViewTab('approved') }>
                <div className={ viewTab === 'approved' ? 'text-grey' : '' }>
                  Approved
                </div>
              </div>
              <div className='info-block-space' />
              <div className={ viewTab === 'deferred' ? 'info-block info-block-selected button-red' : 'info-block button-red' } onClick={ () => setViewTab('deferred') }>
                <div className={ viewTab === 'deferred' ? 'text-grey' : '' }>
                  Deferred
                </div>
              </div>
            </div>
          }
          { viewTab === 'results' &&
            <div>
              <div className='flex margin-top-s'>
                <div className={ resultsTab === 'results' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => setResultsTab('results') }>
                  <div className={ resultsTab === 'results' ? 'text-grey' : '' }>
                    Results
                  </div>
                </div>
                <div className='info-block-space' />
                <div className={ resultsTab === 'minted' ? 'info-block info-block-selected button-green' : 'info-block button-green' } onClick={ () => setResultsTab('minted') }>
                  <div className={ resultsTab === 'minted' ? 'text-grey' : '' }>
                    Minted
                  </div>
                </div>
                <div className='info-block-space' />
                <div className={ resultsTab === 'deferred' ? 'info-block info-block-selected button-red' : 'info-block button-red' } onClick={ () => setResultsTab('deferred') }>
                  <div className={ resultsTab === 'deferred' ? 'text-grey' : '' }>
                    Deferred
                  </div>
                </div>
              </div>
              { resultsTab === 'results' &&
                <div>
                  <div className='flex margin-top'>
                    <div>{ selectedProgram.passByVotes ? `Received ${ selectedProgram.voteThreshold } Votes` : `Top ${ selectedProgram.topThreshold } Artworks` } (Total: { filteredResults.mintable.length })</div>
                    <div className='flex-full' />
                    { (isAdmin && !selectedProgram.finalized) &&
                      <div className='button-green small-button' onClick={ () => setApproveConfirm(true) }>Finalize Approved</div>
                    }
                    { selectedProgram.mintInProgress &&
                      <div className='text-s'>Minting In Progress</div>
                    }
                    { (isAdmin && selectedProgram.finalized) &&
                      <div style={{ marginTop: '-0.4rem' }}>
                        { isAdmin && <div className='small-button' onClick={ () => setReorder(!reorder) }>{ reorder ? 'Save Order' : 'Reorder' }</div> }
                        { isAdmin && <div className='button-green small-button margin-left-s' onClick={ () => setMintConfirm(true) }>Mint</div> }
                      </div>
                    }
                  </div>
                  <div className='margin-top-s' />
                  { reorder ?
                    <ReorderList list={ filteredResults.mintable } setNewOrder={ setNewOrder } />
                    :
                    <ArtList list={ filteredResults.mintable } blind={ selectedProgram.blindVoting } type='approve' contentRef={ contentRef } cols={ cols } />
                  }
                  <div className='flex margin-top'>
                    Not Enough Votes (Total: { filteredResults.unmintable.length})
                    <div className='flex-full' />
                    <div style={{ marginTop: '-0.3rem' }}>
                      { isAdmin && <div className='small-button button-red' onClick={ () => setDeferConfirm(true) }>Finalize Deferred</div> }
                    </div>
                  </div>
                  <div className='margin-top' />
                  <ArtList list={ filteredResults.unmintable } blind={ selectedProgram.blindVoting } type='approve' contentRef={ contentRef } cols={ cols } />
                </div>
              }
              { resultsTab === 'minted' &&
                <div className='margin-top'>
                  Total: { finalResults.minted.length }
                  <div className='margin-top' />
                  <ArtList list={ finalResults.minted } blind={ selectedProgram.blindVoting } type='approve' contentRef={ contentRef } cols={ cols } /> {/* item.published */}
                </div>
              }
              { resultsTab === 'deferred' &&
                <div className='margin-top'>
                  Total: { finalResults.unminted.length }
                  <div className='margin-top' />
                  <ArtList list={ finalResults.unminted } blind={ selectedProgram.blindVoting } type='approve' contentRef={ contentRef } cols={ cols } />
                </div>
              }
            </div>
          }
          { (viewTab === 'curate') &&
            <div className='margin-top-s'>
              { (applicants && applicants.unapproved && applicants.unapproved.length) ?
                <div>
                  <div className='flex'>
                    Remaining: { applicants.unapproved.length }
                    <div className='flex-full' />
                    <img src={ Tile } className={ curationView === 'gallery' ? 'curation-control' : 'curation-control-selected' } onClick={ () => setCurationView('tile') } />
                    <img src={ Gallery } className={ curationView === 'tile' ? 'margin-left-s curation-control' : 'margin-left-s curation-control-selected' } onClick={ () => setCurationView('gallery') } />
                  </div>
                  { curationView === 'gallery' &&
                    <div className='flex margin-top-s'>
                      <div className='small-button flex-full' onClick={ () => decide('approve') }>
                        Approve
                      </div>
                      <div className='info-block-space' />
                      <div className='small-button flex-full' onClick={ () => decide('reject') }>
                        Defer
                      </div>
                    </div>
                  }
                  { curationView === 'gallery' ?
                    <React.Fragment key={ applicants.unapproved[0].id }>
                      <Curation nft={ applicants.unapproved[0] } small={ small } blind={ selectedProgram.blindVoting } />
                    </React.Fragment>
                    :
                    <div className='margin-top-s'>
                      <ArtList list={ applicants.unapproved } blind={ selectedProgram.blindVoting } type='approve' contentRef={ contentRef } cols={ cols } />
                    </div>
                  }
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
        <div className='margin-top'>
          { applicants && applicants.approved &&
            <div>
              Total: { applicants.approved.length }
              <div className='margin-top' />
              <ArtList list={ applicants.approved } blind={ selectedProgram.blindVoting } undo={ undo } type='approve' contentRef={ contentRef } cols={ cols } />
            </div>
          }
        </div>
      }
      { (viewTab === 'deferred' && selectedProgram && !adminTab) &&
        <div className='margin-top'>
          { applicants && applicants.rejected &&
            <div>
              Total: { applicants.rejected.length }
              <div className='margin-top' />
              <ArtList list={ applicants.rejected } blind={ selectedProgram.blindVoting } undo={ undo } type='reject' contentRef={ contentRef } cols={ cols } />
            </div>
          }
        </div>
      }
    </div>
  );
}
