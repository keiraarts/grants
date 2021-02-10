import React, { useEffect } from 'react';
import { StoreComponent, store } from '../redux';
import { Link } from "react-router-dom";

import '../styles.css';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';

export default function Header() {
  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div>
      <div className='footer flex'>
        <div className='text-s'>
          Founded by <a className='text-rainbow pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>illestrater</a><br />
          Curated by <a className='text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>Genesis Grant Committee</a><br />
        </div>
        <span className='flex-full' />
        <div className='text-s'>
          Contact<br />
        </div>
      </div>
    </div>
  );
}