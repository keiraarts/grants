import React, { useState } from 'react';
import { apiUrl } from '../baseUrl';

import '../styles.scss';

export default function Application() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submit = e => {
    e.preventDefault();
    setSubmitting(true);
    fetch(`${ apiUrl() }/submitApplication`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => setSubmitted(true))
  }

  const [err, setErr] = useState(false);
  const [data, setData] = useState({});
  const uploadHandler = (target, type) => {
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
      if (ext === 'webp') responsetype = 'image/webp';
      if (ext === 'mp4') responsetype = 'video/mp4';

      if (file.size < 32000000) {
        if (responsetype) {
          if (type === 'art') setData({ ...data, art: reader.result })
          if (type === 'cover') setData({ ...data, cover: reader.result })
        } else {
          setErr('File type unsupported');
        }
      } else {
        setErr('File size too large');
      }
    }
  };

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Artist Application
      </div>
      <div className='text-s margin-top-s text-desc'>
        As your first NFT mint, submit this form with a single work of art that you believe is powerful and true to yourself
      </div>
      <div className='page-container margin-top'>
        <form onSubmit={ submit }>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Name' name='name' id='name' required maxLength='100' onChange={e => setData({ ...data, name: e.target.value })} />
            <label className='form__label'>Artist Name</label>
          </div>
          <div className='form__group field'>
            <input type='email' className='form__field' placeholder='Email' name='email' id='email' required maxLength='100' onChange={e => setData({ ...data, email: e.target.value })} />
            <label className='form__label'>Email</label>
          </div>
          <div className='form__group field'>
            <input type='url' className='form__field' placeholder='URL' name='url' id='url' required maxLength='100' onChange={e => setData({ ...data, website: e.target.value })} />
            <label className='form__label'>Website or Prior Artwork URL</label>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Twitter' name='twitter' id='twitter' maxLength='100' onChange={e => setData({ ...data, twitter: e.target.value })} />
            <label className='form__label'>Twitter Handle*</label>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Instagram' name='instagram' id='instagram' maxLength='100' onChange={e => setData({ ...data, instagram: e.target.value })} />
            <label className='form__label'>Instagram Handle*</label>
          </div>
          <div className='form__group field'>
            <textarea type='text' className='form__field intent-field' placeholder='Email' name='email' id='name' required maxLength='2000' onChange={e => setData({ ...data, statement: e.target.value })} />
            <label className='form__label'>Statement of Intent</label>
          </div>
          <div className='form__group field'>
            <input type='file' className='form__field' placeholder='Artwork' name='artwork' id='name' required onChange={ (e) => uploadHandler(e.target, 'art') } />
            <label className='form__label'>Art Submission (JPG, PNG, GIF, WEBP, or MP4 - Max 30mb)</label>
          </div>
          <div className='form__group field'>
            <input type='file' className='form__field' placeholder='Artwork' name='artwork' id='name' onChange={ (e) => uploadHandler(e.target, 'cover') } />
            <label className='form__label'>Cover GIF for MP4* - Square Aspect Ratio Recommended (WEBP, GIF - Max 30mb)</label>
          </div>
          { err ? 
            <div className='margin-top-s text-s text-err'>
              { err }
            </div>
          :
            <div className='margin-top-s text-s'>
              Starred fields* are optional but strongly recommended
            </div>
          }
          { (submitting && !submitted) &&
            <div className='margin-top-s text-s text-rainbow'>
              Your application is being submitted..
            </div>
          }
          { submitted &&
            <div className='margin-top-s text-s text-rainbow'>
              Thank you for submitting your application! We will get back to you soon via e-mail or social direct message.
            </div>
          }
          { (!submitting && !submitted) && <input type='submit' value='Applications Are Currently Closed' className='submit-button' /> }
        </form>
        <br />
      </div>
    </div>
  );
}