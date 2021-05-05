import React, { useEffect } from 'react';
import { StoreComponent, store } from '../redux';
import { Link } from "react-router-dom";

import '../styles.scss';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Discord from '../assets/discord.png';
import Email from '../assets/email.png';

export default function Header() {
  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='footer'>
      <div className='center text-s'>
        Curated by <Link to='/team' className='remove-a'><div className='text-grey'>Sevens Foundation Committee</div></Link><br /><br />
        Developed by <a className='text-rainbow pointer' onClick={ () => openLink('https://y.at/%F0%9F%91%89%F0%9F%8E%B1%F0%9F%95%B3') }>illestrater</a><br />
      </div>
      <div className='social-icons margin-top flex center'>
        <img src={ Twitter } className='social-icon' alt='Twitter' onClick={ () => openLink('https://twitter.com/sevensgrant') } />
        <img src={ Instagram } className='social-icon' alt='Instagram' onClick={ () => openLink('https://instagram.com/sevensgrant') } />
        <img src={ Discord } className='social-icon' alt='Instagram' onClick={ () => openLink('https://discord.gg/YB4HDKwxyc') } />
        <a href='mailto:sevens@grants.art'><img src={ Email } className='social-icon' alt='Email' /></a>
      </div>
    </div>
  );
}