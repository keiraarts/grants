import React, { useEffect } from 'react';
import { StoreComponent, store } from '../redux';
import { Link, useLocation } from "react-router-dom";
import { useStoreState } from 'easy-peasy';

import '../styles.scss';
import Logo from '../assets/logo.png';

export default function Header() {
  const auth = useStoreState(state => state.user.auth);

  function openLink(page)
  {
    let win;
    if (page === 'twitter') {
      win = window.open('https://twitter.com/genesisgrants', '_blank');
    } else if (page === 'instagram') {
      win = window.open('https://instagram.com/genesisgrants', '_blank');
    }

    win.focus();
  }

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
          <Link to='/ethos' className= { `header-margin remove-a ${ location.pathname === '/ethos' && 'header-selected' }` }>
            Ethos
          </Link>
          <Link to='/nft' className={ `header-margin remove-a ${ location.pathname === '/nft' && 'header-selected' }` }>
            FAQ
          </Link>
          <Link to='/resources' className={ `header-margin remove-a ${ location.pathname === '/resources' && 'header-selected' }` }>
            Resources
          </Link>
          <Link to='/testimony' className={ `header-margin remove-a ${ location.pathname === '/testimony' && 'header-selected' }` }>
            Testimonies
          </Link>
          <Link to='/program' className={ `header-margin remove-a ${ (location.pathname === '/program' || location.pathname === '/apply') && 'header-selected' }` }>
            Apply
          </Link>
        </div>
        <div className='flex-full' />
        { (auth && auth.username) &&
        <div className='text-s flex'>
          <div className='flex-full' />
          Logged in as&nbsp;<span className='text-grey pointer'>{ auth.username }</span>
        </div> }
      </div>
    </div>
  );
}