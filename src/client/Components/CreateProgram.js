import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { Link } from "react-router-dom";
import { apiUrl } from '../baseUrl';
import Resizer from './Tools/Resizer.js';

import '../styles.scss';

function doDashes(str) {
  var re = /[^a-z0-9]+/gi; // global and case insensitive matching of non-char/non-numeric
  var re2 = /^-*|-*$/g;     // get rid of any leading/trailing dashes
  str = str.replace(re, '-');  // perform the 1st regexp
  return str.replace(re2, '').toLowerCase(); // ..aaand the second + return lowercased result
}

export default function Application() {
  const auth = useStoreState(state => state.user.auth);

  const [org, setOrg] = useState(null);
  useEffect(() => {
    if (auth && auth.token) {
      fetch(`${ apiUrl() }/program/getMyOrgs`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      }).then(res => res.json())
      .then(json => {
        if (json && !json.error) setOrg(json)
      });
    }
  }, [])

  const [data, setData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState(false);
  const submit = e => {
    e.preventDefault();
    if (org && (!data.name || !data.url || !data.description || !data.logistics || !data.criteria)) setErr('Please complete all required fields');
    else if (!org && (!data.orgName || !data.about || !data.name ||
             !data.url || !data.description || !data.logistics || !data.criteria)) setErr('Please complete all required fields');
    else if (!auth || !auth.username) setErr('You must be logged in to submit');
    else {
      setErr(false);
      setSubmitting(true);
      fetch(`${ apiUrl() }/program/createProgram`, {
        method: 'POST',
        body: JSON.stringify({ ...data, existing: org ? org.id : undefined }),
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
        Create a Grant Program
      </div>
      <div className='margin-top'>
        <div className='ethos-text'>
          Sevens Foundation is purely focused on artistic and social integrity. Participating exhibitions must have either a community upbringing, charitable, or humanitarian cause.
          Providing grants, at the minimum, must cover all costs for minting recipients' NFTs.
        </div>
        { (!auth || !auth.username) && <Link to='/login' className='margin-top text-mid text-grey'>You must have an account to submit a program</Link> }
        <form onSubmit={ submit }>
          <div className='margin-top'>
            Program Curator or Organization
          </div>
          { org ?
            <div>
              <Link className='text-rainbow' to={ `/curator/${ org.url }` }>{ org.name }</Link>
            </div>
          :
            <div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Organizer Name' name='organizer' id='organizer' required maxLength='100' onChange={e => setData({ ...data, orgName: e.target.value })} />
                <label className='form__label'>Name</label>
              </div>
              <div className='form__group field'>
                <textarea type='text' className='form__field intent-field' placeholder='Intent' name='intent' id='intent' required maxLength='2000' onChange={e => setData({ ...data, about: e.target.value })} />
                <label className='form__label'>About (2000 Chars)</label>
              </div>
              <div className='form__group field'>
                <input type='email' className='form__field' placeholder='Email' name='email' id='email' maxLength='100' onChange={e => setData({ ...data, email: e.target.value })} />
                <label className='form__label'>Public / Contact Email*</label>
              </div>
              <div className='form__group field'>
                <input type='url' className='form__field' placeholder='URL' name='url' id='url' maxLength='100' onChange={e => setData({ ...data, website: e.target.value })} />
                <label className='form__label'>Website*</label>
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Twitter' name='twitter' id='twitter' maxLength='100' onChange={e => setData({ ...data, twitter: e.target.value })} />
                <label className='form__label'>Twitter*</label>
              </div>
              <div className='text-s'>
                @{ data.twitter }
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Instagram' name='instagram' id='instagram' maxLength='100' onChange={e => setData({ ...data, instagram: e.target.value })} />
                <label className='form__label'>Instagram*</label>
              </div>
              <div className='text-s'>
                @{ data.instagram }
              </div>
            </div>
          }
          <div className='margin-top'>
            Program Details
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Program Name' name='name' id='name' required maxLength='100' onChange={e => setData({ ...data, name: e.target.value })} />
            <label className='form__label'>Program Name</label>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Program Name' name='name' id='name' required maxLength='100' onChange={e => setData({ ...data, url: doDashes(e.target.value) })} />
            <label className='form__label'>URL Permalink</label>
          </div>
          <div className='text-s margin-top-s'>
            Exhibition URL: { `https://grants.art/${ data.url ? data.url : '' } ` }
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
          { err &&
            <div className='margin-top text-s text-err'>
              { err }
            </div>
          }
          { (submitting && !submitted) &&
            <div className='margin-top text-s text-grey'>
              Your program request is being submitted..
            </div>
          }
          { submitted &&
            <div>
              <div className='margin-top text-s text-rainbow'>
                Thank you for submitting your program! Please let us know when you would like your exhibition to be listed publicly.
              </div>
              <Link to={ `/apply/${ data.url }` } className='margin-top-s text-grey'>You can navigate to your page to edit your details!</Link>
            </div>
          }
          { (!submitting && !submitted) && <input type='submit' value='Submit Program Request' className='submit-button' /> }
        </form>
        <br />
      </div>
    </div>
  );
}