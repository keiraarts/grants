import React, { useState } from 'react';
import { usePromise } from 'promise-hook';
import { Redirect } from "react-router-dom";
import { apiUrl } from '../baseUrl';
import { useStoreActions } from 'easy-peasy';

import '../styles.scss';

export default function Register() {
  const setAuth = useStoreActions(dispatch => dispatch.user.setAuth);

  const { isLoading, request, data } = usePromise(login);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    submitting: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState(false);
  const submit = e => {
    console.log('LOGGING IN', loginData);
    e.preventDefault();
    setErr(false);
    setSubmitting(true);
    request(loginData);
  }

  if (data) setAuth(data);

  return (
    <div className='content-block'>
      { data && <Redirect to='/' /> }
      <div className='text-l text-b'>
        User Login
      </div>
      <div className='margin-top'>
        <form onSubmit={ submit }>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Username' name='username' id='username' required maxLength='100' onChange={e => setLoginData({ ...loginData, username: e.target.value })} />
            <label className='form__label'>Username or Email</label>
          </div>
          <div className='form__group field'>
            <input type='password' className='form__field' placeholder='Password' name='password' id='password' maxLength='100' required onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
            <label className='form__label'>Password</label>
          </div>
          { err &&
            <div className='margin-top-s text-s text-err'>
              { err }
            </div>
          }
          { ((submitting && !submitted) || data) ?
            <div className='margin-top-s text-s text-grey'>
              Logging in..
            </div>
            :
            <input type='submit' value='Log In' className='submit-button' />
          }
        </form>
        <br />
      </div>
    </div>
  );
}

const login = (data) => {
  return fetch(`${ apiUrl() }/loginUser`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
}