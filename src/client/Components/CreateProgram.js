import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { apiUrl } from '../baseUrl';
import Resizer from './Tools/Resizer.js';

import '../styles.scss';

export default function Application() {
  const auth = useStoreState(state => state.user.auth);

  const [data, setData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState(false);
  const submit = e => {
    console.log(data);
    e.preventDefault();
    if (!data.organizer || !data.name || !data.url || !data.description || !data.logistics || !data.criteria) setErr('Please complete all required fields');
    else {
      setErr(false);
      setSubmitting(true);
      fetch(`${ apiUrl() }/program/createProgram`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })
        .then(res => res.json())
        .then(json => setSubmitted(true))
    }
  }

  return (
    <div className='content-block'>
      <Resizer />
      <div className='text-l text-b'>
        Request a Program
      </div>
      <div className='margin-top'>
        <div className='ethos-text'>
          Sevens Genesis Grant is for digital artists who have not sold an NFT before. 
          We will mint and transfer your single editioned artwork to you as part of the Sevens Genesis Grant exhibition
          as well as provide additional funds to proceed with your first ever sale.
        </div>
        <form onSubmit={ submit }>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Organizer Name' name='organizer' id='organizer' required maxLength='100' onChange={e => setData({ ...data, organizer: e.target.value })} />
            <label className='form__label'>Program Creator / Entity Name</label>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Program Name' name='name' id='name' required maxLength='100' onChange={e => setData({ ...data, name: e.target.value })} />
            <label className='form__label'>Program Name</label>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Program Name' name='name' id='name' required maxLength='100' onChange={e => setData({ ...data, url: e.target.value })} />
            <label className='form__label'>URL Permalink</label>
          </div>
          <div className='text-s margin-top-s'>
            Program Applicant URL: { `https://grants.art/apply/${ data.url ? data.url : '' } ` }
          </div>
          <div className='form__group field'>
            <textarea type='text' className='form__field intent-field' placeholder='Intent' name='intent' id='intent' required maxLength='2000' onChange={e => setData({ ...data, description: e.target.value })} />
            <label className='form__label'>Program Description (2000 Chars)</label>
          </div>
          <div className='form__group field'>
            <textarea type='text' className='form__field intent-field' placeholder='Intent' name='intent' id='intent' required maxLength='2000' onChange={e => setData({ ...data, logistics: e.target.value })} />
            <label className='form__label'>Grant Logistics (2000 Chars)</label>
          </div>
          <div className='form__group field'>
            <textarea type='text' className='form__field intent-field' placeholder='Intent' name='intent' id='intent' required maxLength='2000' onChange={e => setData({ ...data, criteria: e.target.value })} />
            <label className='form__label'>Applicant Criteria (2000 Chars)</label>
          </div>
          <div className='form__group field'>
            <input type='email' className='form__field' placeholder='Email' name='email' id='email' required maxLength='100' onChange={e => setData({ ...data, email: e.target.value })} />
            <label className='form__label'>Program Organizer Email</label>
          </div>
          <div className='form__group field'>
            <input type='url' className='form__field' placeholder='URL' name='url' id='url' required maxLength='100' onChange={e => setData({ ...data, website: e.target.value })} />
            <label className='form__label'>Program Website*</label>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Twitter' name='twitter' id='twitter' required maxLength='100' onChange={e => setData({ ...data, twitter: e.target.value })} />
            <label className='form__label'>Program Twitter*</label>
          </div>
          <div className='text-s'>
            @{ data.twitter }
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Instagram' name='instagram' id='instagram' maxLength='100' onChange={e => setData({ ...data, instagram: e.target.value })} />
            <label className='form__label'>Program Instagram*</label>
          </div>
          <div className='text-s'>
            @{ data.instagram }
          </div>
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
              Your program request is being submitted..
            </div>
          }
          { submitted &&
            <div className='margin-top text-s text-rainbow'>
              Thank you for submitting your program! We will be in touch soon.<br />
            </div>
          }
          { (!submitting && !submitted) && <input type='submit' value='Submit Program Request' className='submit-button' /> }
        </form>
        <br />
      </div>
    </div>
  );
}