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
  useEffect(() => {
    fetch(`${ apiUrl() }/program/getCurationPrograms`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json())
    .then(json => setPrograms(json.success));
  }, [])

  const [applicants, setApplicants] = useState({});
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

  console.log(selectedProgram);

  return (
    <div className='content-block'>
      <Resizer />
      <div className='text-l text-b'>
        Curation Portal
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
            <div className='small-button' onClick={ () => setSelectedProgram(null) }>Back</div>
          </div>
          <div className='flex-full center'>
            <div className='text-xs'>{ selectedProgram.organizers[0].name }</div>
            <div className='text-m'>{ selectedProgram.name }</div>
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
      { selectedProgram &&
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
          { (viewTab === 'curate') &&
            <div className='margin-top-s'>
              { (applicants && applicants.unapproved && applicants.unapproved.length) ?
                <div>
                  Remaining: { applicants.unapproved.length }
                  <div className='flex margin-top-s'>
                    <div className='small-button' onClick={ () => decide('approve') }>
                      Approve
                    </div>
                    <div className='info-block-space' />
                    <div className='small-button' onClick={ () => decide('reject') }>
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
      { (viewTab === 'approved' && selectedProgram) &&
        <div className='margin-top-s'>
          { applicants && applicants.approved &&
            <div>
              Total: { applicants.approved.length }
              <div className='margin-top-s' />
              <React.Fragment key={ applicants.approved.length }>
                <masonry-layout cols={ cols }>
                  { applicants.approved.map((item, index) => {
                      return (<DecidedBlock nft={ item } undo={ undo } type='approve' />);
                  }) }
                </masonry-layout>
              </React.Fragment>
            </div>
          }
        </div>
      }
      { (viewTab === 'rejected' && selectedProgram) &&
        <div className='margin-top-s'>
          { applicants && applicants.rejected &&
            <div>
              Total: { applicants.rejected.length }
              <div className='margin-top-s' />
              <React.Fragment key={ applicants.rejected.length }>
                <masonry-layout cols={ cols }>
                  { applicants.rejected.map((item, index) => {
                      return (<DecidedBlock nft={ item } undo={ undo } type='reject' />);
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
