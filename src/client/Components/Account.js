import React, { useState, useEffect } from 'react';
import { usePromise } from 'promise-hook';
import { Redirect } from "react-router-dom";
import { apiUrl } from '../baseUrl';
import { ethers, Contract } from 'ethers';
import { useStoreState, useStoreActions } from 'easy-peasy';
const { web3 } = window

import '../styles.scss';

let provider, signer;

export default function Register() {
  const auth = useStoreState(state => state.user.auth);
  const setAuth = useStoreActions(dispatch => dispatch.user.setAuth);

  const { isLoading, data } = usePromise(() => getAccount(auth.token), {
    resolve: true,
    resolveCondition: []
  });

  const [editingAccount, setEditingAccount] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [application, setApplication] = useState({});
  const [err, setErr] = useState(false);
  const submit = e => {
    e.preventDefault();
    if (!application.minted) setErr('Please indicate if you have minted an NFT before');
    else if (!application.name) setErr('Please include an artist name');
    else if (!application.description) setErr('Please include a description for your art piece');
    else {
      setErr(false);
      setSubmitting(true);
      fetch(`${ apiUrl() }/updateApplication`, {
        method: 'POST',
        body: JSON.stringify(application),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })
        .then(res => res.json())
        .then(json => setSubmitting(true))
    }
  }

  useEffect(() => {
    if (data) {
      console.log('yo', data.user);
      setApplication({
        ...application,
        name: data.user.artistName,
        description: data.application.description,
        minted: data.application.minted
      })
    }
  }, [data]);

  const [address, setAddress] = useState(null);
  function connectWallet() {
    if (window.ethereum) {
      window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
      signer = provider.getSigner();
      signer.getAddress().then(add => { setAddress(add); });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
          connectWallet();
        })
      }

      connectWallet();
    }, 1000)
  }, []);

  const [logout, setLogout] = useState(false);
  const logMeOut = e => {
    setAuth({});
    setLogout(true);
  }

  console.log(`${ application.minted }`);

  return (
    <div className='content-block'>
      { logout && <Redirect to='/' /> }
      <div className='text-l flex'>
        Sevens Genesis Grant
        <div className='flex-full' />
        <div className='text-s flex'>
          <div className='flex-full' />
          <span className='text-grey pointer' onClick={ logMeOut }>Logout</span>
        </div>
      </div>
      <div className='margin-top'>
        { editingAccount &&
          <form onSubmit={ submit }>
            <div className='form__group field'>
              <input type='text' className='form__field' placeholder='First Name' name='first' id='first' required maxLength='100' onChange={e => setRegisterData({ ...registerData, first: e.target.value })} />
              <label className='form__label'>First Name</label>
            </div>
            <div className='form__group field'>
              <input type='text' className='form__field' placeholder='Last Name' name='last' id='last' required maxLength='100' onChange={e => setRegisterData({ ...registerData, last: e.target.value })} />
              <label className='form__label'>Last Name</label>
            </div>
            <div className='form__group field'>
              <input type='text' className='form__field' placeholder='Username' name='username' id='username' required maxLength='100' onChange={e => setRegisterData({ ...registerData, username: e.target.value })} />
              <label className='form__label'>Username</label>
            </div>
            <div className='form__group field'>
              <input type='email' className='form__field' placeholder='Email' name='email' id='email' required maxLength='100' onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
              <label className='form__label'>Email</label>
            </div>
            <div className='form__group field'>
              <input type='password' className='form__field' placeholder='Password' name='password' id='password' maxLength='100' required onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
              <label className='form__label'>Password</label>
            </div>
            <div className='form__group field'>
              <input type='password' className='form__field' placeholder='Confirm Password' name='password' id='password' required maxLength='100' onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })} />
              <label className='form__label'>Confirm Password</label>
            </div>
            { err &&
              <div className='margin-top-s text-s text-err'>
                { err }
              </div>
            }
            { (submitting && !submitted) ?
              <div className='margin-top-s text-s text-grey'>
                Your registration is being submitted..
              </div>
              :
              <input type='submit' value='Register Account' className='submit-button' />
            }
            { submitted &&
              <div className='margin-top-s text-s text-rainbow'>
                Thank you for submitting your application!<br />
                We will get back to you once we announce an acceptance date via e-mail or social direct message.
              </div>
            }
          </form>
        }
        <div className='page-container'>
          { (!editingAccount && data && data.user) &&
            <div>
              <div className='text-s'><strong>Name</strong></div>
              <div className='text-s'>{ data.user.first } { data.user.last }</div>
              <div className='text-s margin-top-s'><strong>Email</strong></div>
              <div className='text-s'>{ data.user.email }</div>
              <div className='text-s margin-top-s'><strong>Wallet Address</strong></div>
              <div className='text-s'>{ address || 'No Wallet Specified' }</div>
            </div>
          }
          { (!editingAccount && data && data.application) &&
            <div>
              <div className='text-m margin-top'>Application Info</div>
              <div className='select-dropdown margin-top-s'>
                Have you minted an NFT before?
                <select name='Mint' defaultValue={ application.minted === undefined ? 'default' : `${ application.minted }` } required onChange={e => setApplication({ ...application, minted: e.target.value })}>
                  <option value='default' disabled hidden>
                    Select an option
                  </option>
                  <option value='false'>No</option>
                  <option value='true'>Yes</option>
                </select>
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Name' name='name' id='name' value={ application.name } maxLength='100' onChange={e => setApplication({ ...application, name: e.target.value })} />
                <label className='form__label'>Artist Name</label>
              </div>
              <div className='text-s margin-top-s'><strong>Artwork Submission</strong></div>
              { data.application.art &&
                <div>
                  { (data.application.art && data.application.art.slice(-3) === 'mp4') ?
                  <video controls webkit-playsinline playsinline muted loop>
                    <source src={ `https://cdn.grants.art/${ data.application.art }` }
                            type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                  :
                    <img src={ `https://cdn.grants.art/${ data.application.art }` } />
                  }
                </div>
              }
              { data.application.thumbnail &&
                <div>
                  <div className='text-s margin-top-s'><strong>Artwork Thumbnail</strong></div>
                  <img src={ `https://cdn.grants.art/${ data.application.thumbnail }` } />
                </div>
              }
              <div className='form__group field'>
                <textarea type='text' className='form__field intent-field' placeholder='Email' name='email' id='name' value={ application.description } maxLength='1000' onChange={e => setApplication({ ...application, description: e.target.value })} />
                <label className='form__label'>Artwork Description</label>
              </div>
              { err &&
                <div className='margin-top-s text-s text-err'>
                  { err }
                </div>
              }
              { !submitting && <input type='submit' value='Update Application' className='submit-button' onClick={ submit } /> }
              { submitting &&
                <div className='margin-top-s text-s text-grey'>
                  Your application is being updated..
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
}

const getAccount = (jwt) => {
  return fetch(`${ apiUrl() }/getAccount`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': jwt
    },
  }).then(res => res.json());
}