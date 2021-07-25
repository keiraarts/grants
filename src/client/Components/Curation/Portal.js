import React, { useEffect, useState, useRef } from 'react';
import ReactModal from 'react-modal';
import { useStoreState } from 'easy-peasy';
import { apiUrl } from '../../baseUrl';

import Resizer from '../Tools/Resizer.js';
import Admin from './Admin';
import SimpleCuration from './SimpleCuration';
import AdvancedCuration from './AdvancedCuration';

// import '../../styles.scss';

export default function Portal({ updateScroll }) {
  const auth = useStoreState(state => state.user.auth);

  const contentRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [curateToggle, setCurateToggle] = useState(true);
  const [adminTab, setAdminTab] = useState(false);
  useEffect(() => {
    // updateScroll(true);
    fetch(`${ apiUrl() }/program/getCurationPrograms`, {
      method: 'get',
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

  const [selectedProgram, setSelectedProgram] = useState(null);

  const closePage = () => {
    setSelectedProgram(null);
    setAdminTab(false);
  }

  const isAdmin = selectedProgram && selectedProgram.organizers[0].admins.find(e => e === auth.id);

  return (
    <div className='content-block' ref={ contentRef }>
      <Resizer />
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
        <div className='margin-top'>
          { !loaded &&
            <div className='flex center'>
              <div className='block-loading'><div className='loading'><div></div><div></div></div></div>
            </div>
          }
          { programs && programs.length ?
            programs.map((program, index) => {
              return (
                <div key={ index } className='button' onClick={ () => setSelectedProgram(program) } >
                  <div className='text-xs'>{ program.organizers[0].name }</div>
                  <span>{ program.name }</span>
                </div>
              );
            })
          :
            <div className='margin-top-l center'>
              { loaded && <div>Please <a to='/login' className='text-grey'>log in</a> to curate!</div> }
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
                  <img src='/assets/close.png' className='close-icon' />
                </div>
              </div>
            }
            <div className='flex-full center'>
              <div className='text-xs'>{ selectedProgram.organizers[0].name }</div>
              { adminTab ?
                <div className='text-m'>{ selectedProgram.name } Settings</div>
              :
                <div className='text-m'>{ selectedProgram.name }{ curateToggle ? ' Results' : ' Curation' }</div>
              }
            </div>
            <div className='small-space' />
            { (!selectedProgram.hideResults || isAdmin) &&
              <div>
                { !adminTab &&
                  <div>
                    { !curateToggle ?
                      <div>
                        <div className='small-button' onClick={ () => setCurateToggle(true) }>
                          Curation
                          <img src='/assets/switch.png' className='switch-icon' />
                        </div>
                      </div>
                    :
                      <div>
                        <div className='small-button' onClick={ () => setCurateToggle(false) }>
                          Results
                          <img src='/assets/switch.png' className='switch-icon' />
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>
          <div className='line-spacer' />
        </div>
      }
      { (selectedProgram && adminTab) &&
        <Admin
          auth={ auth }
          selectedProgram={ selectedProgram }
          setSelectedProgram={ setSelectedProgram }
          programs={ programs }
          setPrograms={ setPrograms }
        />
      }
      { (selectedProgram && !adminTab && !selectedProgram.advancedCuration) &&
        <SimpleCuration selectedProgram={ selectedProgram } curateToggle={ curateToggle } setSelectedProgram={ setSelectedProgram } />
      }
      { (selectedProgram && !adminTab && selectedProgram.advancedCuration) &&
        <AdvancedCuration selectedProgram={ selectedProgram } curateToggle={ curateToggle } setSelectedProgram={ setSelectedProgram } />
      }
    </div>
  );
}
