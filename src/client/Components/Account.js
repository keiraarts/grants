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
  const verifiedWallet = useStoreState(state => state.user.auth.wallet);
  const setAuth = useStoreActions(dispatch => dispatch.user.setAuth);

  const { isLoading, data } = usePromise(() => getAccount(auth.token), {
    resolve: true,
    resolveCondition: []
  });

  const [editingAccount, setEditingAccount] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [application, setApplication] = useState({});
  const [err, setErr] = useState(false);
  const submit = e => {
    console.log(application);
    e.preventDefault();
    if (application.minted === undefined || !application.name || !application.birthYear || !application.description) setErr('Please complete all fields to update your application');
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
        .then(json => { setSubmitting(false); setSubmitted(true); })
    }
  }

  useEffect(() => {
    if (data && data.user) {
      setApplication({
        ...application,
        name: data.user.artistName,
        birthYear: data.user.birthYear,
        description: data.application ? data.application.description : null,
        minted: data.application ? data.application.minted : null
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

  const [verifiedAddress, setVerifiedAddress] = useState(null);
  function verifyWallet() {
    const message = 'Verify wallet address for Sevens Foundation';
    signer.signMessage(message).then(signature => {
      fetch(`${ apiUrl() }/verifyWallet`, {
        method: 'POST',
        body: JSON.stringify({ address, signature }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json === true) {
            const updateWallet = auth;
            updateWallet.wallet = address;
            setAuth(updateWallet);
          }
        })
    });
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

  const dropdownDefault = application.minted === undefined ? 'default' : `${ application.minted }`;

  const completeInfo = (data && data.user && data.application && data.application.description && data.user.artistName && data.user.birthYear && (data.application.minted !== undefined)) ? true : false;
  const status = completeInfo ? 'Pending' : 'Need Additional Info';
  console.log(data)
  console.log('STATUS', completeInfo, status);

  return (
    <div className='content-block'>
      { logout && <Redirect to='/' /> }
      <div className='text-l flex'>
        Sevens Account
        <div className='flex-full' />
        <div className='text-s flex'>
          <div className='flex-full' />
          <span className='text-grey pointer' onClick={ logMeOut }>Logout</span>
        </div>
      </div>
      <div className='margin-top'>
        <div className='page-container'>
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
          { (!editingAccount && data && data.user) &&
            <div>
              <div className='text-s'><strong>Username</strong></div>
              <div className='text-s'>{ data.user.username }</div>
              <div className='text-s margin-top-s'><strong>Email</strong></div>
              <div className='text-s'>{ data.user.email }</div>
              <div className='text-s margin-top-s'><strong>Name</strong></div>
              <div className='text-s'>{ data.user.first } { data.user.last }</div>
              { data.user.country && 
                <div className='text-s margin-top-s'>
                  <div><strong>Country</strong></div>
                  <div>{ data.user.country }</div>
                </div>
              }
              { data.user.birthYear &&
                <div className='text-s margin-top-s'>
                  <div><strong>Birth Year</strong></div>
                  <div>{ data.user.birthYear }</div>
                </div>
              }
              <div className='text-s margin-top-s'><strong>Verified Wallet Address</strong></div>
              <div className='text-s'>{ verifiedWallet || 'No Wallet Verified' }</div>
              <div className='text-s margin-top-s'><strong>Connected Wallet Address</strong></div>
              <div className='text-s'>
                { address || 'No Wallet Connected' } 
                { (address && !verifiedWallet && verifiedAddress !== address) && <span className='text-s text-grey pointer' onClick={ verifyWallet }>&nbsp;Verify</span> }</div>
            </div>
          }
          { (!editingAccount && data && data.application) &&
            <div>
              <div className='text-m margin-top'>Application Submission</div>
              <div className='text-s'>Status: { status }</div>
              { data.application.minted === undefined && <div className='select-dropdown margin-top-minus'>
                <div className='text-s margin-top'>Have you minted and sold an NFT before?</div>
                  <select name='Mint' defaultValue={ dropdownDefault } value={ dropdownDefault } required onChange={e => setApplication({ ...application, minted: e.target.value })}>
                    <option value='default' disabled hidden>
                      Select an option
                    </option>
                    <option value='false'>No</option>
                    <option value='true'>Yes</option>
                  </select>
                </div>
              }
              { !data.user.artistName &&
                <div className='form__group field'>
                  <input type='text' className='form__field' placeholder='Name' name='name' id='name' value={ application.name } maxLength='100' onChange={e => setApplication({ ...application, name: e.target.value })} />
                  <label className='form__label'>Artist Name</label>
                </div>
              }
              { !data.user.birthYear &&
                <div className='form__group field'>
                  <input type='text' className='form__field' placeholder='Name' name='name' id='name' value={ application.birthYear } maxLength='4' onChange={e => setApplication({ ...application, birthYear: e.target.value })} />
                  <label className='form__label'>Birth Year</label>
                </div>
              }
              <div className='form__group field'>
                <textarea type='text' className='form__field intent-field' placeholder='Email' name='email' id='name' value={ application.description } maxLength='1000' onChange={e => setApplication({ ...application, description: e.target.value })} />
                <label className='form__label'>Artwork Description</label>
              </div>
              <div className='text-s margin-top-s'><strong>Artwork Submission</strong></div>
              { data.application.art &&
                <div>
                  { (data.application.art && data.application.art.slice(-3) === 'mp4') ?
                  <video className='gallery-art' controls webkit-playsinline='true' playsInline muted loop>
                    <source src={ `https://cdn.grants.art/${ data.application.art }` }
                            type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                  :
                    <img className='gallery-art' src={ `https://cdn.grants.art/${ data.application.art }` } />
                  }
                </div>
              }
              { data.application.thumbnail &&
                <div>
                  <div className='text-s margin-top-s'><strong>Artwork Thumbnail</strong></div>
                  <img className='gallery-art' src={ `https://cdn.grants.art/${ data.application.thumbnail }` } />
                </div>
              }
              { err &&
                <div className='margin-top-s text-s text-err'>
                  { err }
                </div>
              }
              { (submitted && !submitting) &&
                <div className='margin-top-s text-s text-rainbow'>
                  Your application has been updated!
                </div>
              }
              { !submitting && <div><input type='submit' value='Update Application' className='submit-button' onClick={ submit } /></div> }
              { submitting &&
                <div className='margin-top-s text-s text-grey'>
                  Your application is being updated..
                </div>
              }

            </div>
          }
          <br />
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
