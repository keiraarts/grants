import React, { useState, useEffect } from 'react';
import { usePromise } from 'promise-hook';
import { Link, Redirect } from 'react-router-dom';
import CountryList from 'country-list';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { apiUrl } from '../baseUrl';
import { ethers } from 'ethers';

import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';

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
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState({});
  const [err, setErr] = useState(false);
  const [submitUser, setSubmitUser] = useState(false);
  const updateAccount = e => {
    setSubmitUser(true);
    fetch(`${ apiUrl() }/updateUser`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
      .then(res => res.json())
      .then(json => {
        setSubmitUser(false);
        if (json.error) setErr(json.error);
        else {
          const updateUser = auth;
          updateUser.username = user.username;
          setAuth(updateUser);
          setErr(false);
          setEditingAccount(false);
        }
      })
  }

  useEffect(() => {
    if (data && data.user) setUser(data.user)
    if (data && data.application) {
      setApplication({
        ...application,
        ...data.application,
        name: data.user.artistName,
        birthYear: data.user.birthYear,
        title: data.application ? data.application.title : null,
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

  const [sentEmailVerification, setEmailVerification] = useState(null);
  function verifyEmail() {
    fetch(`${ apiUrl() }/sendEmailVerification`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    })
      .then(res => res.json())
      .then(json => {
        setEmailVerification(true);
      })
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
  
  function openLink(page)
  {
    page = page.replace('@', '');
    if (user.twitter.substring(0, 3) === 'www') page = `https://${ page }`
    let win = window.open(page, '_blank');
    win.focus();
  }


  const [logout, setLogout] = useState(false);
  const logMeOut = e => {
    setAuth({});
    setLogout(true);
  }

  return (
    <div className='content-block'>
      { logout && <Redirect to='/' /> }
      <div className='text-l flex'>
        <strong>Sevens Account</strong>
        <div className='flex-full' />
        <div className='text-s flex'>
          <div className='flex-full' />
          <span className='text-grey pointer' onClick={ logMeOut }>Logout</span>
        </div>
      </div>
      <div className='margin-top'>
        <div className='page-container'>
          { editingAccount &&
            <div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Username' name='username' id='username' required maxLength='100' value={ user.username } onChange={e => setUser({ ...user, username: e.target.value })} />
                <label className='form__label'>Username</label>
              </div>
              <div className='form__group field'>
                <input type='email' className='form__field' placeholder='Email' name='email' id='email' required maxLength='100' value={ user.email } onChange={e => setUser({ ...user, email: e.target.value })} />
                <label className='form__label'>Email</label>
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='First Name' name='first' id='first' required maxLength='100' value={ user.first } onChange={e => setUser({ ...user, first: e.target.value })} />
                <label className='form__label'>First Name</label>
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Last Name' name='last' id='last' required maxLength='100' value={ user.last } onChange={e => setUser({ ...user, last: e.target.value })} />
                <label className='form__label'>Last Name</label>
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Last Name' name='last' id='last' required maxLength='100' value={ user.artistName } onChange={e => setUser({ ...user, artistName: e.target.value })} />
                <label className='form__label'>Artist Name</label>
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Name' name='name' id='name' value={ user.birthYear } maxLength='4' onChange={e => setUser({ ...user, birthYear: e.target.value })} />
                <label className='form__label'>Birth Year</label>
              </div>
              <div className='text-s margin-top-s form__title'>Country of Representation</div>
              <div className='select-dropdown margin-top-minus'>
                <select name='Country' className='text-black' defaultValue={ user.country || 'default' } value={ user.country } required onChange={e => setUser({ ...user, country: e.target.value, countryCode: CountryList.getCode(e.target.value) })}>
                  <option value='default' disabled hidden> 
                    Country of Representation
                  </option> 
                  {CountryList.getNames().map((fbb, key) =>
                    <option key={ key } value={ fbb }>{ fbb }</option>
                  )};
                </select>
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='City' name='city' id='city' maxLength='100' value={ user.city } onChange={e => setUser({ ...user, city: e.target.value })} />
                <label className='form__label'>City</label>
              </div>
              <div className='form__group field'>
                <input type='url' className='form__field' placeholder='URL' name='url' id='url' required maxLength='100' value={ user.website } onChange={e => setUser({ ...user, website: e.target.value })} />
                <label className='form__label'>Website / Artwork URL</label>
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Twitter' name='twitter' id='twitter' required maxLength='100' value={ user.twitter } onChange={e => setUser({ ...user, twitter: e.target.value })} />
                <label className='form__label'>Twitter Handle</label>
              </div>
              <div className='text-s'>
                @{ user.twitter }
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Instagram' name='instagram' id='instagram' maxLength='100' value={ user.instagram } onChange={e => setUser({ ...user, instagram: e.target.value })} />
                <label className='form__label'>Instagram Handle</label>
              </div>
              <div className='text-s'>
                @{ user.instagram }
              </div>
              <div className='text-s margin-top-s'>
                <em>All fields are required in order to submit artwork on Sevens</em>
              </div>
              { err &&
                <div className='margin-top-s text-s text-err'>
                  { err }
                </div>
              }
              { submitUser ?
                <div className='margin-top-s text-s text-grey'>
                  Your profile is updating..
                </div>
                :
                <div>
                  <input type='submit' value='Update Account' className='submit-button' onClick={ updateAccount } />&nbsp;
                  <input type='submit' value='Cancel' className='submit-button' onClick={ () => setEditingAccount(false) } />
                </div>
              }
            </div>
          }
          { isLoading &&
            <div className='center flex'>
              <div className='margin-top center'>
                <div className="loading"><div></div><div></div></div>
              </div>
            </div>
          }
          { (!editingAccount && data && user) &&
            <div>
              <div className='text-s'><strong>Username</strong></div>
              <div className='text-s'>{ user.username }</div>
              <div className='text-s margin-top-s'><strong>Email{ !user.emailVerified && ' - Unverified' }</strong></div>
              <div className='text-s'>
                { user.email }
                { (!user.emailVerified && !sentEmailVerification) && <span className='text-s text-grey pointer' onClick={ verifyEmail }>&nbsp;Send Verification Email</span> }
                { sentEmailVerification && <span>&nbsp; - Verification Email Sent</span> }
              </div>
              <div>
                <div className='text-s margin-top-s'><strong>Name</strong></div>
                <div className='text-s'>{ user.first } { user.last }</div>
              </div>
              <div>
                <div className='text-s margin-top-s'><strong>Artist Name</strong></div>
                <div className='text-s'>{ user.artistName || '--' }</div>
              </div>
              <div className='text-s margin-top-s'>
                <div><strong>Country</strong></div>
                <div>{ user.country || '--' }</div>
              </div>
              <div className='text-s margin-top-s'>
                <div><strong>City</strong></div>
                <div>{ user.city || '--' }</div>
              </div>
              <div className='text-s margin-top-s'>
                <div><strong>Birth Year</strong></div>
                  <div>{ user.birthYear || '--' }</div>
              </div>
              <div className='text-s margin-top-s'>
                <div><strong>Website / Artwork URL</strong></div>
                  <div>{ user.website || '--' }</div>
              </div>
              <div className='margin-top-s flex'>
                <div className='flex'>
                  { user.website && <div><img src={ Web } className='account-social-web pointer' alt='Website' onClick={ () => openLink(user.website) } /></div> }
                  { user.twitter && <div><img src={ Twitter } className='account-social pointer' alt='Twitter' onClick={ () => openLink(user.twitter.substring(0, 4) === 'http' || user.twitter.substring(0, 3) === 'www' ? user.twitter : `https://twitter.com/${ user.twitter }`) } /></div> }
                  { user.instagram && <div><img src={ Instagram } className='account-social pointer' alt='Instagram' onClick={ () => openLink(user.instagram.substring(0, 4) === 'http' || user.instagram.substring(0, 3) === 'www' ? user.instagram : `https://instagram.com/${ user.instagram }`) } /></div> }
                </div>
                <div className='flex-full' />
              </div>
              <div className='text-s margin-top-s'><strong>Verified Wallet Address</strong></div>
              <div className='text-s'>{ verifiedWallet || 'No Wallet Verified' }</div>
              <div className='text-s margin-top-s'><strong>Connected Wallet Address</strong></div>
              <div className='text-s'>
                { address || 'No Wallet Connected' } 
                { (address && auth && auth.wallet !== address) && <span className='text-s text-grey pointer' onClick={ verifyWallet }>&nbsp;Verify</span> }
              </div>
              { (!verifiedWallet) && <Link to='/tutorial' className='text-s text-grey pointer'>Setup a wallet</Link> }
              { !editingAccount && <div><input type='submit' value='Edit Account' className='submit-button' onClick={ () => setEditingAccount(true) } /></div> }
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
