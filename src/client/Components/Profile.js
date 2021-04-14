import React, { useState, useEffect } from 'react';
import { usePromise } from 'promise-hook';
import { useParams } from "react-router-dom";
import { useStoreState } from 'easy-peasy';
import ReactAutolinker from 'react-autolinker';
import { apiUrl } from '../baseUrl';

import Resizer from './Tools/Resizer.js';

import Verified from '../assets/verified.png';
import Earth from '../assets/earth.png';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';

import '../styles.scss';

export default function Profile() {
  const { username } = useParams();
  const small = useStoreState(state => state.app.small);

  const { isLoading, data } = usePromise(() => getProfile(username), {
    resolve: true,
    resolveCondition: []
  });

  function openLink(page)
  {
    page = page.replace('@', '');
    if (user.twitter.substring(0, 3) === 'www') page = `https://${ page }`
    let win = window.open(page, '_blank');
    win.focus();
  }

  let user = {}
  if (data) user = data;

  return (
    <div className='content-block'>
      <Resizer />
      { isLoading &&
        <div className='center flex'>
          <div className='margin-top center'>
            <div className="loading"><div></div><div></div></div>
          </div>
        </div>
      }
      <div className='text-l flex'>
        <strong>{ user.username ? `${ user.artistName ? user.artistName : user.username }` : username }</strong>
        { user.twitterVerified && <img src={ Verified } className='profile-verified' title='Twitter Verified' /> }
      </div>
      { (user.first || user.last) &&
        <div className='text-s'>
          { user.first ? `${ user.first } ` : '' }{ user.last }
        </div>
      }
      { (user.city || user.country) &&
        <div className='text-s margin-top-xs'>
          <img className='earth-icon' src={ Earth } />{ user.city }, { user.country }
        </div>
      }
      <div className={ `flex margin-top ${ small ? 'center' : '' } ` }>
        { user.website && <img src={ Web } className='social-icon-web pointer' alt='Website' onClick={ () => openLink(user.website) } /> }
        { user.twitter && <img src={ Twitter } className='social-icon' alt='Twitter' onClick={ () => openLink(`https://twitter.com/${ user.twitter }`) } /> }
        { user.instagram && <img src={ Instagram } className='social-icon' alt='Instagram' onClick={ () => openLink(`https://instagram.com/${ user.instagram }`) } /> }
        { user.email && <a href={ `mailto:${ user.email }` }><img src={ Email } className='social-icon' alt='Email' /></a> }
      </div>
      { user.about &&
        <div className='margin-top line-breaks'>
          <div className='text-l'>
            <strong>About</strong>
          </div>
          <div className='margin-top-s text-m'>
            <ReactAutolinker text={ user.about } />
          </div>
        </div>
      }
      <br />
    </div>
  );
}

const getProfile = (username) => {
  return fetch(`${ apiUrl() }/getProfile`, {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
  .then(json => {
    if (json.success) return json.success;
    return null;
  });
}
