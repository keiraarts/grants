import React from 'react';

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
      <div className='text-s margin-top-s'>
        Our shared love of art, music, and design
      </div>
      <div className='page-container margin-top'>
        <span className='text-s text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>Tim Kang (illestrater)</span>
        <div className='text-s'>CEO of CUE Music & paradigm pusher</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/darlington') }>Mike Darlington</span>
        <div className='text-s'>CEO of Monstercat music label & captain NFT gremlin</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://3lau.com/') }>Justin Blau (3LAU)</span>
        <div className='text-s'>Music producer & NFT innovator</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/axieking') }>OhhShiny</span>
        <div className='text-s'>Traditional fine art & NFT collector</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/LordTylerWard') }>Tyler Ward</span>
        <div className='text-s'>Founder of Barn Bridge & DeFi degen</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.youtube.com/c/BrandonKangFilms/videos') }>Brandon Kang</span>
        <div className='text-s'>Professional videographer & NFT collector</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('http://justinmaller.com/') }>Justin Maller</span>
        <div className='text-s'>Creative Director of Deviantart & Depthcore</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.beeple-crap.com/') }>Mike Winkelmann (Beeple)</span>
        <div className='text-s'>Renowned digital art director & professional hair trimmer</div>
        <div className='text-m margin-top'>Artists</div>
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://nessgraphics.com/') }>NessGraphics</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.instagram.com/fvckrender') }>FVCKRENDER</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.instagram.com/fvckrender') }>aeforia</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.instagram.com/fvckrender') }>ThankYouX</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://maalavidaa.com/') }>Maalavidaa</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('http://www.blakekathryn.com/') }>Blake Kathryn</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://slimesunday.com/') }>slimesunday</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.instagram.com/toomuchlag') }>toomuchlag</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.victormosquera.com/') }>Victor Mosquera?</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('') }>smeccea?</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('') }>Billelis?</div>
        <br /><br />
      </div>
    </div>
  );
}