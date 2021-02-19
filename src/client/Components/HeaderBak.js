import React, { useEffect } from 'react';
import { StoreComponent, store } from '../redux';
import { Link, useLocation } from "react-router-dom";

import '../styles.scss';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';

export default function Header() {
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
    <div>
      <div className='header flex'>
        <Link to='/' className='flex remove-a'>
          Sevens<br />
          Genesis Grant
        </Link>
        <span className='flex-full' />
        <div>
          <div className='social-icons flex'>
            <span className='flex-full' />
            <img src={ Twitter } className='social-icon' alt='Twitter' onClick={ () => openLink('twitter') } />
            <img src={ Instagram } className='social-icon' alt='Instagram' onClick={ () => openLink('instagram') } />
          </div>
          <Link to='/program' className={ `apply-block info-block remove-a ${ location.pathname === '/program' && 'header-selected' }` }>
            <span>Apply</span>
          </Link>
        </div>
      </div>
      <div className='info-block-container'>
        <Link to='/' className={ `info-block margin-left remove-a ${ location.pathname === '/' && 'header-selected' }` }>
          Gallery
        </Link>
        <Link to='/ethos' className= { `info-block remove-a ${ location.pathname === '/ethos' && 'header-selected' }` }>
          Ethos
        </Link>
        <Link to='/nft' className={ `info-block margin-right remove-a ${ location.pathname === '/nft' && 'header-selected' }` }>
          FAQ
        </Link>
      </div>
    </div>
  );
}