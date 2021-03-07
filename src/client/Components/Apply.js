import React, { useState, Select } from 'react';
import CountryList from 'country-list';
import { apiUrl } from '../baseUrl';

import '../styles.scss';

export default function Application() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState(false);
  const submit = e => {
    e.preventDefault();
    if (!data.country || !data.countryCode) setErr('Please select your Country of Representation');
    else if (!data.name) setErr('Please include an artist name');
    else if (!data.email) setErr('Please include an email');
    else if (!data.twitter) setErr('Please include a Twitter handle');
    else if (!data.website) setErr('Please include a URL reference');
    else if (!data.art) setErr('No artwork selected');
    else if (!data.statement) setErr('Please write a statement of intent');
    else {
      setErr(false);
      setSubmitting(true);
      fetch(`${ apiUrl() }/submitApplication`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => setSubmitted(true))
    }
  }


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
      if (ext === 'ebp') responsetype = 'image/webp';
      if (ext === 'mp4') responsetype = 'video/mp4';

      if ((type === 'art' && file.size < 120000000) || (type === 'thumbnail' && file.size < 32000000)) {
        if (responsetype) {
          if (type === 'art') setData({ ...data, art: reader.result })
          if (type === 'thumbnail') setData({ ...data, thumbnail: reader.result })
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
      <div className='text-s margin-top-s'>
        As your first NFT mint, submit this form with a single work of art that you believe is powerful and true to yourself
      </div>
      <div className='margin-top'>
        <div className='text-s'>
          <i>Please note this is reserved for artists who have not sold an NFT before</i><br /><br />
          <i>Starred fields* are optional but strongly recommended</i>
        </div>
        <form onSubmit={ submit }>
          {/* <div className='select-dropdown'>
            <select name='Country' defaultValue='default' required onChange={e => setData({ ...data, country: e.target.value, countryCode: CountryList.getCode(e.target.value) })}>
              <option value='default' disabled hidden> 
                Minted an NFT before?
              </option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
            </select>
          </div> */}
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Name' name='name' id='name' required maxLength='100' onChange={e => setData({ ...data, name: e.target.value })} />
            <label className='form__label'>Artist Name</label>
          </div>
          <div className='select-dropdown'>
            <select name='Country' defaultValue='default' required onChange={e => setData({ ...data, country: e.target.value, countryCode: CountryList.getCode(e.target.value) })}>
              <option value='default' disabled hidden> 
                Country of Representation
              </option> 
              {CountryList.getNames().map((fbb, key) =>
                <option key={ key } value={ fbb }>{ fbb }</option>
              )};
            </select>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='City' name='city' id='city' maxLength='100' onChange={e => setData({ ...data, city: e.target.value })} />
            <label className='form__label'>City*</label>
          </div>
          <div className='form__group field'>
            <input type='email' className='form__field' placeholder='Email' name='email' id='email' required maxLength='100' onChange={e => setData({ ...data, email: e.target.value })} />
            <label className='form__label'>Email</label>
          </div>
          <div className='form__group field'>
            <input type='url' className='form__field' placeholder='URL' name='url' id='url' required maxLength='100' onChange={e => setData({ ...data, website: e.target.value })} />
            <label className='form__label'>Website / Artwork URL</label>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Twitter' name='twitter' id='twitter' required maxLength='100' onChange={e => setData({ ...data, twitter: e.target.value })} />
            <label className='form__label'>Twitter @Handle</label>
          </div>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Instagram' name='instagram' id='instagram' maxLength='100' onChange={e => setData({ ...data, instagram: e.target.value })} />
            <label className='form__label'>Instagram @Handle*</label>
          </div>
          <div className='form__group field'>
            <textarea type='text' className='form__field intent-field' placeholder='Email' name='email' id='name' required maxLength='2000' onChange={e => setData({ ...data, statement: e.target.value })} />
            <label className='form__label'>Statement of Intent (2000 chars)</label>
          </div>
          <div className='form__group field'>
            <textarea type='text' className='form__field intent-field' placeholder='Email' name='email' id='name' maxLength='2000' onChange={e => setData({ ...data, additional: e.target.value })} />
            <label className='form__label'>Additional Information (2000 chars)*</label>
          </div>
          <div className='form__group field'>
            <label className='file__label'>Art Submission (JPG, PNG, GIF, WEBP, or MP4 - Max 77MB)</label>
            <input type='file' className='form__field' placeholder='Artwork' name='artwork' id='name' accept='image/jpeg, image/png, image/gif, image/webp, video/mp4' required onChange={ (e) => uploadHandler(e.target, 'art') } />
          </div>
          <div className='form__group field'>
            <label className='file__label'>Thumbnail GIF for MP4* - Square Size Recommended (WEBP, GIF - Max 33MB)</label>
            <input type='file' className='form__field' placeholder='Artwork' name='artwork' id='name' accept='image/gif, image/webp' onChange={ (e) => uploadHandler(e.target, 'thumbnail') } />
          </div>
          { err ? 
            <div className='margin-top-s text-s text-err'>
              { err }
            </div>
          :
            <div className='margin-top-s text-s'>
              <i>Applications are closed!</i>
            </div>
          }
          { (submitting && !submitted) &&
            <div className='margin-top-s text-s text-grey'>
              Your application is being submitted..
            </div>
          }
          { submitted &&
            <div className='margin-top-s text-s text-rainbow'>
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