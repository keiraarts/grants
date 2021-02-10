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
          Founded by <a className='text-gradient pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>illestrater</a><br />
          Curated by Genesis Grant Committee
        </div>
        <span className='flex-full' />
        <div className='text-s'>
          Contact Us<br />
          
        </div>
      </div>
    </div>
  );
}