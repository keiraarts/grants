import React, { useEffect, useState, useRef } from 'react';
import ReactModal from 'react-modal';
import { useStoreState } from 'easy-peasy';
import { apiUrl } from '../../baseUrl';

import Resizer from '../Tools/Resizer.js';
import Curation from './Curation';
import ArtList from './ArtList';
import ReorderList from './ReorderList';

// import '../../styles.scss';

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

export default function AdvancedCuration({ selectedProgram, curateToggle, setSelectedProgram }) {
  const small = useStoreState(state => state.app.small);
  const cols = useStoreState(state => state.app.cols);
  const auth = useStoreState(state => state.user.auth);

  const contentRef = useRef(null);

  const [viewTab, setViewTab] = useState('curate');
  const [curationView, setCurationView] = useState('gallery');
  const [resultsTab, setResultsTab] = useState('results');

  const [applicants, setApplicants] = useState({});

  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState({ mintable: [], unmintable: [] });
  const [finalResults, setFinalResults] = useState({ minted: [], unminted: [] });
  useEffect(() => {
    let filtered = { mintable: [], unmintable: [] };
    let final = { minted: [], unminted: [] };
    if (results && results.length && selectedProgram) {
      let i = 0;
      if (selectedProgram.finalized) {
        results.forEach(result => {
          if (result.published) final.minted.push(result);
          else if (result.prepared) filtered.mintable.push(result);
          else if (result.finalized) final.unminted.push(result);
          else filtered.unmintable.push(result);
        })
      } else {
        results.forEach(result => {
          if (!result.finalized) {
            if (i < selectedProgram.topThreshold) filtered.mintable.push(result);
            else filtered.unmintable.push(result);
            i++;
          } else {
            if (result.published) final.minted.push(result);
            else final.unminted.push(result);
          }
        });
      }
    }

    setFilteredResults(filtered);
    setFinalResults(final);
  }, [results, selectedProgram]);

  const loadCuration = program => {
    setApplicants({});
    fetch(`${ apiUrl() }/program/viewAllScoring`, {
      method: 'POST',
      body: JSON.stringify({ program: program._id }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
    .then(res => res.json())
    .then(json => {
      setApplicants({
        ...json,
        unscored: shuffle(json.unscored),
        scored: json.scored,
      })
    })

    fetch(`${ apiUrl() }/program/viewScoredResults`, {
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

  const [score, setScore] = useState({})
  const setMetric = (metric, val) => {
    const newScore = {...score}
    if (val > 100) val = 100;
    if (val < 1) val = 1;
    newScore[metric] = Number(val);
    setScore(newScore);
  }

  useEffect(() => {
    if (selectedProgram && selectedProgram.advancedMetrics) {
      const score = {}
      selectedProgram.advancedMetrics.forEach(item => {
        score[item.metric.toLowerCase().replace(/\s+/g, '')] = 50;
      })

      setScore(score)
    }
  }, [selectedProgram])

  useEffect(() => {
    loadCuration(selectedProgram);
  }, [])

  const submitScore = () => {
    let newScore = applicants.unscored[0];
    let userScore = 0;
    selectedProgram.advancedMetrics.forEach(e => {
      let foundScore = score[e.metric.toLowerCase().replace(/\s+/g, '')];
      if (foundScore) {
        userScore += e.weight * foundScore / 100;
      }
    })

    newScore.scores.push({ score: { ...score }, userScore, user: auth.id });
    const unscored = applicants.unscored.slice(1);
    let index = 0;
    applicants.scored.forEach(e => {
      e.scores.forEach(j => {
        if (j.user === auth.id && userScore < j.userScore) {
          index++;
        }
      })
    })

    const scored = [
      ...applicants.scored.slice(0, index),
      newScore,
      ...applicants.scored.slice(index)
    ];
    const update = {
      ...applicants,
      unscored,
      scored
    }

    setApplicants(update);

    fetch(`${ apiUrl() }/program/submitScore`, {
      method: 'POST',
      body: JSON.stringify({ id: applicants.unscored[0].id, score, program: selectedProgram._id }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
    .then(res => res.json())
    .then(json => {})

    selectedProgram.advancedMetrics.forEach(item => {
      score[item.metric.toLowerCase().replace(/\s+/g, '')] = 50;
    })

    setScore(score)
  }

  const undo = (id, type) => {
    const index = applicants.scored.findIndex(e => e.id === id);
    const undoScored = applicants.scored[index];
    const removeScoreIndex = undoScored.scores.findIndex(e => e.user === auth.id);
    undoScored.scores = [...undoScored.scores.slice(0, removeScoreIndex), ...undoScored.scores.slice(removeScoreIndex + 1)]
    const unscored = [undoScored, ...applicants.unscored];
    const update = {
      ...applicants,
      unscored,
      scored: [
        ...applicants.scored.slice(0, index),
        ...applicants.scored.slice(index + 1)
      ]
    }

    setApplicants(update);
    fetch(`${ apiUrl() }/program/undoScoredApplicant`, {
      method: 'POST',
      body: JSON.stringify({ id, program: selectedProgram._id }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
    .then(res => res.json())
    .then(json => {})
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
  const finalizeApproved = (finalize) => {
    setDeferConfirm(false);
    fetch(`${ apiUrl() }/program/finalizeApproved`, {
      method: 'POST',
      body: JSON.stringify({ program: selectedProgram.id, org: selectedProgram.organizers[0].id, applicants: newOrder ? newOrder : filteredResults.mintable, finalize }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json())
    .then(json => {
      if (json.success) {
        if (finalize) {
          const mintable = newOrder ? newOrder : filteredResults.mintable;
          mintable.forEach(result => result.prepared = true);
          setResults([...mintable, ...filteredResults.unmintable])
          setSelectedProgram({ ...selectedProgram, finalized: true })
          setReorder(false);
          setApproveConfirm(false);
        } else {
          const mintable = filteredResults.mintable;
          mintable.forEach(result => result.prepared = false);
          setResults([...mintable, ...filteredResults.unmintable])
          setSelectedProgram({ ...selectedProgram, finalized: false })
        }
      }
    });
  }

  const isAdmin = selectedProgram && selectedProgram.organizers[0].admins.find(e => e === auth.id);
  let topScores = [], bottomScores = [];
  if (applicants && applicants.scored && applicants.scored.length) {
    topScores = applicants.scored.slice(0, selectedProgram.topThreshold);
    bottomScores = applicants.scored.slice(selectedProgram.topThreshold, applicants.scored.length);
  }

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
            <em>Please refresh to ensure you have the latest scores</em><br/><br/>
            <div className='center'>
              <div className='small-button button-red' onClick={ () => setApproveConfirm(false) }>Cancel</div><br /><br />
              <div className='margin-top-s small-button button-green' onClick={ () => finalizeApproved(true) }>Confirm</div>
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
              <div className='small-button button-red' onClick={ () => setDeferConfirm(false) }>Cancel</div><br /><br />
              <div className='margin-top-s small-button button-green' onClick={ () => finalizeDeferred() }>Confirm</div>
            </div>
          </div>
        }
      </ReactModal>
      { selectedProgram &&
        <div>
          { curateToggle &&
            <div className='margin-top-s'>
              <div className='flex'>
                <div className={ viewTab === 'curate' ? 'info-block info-block-selected button-blue' : 'info-block button-blue' } onClick={ () => setViewTab('curate') }>
                  <div className={ viewTab === 'curate' ? 'text-grey' : '' }>
                    Curate
                  </div>
                </div>
                <div className='info-block-space' />
                <div className={ viewTab === 'scored' ? 'info-block info-block-selected button-green' : 'info-block button-green' } onClick={ () => setViewTab('scored') }>
                  <div className={ viewTab === 'scored' ? 'text-grey' : '' }>
                    Scored
                  </div>
                </div>
              </div>
            </div>
          }
          { !curateToggle &&
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
                      <div className='small-button' onClick={ () => setApproveConfirm(true) }>Finalize Approved</div>
                    }
                    { selectedProgram.mintInProgress &&
                      <div className='text-s'>Minting In Progress</div>
                    }
                    { (isAdmin && selectedProgram.finalized && !selectedProgram.mintInProgress) &&
                      <div style={{ marginTop: '-0.4rem' }}>
                        { isAdmin && reorder &&
                          <div>
                            <div className='small-button margin-left-s' onClick={ () => setReorder(false) }>Cancel</div>
                            <div className='small-button margin-left-s' onClick={ () => finalizeApproved(true) }>Save Order</div>
                          </div>
                        }
                        { (isAdmin && !reorder) && <div className='small-button' onClick={ () => finalizeApproved(false) }>Undo Finalize</div> }
                        { (isAdmin && !reorder) && <div className='small-button margin-left-s' onClick={ () => setReorder(true) }>Reorder</div> }
                        { (isAdmin && !reorder) && <div className='button-green small-button margin-left-s' onClick={ () => setMintConfirm(true) }>Mint</div> }
                      </div>
                    }
                  </div>
                  <div className='margin-top' />
                  { reorder ?
                    <ReorderList list={ filteredResults.mintable } setNewOrder={ setNewOrder } />
                    :
                    <ArtList list={ filteredResults.mintable } blind={ selectedProgram.blindVoting } type='approve' contentRef={ contentRef } cols={ cols } finalScore />
                  }
                  <div className='flex margin-top'>
                    Not Enough Votes (Total: { filteredResults.unmintable.length})
                    <div className='flex-full' />
                    <div style={{ marginTop: '-0.3rem' }}>
                      { isAdmin && <div className='small-button' onClick={ () => setDeferConfirm(true) }>Finalize Deferred</div> }
                    </div>
                  </div>
                  <div className='margin-top' />
                  <ArtList list={ filteredResults.unmintable } blind={ selectedProgram.blindVoting } type='approve' contentRef={ contentRef } cols={ cols } finalScore />
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
          { viewTab === 'curate' && curateToggle &&
            <div className='margin-top-s'>
              { (applicants && applicants.unscored && applicants.unscored.length) ?
                <div>
                  { !selectedProgram.curationLock ?
                    <div className='flex margin-top-s'>
                      Remaining: { applicants.unscored.length }
                      <div className='flex-full' />
                      <img src='/assets/tile.png' className={ curationView === 'gallery' ? 'curation-control' : 'curation-control-selected' } onClick={ () => setCurationView('tile') } />
                      <img src='/assets/gallery.png' className={ curationView === 'tile' ? 'margin-left-s curation-control' : 'margin-left-s curation-control-selected' } onClick={ () => setCurationView('gallery') } />
                    </div>
                    :
                    <div className='margin-top-s'>
                      <div className='flex'>
                        Curation Currently Locked
                        <div className='flex-full' />
                      </div>
                      <div className='margin-top-s' />
                    </div>
                  }
                  { (curationView === 'gallery' && !selectedProgram.curationLock) &&
                    <div className='margin-top-s'>
                      <div>
                        { selectedProgram.advancedMetrics.map((item, index) => {
                          const metricField = item.metric.toLowerCase().replace(/\s+/g, '');
                          return (
                            <div className='flex margin-top-s' key={ index }>
                              <div>
                                <div className='text-s'><strong>{ item.metric }</strong></div>
                                <div className='text-s'>Weight: { item.weight }%</div>
                                <div className='slidecontainer'>
                                  <input type='range' min='1' max='100' className='slider' id={ metricField } value={ score[metricField] } onChange={ (e) => setMetric(metricField, e.target.value) } />
                                </div>
                              </div>
                              <div className='small-space' />
                              <div className='flex'>
                                <div className='form__group field'>
                                  <input type='number' className='form__field' placeholder='Value' value={ score[metricField] } name='amount' id='amount' max='100' onChange={e => setMetric(metricField, e.target.value) } />
                                  <label className='form__label'>Score Value</label>
                                </div>
                              </div>
                            </div>
                            )
                          })
                        }
                      </div>
                      <div className='flex margin-top-s'>
                        <div className='small-button flex-full' onClick={ submitScore }>
                          Submit Score
                        </div>
                      </div>
                    </div>
                  }
                  { (curationView === 'gallery' && !selectedProgram.curationLock) ?
                    <React.Fragment key={ applicants.unscored[0].id }>
                      <Curation nft={ applicants.unscored[0] } small={ small } blind={ selectedProgram.blindVoting } />
                    </React.Fragment>
                    :
                    <div className='margin-top'>
                      <ArtList list={ applicants.unscored } blind={ selectedProgram.blindVoting } type='approve' contentRef={ contentRef } cols={ cols } />
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
      { (viewTab === 'scored' && selectedProgram && curateToggle) &&
        <div className='margin-top'>
          { applicants && applicants.scored &&
            <div>
              <div className='margin-top'>
                <div className='text-mid'><strong>Scoring Calculation</strong></div>
                { selectedProgram && selectedProgram.advancedMetrics && selectedProgram.advancedMetrics.length > 0 ?
                  <div className='text-xs'>
                    ({ 
                      selectedProgram.advancedMetrics.map((item, index) => {
                        return (<span key={ index }>{ item.metric } * { item.weight }%{ index !== selectedProgram.advancedMetrics.length - 1 ? ' + ' : '' }</span>)
                      })
                    })
                    / { selectedProgram.advancedMetrics.length }
                  </div>
                  :
                  <div>Admin has not yet set any metrics</div>
                }
              </div>
              <div className='margin-top' />
              My Top { selectedProgram.topThreshold }
              <div className='margin-top' />
              { topScores && topScores.length ?
                <ArtList
                  list={ topScores }
                  blind={ selectedProgram.blindVoting }
                  undo={ undo }
                  type='approve'
                  contentRef={ contentRef }
                  cols={ cols }
                  metrics={ selectedProgram.advancedMetrics }
                  user={ auth.id }
                />
              :
                <div className='text-mid'><em>No scored submissions</em></div>
              }
              <div className='margin-top' />
              My bottom scores
              <div className='margin-top' />
              { bottomScores && bottomScores.length ?
                <ArtList
                  list={ bottomScores }
                  blind={ selectedProgram.blindVoting }
                  undo={ undo }
                  type='approve'
                  contentRef={ contentRef }
                  cols={ cols }
                  metrics={ selectedProgram.advancedMetrics }
                  user={ auth.id }
                />
              :
                <div className='text-mid'><em>No scored submissions</em></div>
              }
            </div>
          }
        </div>
      }
    </div>
  );
}
