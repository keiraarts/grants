import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import '../styles.scss';
import Logo from '../assets/logo.png';

export default function Header() {
  const auth = useStoreState(state => state.user.auth);
  const location = useLocation();

  const path = location.pathname.split('/')[1];
  console.log('YO', path);

  return (
    <div className='header flex'>
      <Link to='/' className='flex remove-a'>
        <img src={ Logo } className='logo' alt='Twitter' />
      </Link>
      <div className='flex-full' />
      <div className='nav-container'>
        <div className='flex-full' />
        <div className='header-nav'>
          <strong>
            <Link to='/ethos' rel='canonical' className= { `header-margin remove-a ${ path === 'ethos' && 'header-selected' }` }>
              Ethos
            </Link>
            <Link to='/nft' rel='canonical' className={ `header-margin remove-a ${ path === 'nft' && 'header-selected' }` }>
              Learn
            </Link>
            <Link to='/committee' rel='canonical' className={ `header-margin remove-a ${ path === 'committee' && 'header-selected' }` }>
              Team
            </Link>
            <Link to='/testimony' rel='canonical' className={ `header-margin remove-a ${ path === 'testimony' && 'header-selected' }` }>
              Testimonies
            </Link>
            <Link to='/program' rel='canonical' className={ `header-margin remove-a ${ (path === 'program' || path === 'apply') && 'header-selected' }` }>
              Apply
            </Link>
          </strong>
        </div>
        <div className='flex-full' />
        { (auth && auth.username) ?
          <div>
            <div className='text-s flex'>
              <div className='flex-full' />
              Logged in as&nbsp;<Link to='/account' className='pointer'><div className='text-grey'>{ auth.username }</div></Link>
            </div>
          </div>
          :
          <div>
            <div className='text-s flex'>
              <div className='flex-full' />
              <Link to='/login' className='pointer'><div className='text-grey'>Log In</div></Link>
            </div>
          </div>
        }
      </div>
    </div>
  );
}