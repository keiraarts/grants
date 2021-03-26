import React, { useState, Select } from 'react';
import { useParams } from "react-router-dom";
import CountryList from 'country-list';
import { apiUrl } from '../baseUrl';

import '../styles.scss';

export default function Application() {
  const { program } = useParams();
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
        { program === 'genesis' && 'Sevens Genesis Grant' }
        { program === 'giving-back' && '"Giving Back" Exhibition' }
      </div>
      <div className='text-s margin-top-s'>
        Curated by&nbsp;
        <strong>
          { program === 'genesis' && 'Sevens Foundation' }
          { program === 'giving-back' && 'Sevens Foundation' }
        </strong>
      </div>
      <div className='margin-top'>
        { program === 'genesis' &&
          <div>
            <div className='ethos-text'>
              Sevens Genesis Grant is for digital artists who have not sold an NFT before. 
              We will mint and transfer your single editioned artwork to you as part of the Sevens Genesis Grant exhibition
              as well as provide additional funds to proceed with your first ever sale.
              <br /><br />
              We will highlight you and your work as being a grant recipient and provide the means necessary in order for you to become
              an independent and self-sustainable artist on various NFT platforms available.
              <br /><br />
              Not only will you receive funding and resources but also special NFTs and gifts by commissioned or donating artists
              as well as an invitation to a community of your fellow recipients and a grand welcome into the industry.
              <br /><br />
              We seek quality work with a proven track record of a passion for art, regardless of your current recognition with a preference
              to those who are determined to seek aid for starting their self-sovereign career.
            </div>
            <div className='margin-top-l text-s'>
              <strong>Grant Logistics</strong>
              <div className='margin-top-s'>
                - Sevens takes 0% of profits and no artwork resale royalties are distributed<br /><br />
                - We may promote your artwork on our @SevensGrant social media accounts on Instagram and Twitter<br /><br />
                - Applications are accepted on a weekly basis (approximately) and you will receive your artwork as an NFT minted by Sevens Foundation as well as ~$100 of Ether to complete your sale
              </div>
            </div>
            <div className='margin-top text-s'>
              <strong>Application Criteria</strong>
              <div className='margin-top-s'>
                - You have not sold an NFT before<br /><br />
                - You believe you are disadvantaged from either finances, social media visibility, or sociopolitically.
              </div>
            </div>
          </div>
        }
        { program === 'giving-back' &&
          <div className='ethos-text'>
            Sevens was founded under the premise of giving back to the community in which we quickly evolved to understand how important the integrity of this creative space is
            for our collective future. It is our mission to represent the ethos of empowering digital artists in our fight against traditional predatory practices and perceptions
            of creative work and compensation.
            <br /><br />
            The "Giving Back" Exhibition is the first open application & community driven curated NFT art show in history. Through this exhibition we strive to lead by example
            by setting a precedent of healthy & community involvement, integrity, and art - in the spirit of blockchain and decentralization.
            <div className='margin-top-l text-s'>
              <strong>Grant Logistics</strong>
              <div className='margin-top-s'>
                - Sevens takes 0% of profits and no artwork resale royalties are distributed<br /><br />
                - We may promote your artwork on our social media accounts @SevensGrant on Instagram and Twitter<br /><br />
                - Applications will close on May 7th and the decisions will be out by May 11th
              </div>
            </div>
            <div className='margin-top text-s'>
              <strong>Application Criteria</strong>
              <div className='margin-top-s'>
                - The artwork must represent the theme of "Giving Back" in some way, shape, or form<br /><br />
              </div>
            </div>
          </div>
        }
        <div className='margin-top text-l'>Application Form</div>
        <form onSubmit={ submit }>
          {/* <div className='select-dropdown'>
            <select name='Country' defaultValue='default' required onChange={e => setData({ ...data, country: e.target.value, countryCode: CountryList.getCode(e.target.value) })}>
              <option value='default' disabled hidden> 
                Minted an NFT before?
              </option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
            </select>
          </div>
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
          </div> */}
          <div className='form__group field'>
            <input type='url' className='form__field' placeholder='URL' name='url' id='url' required maxLength='100' onChange={e => setData({ ...data, reference: e.target.value })} />
            <label className='form__label'>Portfolio Reference URL</label>
          </div>
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
            <input type='file' className='form__field' placeholder='Artwork' name='artwork' id='name' accept='image/jpeg, image/png, image/gif, image/webp, video/mp4' required onChange={ (e) => uploadHandler(e.target, 'art') } />
          </div>
          {/* <div className='form__group field'>
            <label className='file__label'>Thumbnail GIF for MP4* - Square Size Recommended (WEBP, GIF - Max 33MB)</label>
            <input type='file' className='form__field' placeholder='Artwork' name='artwork' id='name' accept='image/gif, image/webp' onChange={ (e) => uploadHandler(e.target, 'thumbnail') } />
          </div> */}
          { err ? 
            <div className='margin-top-s text-s text-err'>
              { err }
            </div>
          :
            <div className='margin-top-s text-s text-grey'>
              <i>Applications are currently closed until early April</i>
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