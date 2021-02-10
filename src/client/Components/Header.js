import React, { useEffect } from 'react';
import { StoreComponent, store } from '../redux';
import { Link } from "react-router-dom";

import '../styles.css';
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

  return (
    <div>
      <div className='header flex'>
        <Link to='/' className='flex remove-a'>
          The Sevens<br />
          Genesis Grant
        </Link>
        <span className='flex-full' />
        <div className='apply-block-container'>
          <div className='social-icons flex'>
            <span className='flex-full' />
            <img src={ Twitter } className='social-icon' alt='Twitter' onClick={ () => openLink('twitter') } />
            <img src={ Instagram } className='social-icon' alt='Instagram' onClick={ () => openLink('instagram') } />
          </div>
          <Link to='/apply' className='apply-block info-block remove-a'>
            Apply<br />
          </Link>
        </div>
      </div>
      <div className='info-block-container'>
        <Link to='/' className='info-block margin-left remove-a'>
          Gallery
        </Link>
        <Link to='/nft' className='info-block remove-a'>
          NFT FAQ
        </Link>
        <Link to='/ethos' className='info-block margin-right remove-a'>
          Ethos
        </Link>
      </div>
    </div>
  );
}