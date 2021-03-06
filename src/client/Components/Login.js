import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { apiUrl } from '../baseUrl';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

import '../styles.scss';

export default function Register() {
  const setAuth = useStoreActions(dispatch => dispatch.user.setAuth);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    submitting: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState(false);
  const [logged, setLogged] = useState(false);
  const submit = e => {
    e.preventDefault();
    setErr(false);
    setSubmitting(true);
    fetch(`${ apiUrl() }/loginUser`, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.username) {
        setAuth(data);
        setLogged(true);
      } else {
        setSubmitting(false);
        setErr('Your login credentials were incorrect');
      }
    })
  }

  return (
    <div className='content-block'>
      { logged && <Redirect to='/' /> }
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
          { ((submitting && !submitted) && !logged) ?
            <div className='margin-top-s text-s text-grey'>
              Logging in..
            </div>
            :
            <div>
              <input type='submit' value='Log In' className='submit-button' />
              &nbsp;&nbsp;or <Link to='/register' className='text-grey pointer'>Register an Account</Link>
            </div>
          }
        </form>
        <br />
      </div>
    </div>
  );
}

const login = (data) => {

}