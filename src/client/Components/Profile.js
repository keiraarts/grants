import React, { useState, useEffect } from 'react';
import { usePromise } from 'promise-hook';
import { useParams } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ReactAutolinker from 'react-autolinker';
import WalletConnect from './WalletConnect';
import { apiUrl } from '../baseUrl';

import Resizer from './Tools/Resizer.js';
import Collection from './MyGallery/Collection.js';

import Verified from '../assets/verified.png';
import Earth from '../assets/earth.png';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';

import '../styles.scss';

function openLink(page)
{
  page = page.replace('@', '');
  if (user.twitter.substring(0, 3) === 'www') page = `https://${ page }`
  let win = window.open(page, '_blank');
  win.focus();
}

export default function Profile() {
  const { username } = useParams();
  const auth = useStoreState(state => state.user.auth);
  const setAuth = useStoreActions(dispatch => dispatch.user.setAuth);
  const small = useStoreState(state => state.app.small);

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`${ apiUrl() }/getProfile`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then(json => {
      if (json.success) setData(json.success);
    });
  }, [username])

  const [galleries, setGalleries] = useState(null);
  useEffect(() => {
    if (data && data.id) {
      fetch(`${ apiUrl() }/gallery/getGalleries`, {
        method: 'POST',
        body: JSON.stringify({ user: data.id }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
      .then(json => {
        if (json && json.success) setGalleries(json.success);
      });
    }
  }, [data])

  const addNewGallery = (gallery) => {
    setGalleries([...galleries, gallery])
  }

  const [logout, setLogout] = useState(false);
  const logMeOut = e => {
    setAuth({});
    setLogout(true);
  }

  const [editCollection, setEditCollection] = useState(false);

  let user = {}
  if (data) user = data;

  return (
    <div className='content-block'>
      <Resizer />
      { !editCollection &&
        <div>
          { !data &&
            <div className='center flex'>
              <div className='margin-top center'>
                <div className="loading"><div></div><div></div></div>
              </div>
            </div>
          }
          { logout && <Redirect to='/' /> }
          <div className='text-l flex'>
            <div>
              <strong>{ user.username ? `${ user.artistName ? user.artistName : user.username }` : username }</strong>
              { user.twitterVerified && <img src={ Verified } className='profile-verified' title='Twitter Verified' /> }
            </div>
            <div className='flex-full' />
            { (auth && auth.username === user.username) &&
              <div className='text-s flex'>
                <div className='flex-full' />
                <span className='text-grey pointer' onClick={ logMeOut }>Logout</span>
              </div>
            }
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
          <div className='margin-top line-breaks'>
            <div className='text-l'>
              <strong>About</strong>
            </div>
            <div className='margin-top-s text-m'>
              { user.about ? 
                <ReactAutolinker text={ user.about } />
              :
                <div>{ user.username ? `${ user.artistName ? user.artistName : user.username }` : username } is a beautiful soul.</div>
              }
            </div>
            <br />
          </div>
        </div>
      }
      <Collection 
        galleries={ galleries }
        addNewGallery={ addNewGallery }
        editing={ editCollection }
        setEditCollection={ setEditCollection }
        setGalleries={ setGalleries }
        username={ username }
      />
    </div>
  );
}
