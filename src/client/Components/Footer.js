import React, { useEffect } from 'react';
import { StoreComponent, store } from '../redux';
import { Link } from "react-router-dom";

import '../styles.scss';
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
          Curated by <Link to='/committee' className='text-grey remove-a'>Genesis Grant Committee</Link><br />
          <br />
          Please consider donating to the grant at genesisart.eth
        </div>
        <span className='flex-full' />
        {/* <div className='text-s'>
          Contact<br />
        </div> */}
      </div>
    </div>
  );
}