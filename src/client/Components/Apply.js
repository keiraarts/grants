import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useStoreState } from 'easy-peasy';
import { apiUrl } from '../baseUrl';
import Resizer from './Tools/Resizer.js';

import '../styles.scss';

function openLink(page)
{
  let win = window.open(page, '_blank');
  win.focus();
}

export default function Application() {
  const { program } = useParams();
  const auth = useStoreState(state => state.user.auth);
  const small = useStoreState(state => state.app.small);

  const [user, setUser] = useState(null);
  const [programInfo, setProgram] = useState(null);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    fetch(`${ apiUrl() }/program/getProgram`, {
      method: 'POST',
      body: JSON.stringify({ url: program }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
    .then(json => setProgram(json));

    if (auth && auth.token) {
      fetch(`${ apiUrl() }/getAccount`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      }).then(res => res.json())
      .then(json => setUser(json));
    }
  }, [])

  const [programSubmitting, setProgramSubmitting] = useState(false);
  const [updateErr, setUpdateErr] = useState(false);
  const updateProgram = e => {
    e.preventDefault();
    if (!programInfo.organizer || !programInfo.name || !programInfo.url || !programInfo.description || !programInfo.logistics || !programInfo.criteria) setErr('Please fill out all required fields');
    else {
      setErr(false);
      setProgramSubmitting(true);
      fetch(`${ apiUrl() }/program/updateProgram`, {
        method: 'POST',
        body: JSON.stringify(programInfo),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setEditing(false);
            setProgramSubmitting(false);
          } else {
            setUpdateErr(json.error);
          }
        })
    }
  }


  const [data, setData] = useState({});
  const uploadHandler = (target) => {
    setErr(false);
    const file = target.files[0];
    const reader = new FileReader();
    const ext = target.value.substr(target.value.length - 3).toLowerCase();
    reader.readAsDataURL(file);
    let responsetype;
    reader.onload = () => {
      if (ext === 'jpg' || ext === 'jpeg') responsetype = 'image/jpeg';
      if (ext === 'png') responsetype = 'image/png';
      if (ext === 'gif') responsetype = 'image/gif';
      if (ext === 'ebp') responsetype = 'image/webp';
      if (ext === 'mp4') responsetype = 'video/mp4';

      if (file.size < 120000000 || (type === 'thumbnail' && file.size < 32000000)) {
        if (responsetype) {
          setData({ ...data, art: reader.result, ext })
        } else {
          setErr('File type unsupported');
        }
      } else {
        setErr('File size too large');
      }
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState(false);
  const submit = e => {
    e.preventDefault();
    if (!data.art) setErr('No artwork selected');
    else if (!data.statement) setErr('Please write a statement of intent');
    else {
      setErr(false);
      setSubmitting(true);
      fetch(`${ apiUrl() }/program/submitApplication`, {
        method: 'POST',
        body: JSON.stringify({ ...data, program: programInfo._id }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
  
      })
        .then(res => res.json())
        .then(json => setSubmitted(true));
    }
  }

  const dropdownDefault = data.minted === undefined ? 'default' : `${ data.minted }`;
  let isAdmin = false;
  if (programInfo) isAdmin = (auth && programInfo.admins.findIndex(admin => admin === auth.id) >= 0)

  console.log(programInfo);

  return (
    <div className='content-block'>
      <Resizer />
      <div>
        { programInfo &&
          <div>
            <div className='text-l flex'>
              { programInfo.name }
              <div className='flex-full' />
              { isAdmin &&
                <div className='text-s center text-grey pointer' onClick={ () => setEditing(true) }>
                  Edit Program
                </div>
              }
            </div>
            <div className='text-s margin-top-s'>
              Curated by&nbsp;
              <strong>
                <span className='text-rainbow pointer' onClick={ () => openLink(programInfo.website) }>{ programInfo.organizer }</span>
              </strong>
            </div>
            <div className='margin-top'>
              { !editing &&
                <div className='text-s line-breaks'>
                  { programInfo.description }
                  <div className='margin-top-l text-s line-breaks'>
                    <strong>Grant Logistics</strong>
                    <div className='margin-top-s line-breaks'>
                      { programInfo.logistics }
                    </div>
                  </div>
                  <div className='margin-top text-s'>
                    <strong>Application Criteria</strong>
                    <div className='margin-top-s'>
                      { programInfo.criteria }
                    </div>
                  </div>
                </div>
              }
              { editing &&
                <form onSubmit={ updateProgram }>
                  <div className='form__group field'>
                    <input type='text' className='form__field' placeholder='Organizer Name' name='organizer' id='organizer' required maxLength='100' value={ programInfo.organizer } onChange={e => setProgram({ ...programInfo, organizer: e.target.value })} />
                    <label className='form__label'>Program Creator / Entity Name</label>
                  </div>
                  <div className='form__group field'>
                    <input type='text' className='form__field' placeholder='Program Name' name='name' id='name' required maxLength='100' value={ programInfo.name } onChange={e => setProgram({ ...programInfo, name: e.target.value })} />
                    <label className='form__label'>Program Name</label>
                  </div>
                  <div className='form__group field'>
                    <input type='text' className='form__field' placeholder='Program Name' name='name' id='name' required maxLength='100' value={ programInfo.url } onChange={e => setProgram({ ...programInfo, url: e.target.value })} />
                    <label className='form__label'>URL Permalink</label>
                  </div>
                  <div className='text-s margin-top-s'>
                    Program Applicant URL: { `https://grants.art/apply/${ programInfo.url ? programInfo.url : '' } ` }
                  </div>
                  <div className='form__group field'>
                    <textarea type='text' className='form__field intent-field' placeholder='Intent' name='intent' id='intent' required maxLength='2000' value={ programInfo.description } onChange={e => setProgram({ ...programInfo, description: e.target.value })} />
                    <label className='form__label'>Program Description (2000 Chars)</label>
                  </div>
                  <div className='form__group field'>
                    <textarea type='text' className='form__field intent-field' placeholder='Intent' name='intent' id='intent' required maxLength='2000' value={ programInfo.logistics } onChange={e => setProgram({ ...programInfo, logistics: e.target.value })} />
                    <label className='form__label'>Grant Logistics (2000 Chars)</label>
                  </div>
                  <div className='form__group field'>
                    <textarea type='text' className='form__field intent-field' placeholder='Intent' name='intent' id='intent' required maxLength='2000' value={ programInfo.criteria } onChange={e => setProgram({ ...programInfo, criteria: e.target.value })} />
                    <label className='form__label'>Applicant Criteria (2000 Chars)</label>
                  </div>
                  <div className='form__group field'>
                    <input type='email' className='form__field' placeholder='Email' name='email' id='email' required maxLength='100' value={ programInfo.email } onChange={e => setProgram({ ...programInfo, email: e.target.value })} />
                    <label className='form__label'>Program Organizer Email</label>
                  </div>
                  <div className='form__group field'>
                    <input type='url' className='form__field' placeholder='URL' name='url' id='url' required maxLength='100' value={ programInfo.website } onChange={e => setProgram({ ...programInfo, website: e.target.value })} />
                    <label className='form__label'>Program Website*</label>
                  </div>
                  <div className='form__group field'>
                    <input type='text' className='form__field' placeholder='Twitter' name='twitter' id='twitter' required maxLength='100' value={ programInfo.twitter } onChange={e => setProgram({ ...programInfo, twitter: e.target.value })} />
                    <label className='form__label'>Program Twitter*</label>
                  </div>
                  <div className='text-s'>
                    @{ data.twitter }
                  </div>
                  <div className='form__group field'>
                    <input type='text' className='form__field' placeholder='Instagram' name='instagram' id='instagram' maxLength='100' value={ programInfo.instagram }  onChange={e => setProgram({ ...programInfo, instagram: e.target.value })} />
                    <label className='form__label'>Program Instagram*</label>
                  </div>
                  <div className='text-s'>
                    @{ data.instagram }
                  </div>
                  { updateErr &&
                    <div className='margin-top text-s text-err'>
                      { updateErr }
                    </div>
                  }
                  { (programSubmitting) &&
                    <div className='margin-top text-s text-grey'>
                      Your program is being updated..
                    </div>
                  }
                  { (!programSubmitting) && 
                  <div>
                    <input type='submit' value='Cancel' className='submit-button' onClick={ () => setEditing(false) } />&nbsp;
                    <input type='submit' value='Update Program Info' className='submit-button' />
                  </div>
                  }
                </form>
              }
            </div>
          </div>
        }
        <div className='margin-top text-l'>Application Form</div>
        <form onSubmit={ submit }>
          { program === 'genesis' &&
          <div>
            <div className='text-s margin-top form__title'>Have you sold your own NFT before?</div>
            <div className='select-dropdown margin-top-minus'>
              <select name='Mint' className='text-black' defaultValue={ dropdownDefault } value={ dropdownDefault } required onChange={e => setData({ ...data, minted: e.target.value })}>
                <option value='default' disabled hidden>
                  Select an option
                </option>
                <option value='false'>No</option>
                <option value='true'>Yes</option>
              </select>
            </div>
          </div>
          }
          <div className='form__group field'>
            <textarea type='text' className='form__field intent-field' placeholder='Intent' name='intent' id='intent' required maxLength='2000' onChange={e => setData({ ...data, statement: e.target.value })} />
            <label className='form__label'>Statement of Intent (2000 chars)</label>
          </div>
          <div className='form__group field'>
            <textarea type='text' className='form__field intent-field' placeholder='Additional' name='additional' id='additional' maxLength='2000' onChange={e => setData({ ...data, additional: e.target.value })} />
            <label className='form__label'>Additional Information (Optional 2000 chars)</label>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Name' name='name' id='name' maxLength='100' onChange={e => setData({ ...data, title: e.target.value })} />
            <label className='form__label'>Artwork Title</label>
          </div>
          <div className='form__group field'>
            <textarea type='text' className='form__field intent-field' placeholder='Description' name='description' id='description' maxLength='1000' onChange={e => setData({ ...data, description: e.target.value })} />
            <label className='form__label'>Artwork Description</label>
          </div>
          <div className='form__group field'>
            <label className='file__label'>Art Submission (JPG, PNG, GIF, WEBP, or MP4 - Max 77MB)</label>
            <input type='file' className='form__field' placeholder='Artwork' name='artwork' id='name' accept='image/jpeg, image/png, image/gif, image/webp, video/mp4' required onChange={ (e) => uploadHandler(e.target) } />
          </div>
          <div className='margin-top-l'>Submission Preview</div>
          { user &&
            <div className='margin-top gallery-container full-width'>
              { !small &&
                <div className='gallery-description'>
                  <div className='text-s'>
                    <div className='gallery-plate metal linear'>
                      <div className='text-s'>
                        <strong>{ user.user.artistName }</strong><br />
                        { user.user.country } { user.user.birthYear && `(b. ${ user.user.birthYear })` }
                      </div>
                      <div className='margin-top-s text-s text-b'>
                        <strong><i>{ data.title || 'Untitled' }</i></strong>, 2021<br />
                        { data.ext } as NFT
                      </div>
                      <div className='margin-top-s text-xs'>
                        { data.description }
                      </div>
                    </div>
                  </div>
                </div>
              }
              { data.art &&
                <div className={ `flex-full center ${ small ? 'gallery-frame-container-small' : 'gallery-frame-container' }` }>
                  <div className='frame gallery-art-container'>
                    <div className='frame-shadow'>
                      { (data.ext === 'mp4' || data.ext === 'mov') ?
                        <video muted loop autoPlay webkit-playsinline='true' playsInline className='gallery-art'>
                          <source src={ data.art } />
                          Sorry, your browser doesn't support embedded videos.
                        </video>
                        :
                        <img className='gallery-art' src={ data.art } />
                      }
                    </div>
                  </div>
                </div>
              }
              { small &&
                <div className='margin-top gallery-description'>
                  <div className='text-s'>
                    <div className='gallery-plate metal linear'>
                      <div className='text-s'>
                        <strong>{ user.user.artistName }</strong><br />
                        { user.user.country } { user.user.birthYear && `(b. ${ user.user.birthYear })` }
                      </div>
                      <div className='margin-top-s text-s text-b'>
                        <strong><i>{ data.title || 'Untitled' }</i></strong>, 2021<br />
                        { data.ext } as NFT
                      </div>
                      <div className='margin-top-s text-xs'>
                        { data.description }
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
          { err ? 
            <div className='margin-top text-s text-err'>
              { err }
            </div>
          :
            <div className='margin-top text-s text-grey'>
              {/* <i>Applications are currently closed until early April</i> */}
            </div>
          }
          { (submitting && !submitted) &&
            <div className='margin-top text-s text-grey'>
              Your application is being submitted..
            </div>
          }
          { submitted &&
            <div className='margin-top text-s text-rainbow'>
              Thank you for submitting your application!<br />
              We will get back to you once we announce an acceptance date via e-mail or social direct message.
            </div>
          }
          {/* { (!submitting && !submitted) && <input type='submit' value='Submit Application' className='submit-button' /> } */}
        </form>
        <br />
      </div>
    </div>
  );
}