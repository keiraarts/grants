import React from 'react';
import { Link } from "react-router-dom";

import '../styles.scss';

export default function Committee() {
  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Committee
      </div>
      <div className='text-s margin-top-s text-desc'>
        Our shared love of art, music, and design
      </div>
      <div className='page-container margin-top'>
        <div className='text-m'>Committee Members (Tentative)</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>Tim Kang (illestrater)</span>
        <div className='text-s'>CEO of CUE Music & paradigm pusher</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/darlington') }>Mike Darlington</span>
        <div className='text-s'>CEO of Monstercat music label & captain NFT gremlin</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://nessgraphics.com/') }>Alex Ness (NessGraphics)</span>
        <div className='text-s'>3D Artist & concert visual aficionado</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://3lau.com/') }>Justin Blau (3LAU)</span>
        <div className='text-s'>Music producer & NFT innovator</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('http://justinmaller.com/') }>Justin Maller</span>
        <div className='text-s'>Creative Director of Deviantart & Depthcore</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/axieking') }>OhhShiny</span>
        <div className='text-s'>Traditional fine art & NFT collector</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.beeple-crap.com/') }>Mike Winkelmann (Beeple)?</span>
        <div className='text-s'>Renowned digital art director & professional hair trimmer</div>
        <div className='text-m margin-top'>Grant Donors</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>Tim Kang</span>
        <div className='text-s'>Silver Donor</div>
        <div className='text-m margin-top'>Art Donors</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('') }>???</span>
        <div className='text-s'></div>
      </div>
    </div>
  );
}