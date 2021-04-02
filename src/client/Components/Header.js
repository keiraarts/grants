import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import '../styles.scss';
import Logo from '../assets/logo.png';

export default function Header() {
  const auth = useStoreState(state => state.user.auth);
  const location = useLocation();

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
            <Link to='/ethos' rel='canonical' className= { `header-margin remove-a ${ location.pathname === '/ethos' && 'header-selected' }` }>
              Ethos
            </Link>
            <Link to='/nft' rel='canonical' className={ `header-margin remove-a ${ location.pathname === '/nft' && 'header-selected' }` }>
              FAQ
            </Link>
            <Link to='/resources' rel='canonical' className={ `header-margin remove-a ${ location.pathname === '/resources' && 'header-selected' }` }>
              Resources
            </Link>
            <Link to='/testimony' rel='canonical' className={ `header-margin remove-a ${ location.pathname === '/testimony' && 'header-selected' }` }>
              Testimonies
            </Link>
            <Link to='/program' rel='canonical' className={ `header-margin remove-a ${ (location.pathname === '/program' || location.pathname === '/apply') && 'header-selected' }` }>
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
              <Link to='/login' className='text-grey pointer'>Log In</Link>
            </div>
          </div>
        }
      </div>
    </div>
  );
}