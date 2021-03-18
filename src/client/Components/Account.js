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
  const [artEdit, setArtEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState({});
  const [err, setErr] = useState(false);
  const submit = e => {
    e.preventDefault();
    if (application.minted === undefined || !application.name || !application.birthYear || !application.description || !application.title) setErr('Please complete all fields to update your application!');
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
      .then(json => { setSubmitUser(false); setEditingAccount(false); })
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

      if ((type === 'newArt' && file.size < 120000000) || (type === 'newThumbnail' && file.size < 32000000)) {
        if (responsetype) {
          if (type === 'newArt') setApplication({ ...application, newArt: reader.result })
          if (type === 'newThumbnail') setApplication({ ...application, newThumbnail: reader.result })
        } else {
          setErr('File type unsupported');
        }
      } else {
        setErr('File size too large');
      }
    }
  };

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

  const [acceptErr, setAcceptErr] = useState(false);
  const [acceptSubmit, setAcceptSubmit] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const acceptMint = e => {
    e.preventDefault();
    if (!application.title) setAcceptErr('Please give your artwork a title!');
    else {
      setAcceptErr(false);
      setAcceptSubmit(true);
      fetch(`${ apiUrl() }/acceptGenesis`, {
        method: 'POST',
        body: JSON.stringify(application),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })
        .then(res => res.json())
        .then(json => {
          setAcceptSubmit(false);
          setAccepted(true);
          setApplication({ ...application, userAccepted: true })
        })
    }
  }

  
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

  const dropdownDefault = application.minted === undefined ? 'default' : `${ application.minted }`;

  const completeInfo = (data && user && application && user.username && application.name && application.description && user.artistName && user.birthYear && (application.minted !== undefined)) ? true : false;
  let status = completeInfo ? 'Awaiting Results' : 'Need Additional Info';
  if (application && application.accepted === true && completeInfo && verifiedWallet) status = 'Accepted';
  if (application && application.accepted === false && completeInfo && verifiedWallet) status = 'Declined';
  if (!verifiedWallet) status = `${ status } || Need Verified Wallet`;

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
                <input type='text' className='form__field' placeholder='Username' name='username' id='username' required maxLength='100' value={ user.username } onChange={e => setUser({ ...user, username: e.target.value })} />
                <label className='form__label'>Username</label>
              </div>
              <div className='form__group field'>
                <input type='email' disabled={ user.emailVerified } className='form__field' placeholder='Email' name='email' id='email' required maxLength='100' value={ user.email } onChange={e => setUser({ ...user, email: e.target.value })} />
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
                <label className='form__label'>Twitter @Handle</label>
              </div>
              <div className='form__group field'>
                <input type='text' className='form__field' placeholder='Instagram' name='instagram' id='instagram' maxLength='100' value={ user.instagram } onChange={e => setUser({ ...user, instagram: e.target.value })} />
                <label className='form__label'>Instagram @Handle*</label>
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
            </form>
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
              { (user.first || user.last) &&
                <div>
                  <div className='text-s margin-top-s'><strong>Name</strong></div>
                  <div className='text-s'>{ user.first } { user.last }</div>
                </div>
              }
              { (user.artistName) &&
                <div>
                  <div className='text-s margin-top-s'><strong>Artist Name</strong></div>
                  <div className='text-s'>{ user.artistName }</div>
                </div>
              }
              { user.country && 
                <div className='text-s margin-top-s'>
                  <div><strong>Country</strong></div>
                  <div>{ user.country }</div>
                </div>
              }
              { user.birthYear &&
                <div className='text-s margin-top-s'>
                  <div><strong>Birth Year</strong></div>
                  <div>{ user.birthYear }</div>
                </div>
              }
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
              { !address && <Link to='/tutorial' className='text-s text-grey pointer'>Setup a wallet</Link> }
              { !editingAccount && <div><input type='submit' value='Edit Account' className='submit-button' onClick={ () => setEditingAccount(true) } /></div> }
            </div>
          }
          { (data && user && application && application.name) &&
            <div>
              <div className='text-m margin-top'>Application Submission</div>
              <div className='text-s'>Status: { status }</div>
              { data.application.minted === undefined &&
                <div>
                  <div className='text-s margin-top form__title'>Have you sold an NFT before?</div>
                  <div className='select-dropdown margin-top-minus'>
                    <select name='Mint' className='text-black' defaultValue={ dropdownDefault } value={ dropdownDefault } required onChange={e => setApplication({ ...application, minted: e.target.value })}>
                      <option value='default' disabled hidden>
                        Select an option
                      </option>
                      <option value='false'>No</option>
                      <option value='true'>Yes</option>
                    </select>
                  </div>
                </div>
              }
              { !user.artistName &&
                <div className='form__group field'>
                  <input type='text' className='form__field' placeholder='Name' name='name' id='name' value={ application.name } maxLength='100' onChange={e => setApplication({ ...application, name: e.target.value })} />
                  <label className='form__label'>Artist Name</label>
                </div>
              }
              { !user.birthYear &&
                <div className='form__group field'>
                  <input type='text' className='form__field' placeholder='Name' name='name' id='name' value={ application.birthYear } maxLength='4' onChange={e => setApplication({ ...application, birthYear: e.target.value })} />
                  <label className='form__label'>Birth Year</label>
                </div>
              }
              { (application && (!completeInfo || !verifiedWallet || (application.accepted !== true && application.accepted !== false))) &&
                <div>
                  <div className='form__group field'>
                    <input type='text' className='form__field' placeholder='Name' name='name' id='name' value={ application.title } maxLength='100' onChange={e => setApplication({ ...application, title: e.target.value })} />
                    <label className='form__label'>Artwork Title</label>
                  </div>
                  <div className='form__group field'>
                    <textarea type='text' className='form__field intent-field' placeholder='Email' name='email' id='name' value={ application.description } maxLength='1000' onChange={e => setApplication({ ...application, description: e.target.value })} />
                    <label className='form__label'>Artwork Description</label>
                  </div>
                  <div className='text-s margin-top-s'><strong>Artwork Submission</strong></div>
                  {/* - <span className='text-s text-grey pointer' onClick={ () => setArtEdit(true) }>Edit Submission</span> */}
                  { application.art &&
                    <div>
                      { (application.art && application.art.slice(-3) === 'mp4') ?
                      <video className='gallery-art' controls webkit-playsinline='true' playsInline muted loop>
                        <source src={ `https://cdn.grants.art/${ application.art }` }
                                type="video/mp4" />
                        Sorry, your browser doesn't support embedded videos.
                      </video>
                      :
                        <img className='gallery-art' src={ `https://cdn.grants.art/${ application.art }` } />
                      }
                      {/* { artEdit &&
                        <div className='form__group field'>
                          <label className='file__label'>Art Submission (JPG, PNG, GIF, WEBP, or MP4 - Max 77MB)</label>
                          <input type='file' className='form__field' placeholder='Artwork' name='artwork' id='name' accept='image/jpeg, image/png, image/gif, image/webp, video/mp4' required onChange={ (e) => uploadHandler(e.target, 'newArt') } />
                        </div>
                      } */}
                    </div>
                  }
                  { application.thumbnail &&
                    <div>
                      <div className='text-s margin-top-s'><strong>Artwork Thumbnail</strong></div>
                      <img className='gallery-art' src={ `https://cdn.grants.art/${ application.thumbnail }` } />
                    </div>
                  }
                  {/* { artEdit &&
                    <div className='form__group field'>
                      <label className='file__label'>Thumbnail GIF for MP4* - Square Size Recommended (WEBP, GIF - Max 33MB)</label>
                      <input type='file' className='form__field' placeholder='Artwork' name='artwork' id='name' accept='image/gif, image/webp' onChange={ (e) => uploadHandler(e.target, 'newThumbnail') } />
                    </div>
                  } */}
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
              { (completeInfo && verifiedWallet && application && (application.accepted === true || application.accepted === false)) &&
                <div>
                  <div className='margin-top text-s'>
                    { application.accepted === true ?
                      <div>
                        Congratulations { user.first }, you've been selected as a Sevens Genesis Grantee!
                      </div>
                    :
                      <div>{ user.first }, we regret to say you have not gone through the difficult selection process, but we would like to represent you as a Sevens Genesis Nominee!</div>
                    }
                    <div className='margin-top-s'>
                      Selecting recipients was one of the most difficult things we've done.
                      Our mission is to bring equal opportunity to all, and those who were not selected submitted absolutely amazing artwork as well. It is completely our fault for the lack of preparation,
                      clarity, and unstructured selection process and we promise we did our best to build this all from scratch.<br /><br />
                      As an early adopter of NFTs, we would like to highlight not just grantees but all artists who have participated - thus we would like to mint two exhibitions, one for Sevens Genesis Grantees
                      and one for Sevens Genesis Nominees.<br /><br />
                      If you would like to accept your application process, please complete your artwork details giving it a final title and description. By accepting, you will agree to allow us mint your artwork
                      on your behalf (eventually will transfer to you and discuss how you will sell your piece) and promote
                      your artwork on our social media as well as potentially connecting you with collectors, educators, and galleries globally as we take our journey together into the blooming world of NFTs!<br /><br />
                      <i>By confirming, you honor that you HAVE NOT MINTED / SOLD AN NFT BEFORE. If you have minted but have not sold a piece,
                        you *must* burn your pieces or transfer them to address 0x0000000000000000000000000000000000000000. You must also wait until Sevens minting is complete and then are free to mint on other NFT platforms. Going against our policy will be deemed as unethical. 
                      </i>
                    </div>
                  </div>
                  { acceptErr &&
                    <div className='margin-top-s text-s text-err'>
                      { acceptErr }
                    </div>
                  }
                  { ((accepted && !acceptSubmit) || application.userAccepted === true) &&
                    <div className='margin-top-s text-s text-rainbow'>
                      Your application has been accepted and completed! Please check the website for your minted piece :)
                    </div>
                  }
                  {/* { (!acceptSubmit && !application.userAccepted) && <div><input type='submit' value='Accept Genesis Mint' className='submit-button' onClick={ acceptMint } /></div> } */}
                  { acceptSubmit &&
                    <div className='margin-top-s text-s text-grey'>
                      Your application is being accepted..
                    </div>
                  }
                  <div className='margin-top'>
                    Artwork Details
                  </div>
                  <div className='form__group field'>
                    <input type='text' className='form__field' placeholder='Name' name='name' id='name' value={ application.title } maxLength='100' onChange={e => setApplication({ ...application, title: e.target.value })} />
                    <label className='form__label'>Artwork Title</label>
                  </div>
                  <div className='form__group field'>
                    <textarea type='text' className='form__field intent-field' placeholder='Email' name='email' id='name' value={ application.description } maxLength='1000' onChange={e => setApplication({ ...application, description: e.target.value })} />
                    <label className='form__label'>Artwork Description</label>
                  </div>
                  { err &&
                    <div className='margin-top-s text-s text-err'>
                      { err }
                    </div>
                  }
                  { (submitted && !submitting) &&
                    <div className='margin-top-s text-s text-rainbow'>
                      Your artwork has been updated!
                    </div>
                  }
                  { !submitting && <div><input type='submit' value='Update Artwork' className='submit-button' onClick={ submit } /></div> }
                  { submitting &&
                    <div className='margin-top-s text-s text-grey'>
                      Your artwork is being updated..
                    </div>
                  }
                  <div className='margin-top-l gallery-container full-width'>
                    <div className='gallery-description text-s'>
                      <div className='gallery-plate metal linear'>
                        <div className='text-s'>
                          <strong>{ user.artistName }</strong> (b. { user.birthYear })<br />
                          { user.country }
                        </div>
                        <div className='margin-top-s text-s text-b'>
                          <strong><i>{ application.title || 'Artwork Title' }</i></strong>, 2021<br />
                          Digital Art as NFT
                        </div>
                        <div className='margin-top-s'>
                          { application.description }
                        </div>
                      </div>
                    </div>
                    <div className='flex-full center'>
                      { (application && application.art && application.art.slice(-3) === 'mp4') ?
                        <video controls muted loop webkit-playsinline='true' playsInline className='gallery-art'>
                          <source src={ `https://cdn.grants.art/${ application.art }` }
                                  type="video/mp4" />
                          Sorry, your browser doesn't support embedded videos.
                        </video>
                      :
                        <img src={ `https://cdn.grants.art/${ application.art }` } className='gallery-art'  />
                      }
                    </div>
                  </div>
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
