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
        <div className='text-m'>Advisors</div>
        <span className='text-s text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>Tim Kang (illestrater)</span>
        <div className='text-s'>CEO of CUE Music & paradigm pusher</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/darlington') }>Mike Darlington</span>
        <div className='text-s'>CEO of Monstercat music label & captain NFT gremlin</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.instagram.com/yesladypheonix/') }>Lady PheOnix</span>
        <div className='text-s'>Co-Founder of Universe Contemporary & leading crypto art evangelist</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://3lau.com/') }>Justin Blau (3LAU)</span>
        <div className='text-s'>Music producer & NFT innovator</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/axieking') }>OhhShiny</span>
        <div className='text-s'>Traditional fine art & NFT collector</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/pablorfraile') }>Pablo</span>
        <div className='text-s'>Co-Founder of Museum of Crypto Art & NFT collector</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/LordTylerWard') }>Tyler Ward</span>
        <div className='text-s'>Founder of Barn Bridge & DeFi degen</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.youtube.com/c/BrandonKangFilms/videos') }>Brandon Kang</span>
        <div className='text-s'>Professional videographer & NFT collector</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('http://justinmaller.com/') }>Justin Maller</span>
        <div className='text-s'>Digital Artist & CCO of Deviantart</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.beeple-crap.com/') }>Mike Winkelmann (beeple)</span>
        <div className='text-s'>Renowned digital art director & professional hair trimmer</div>
        <div className='text-m margin-top'>Artists</div>
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://nessgraphics.com/') }>NessGraphics</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.instagram.com/fvckrender') }>FVCKRENDER</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://aeforiadesign.com/') }>aeforia</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://thankyoux.com/') }>ThankYouX</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://maalavidaa.com/') }>Maalavidaa</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('http://www.blakekathryn.com/') }>Blake Kathryn</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://slimesunday.com/') }>slimesunday</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.instagram.com/toomuchlag') }>toomuchlag</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.victormosquera.com/') }>Victor Mosquera</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://smeccea.com/') }>smeccea</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.billelis.com/') }>Billelis</div>
        <br />
        <div className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://www.behance.net/Filiphds') }>Filip Hodas</div>
        <br /><br />
        <div className='text-m text-b'>
          Endorsements
        </div>
        <div className='text-s margin-top'>
          <i>If you are an existing NFT artist, please <a href='mailto:tim@grants.art' className='text-s text-grey pointer'>email</a> or DM us on social media to be listed here!</i>
        </div>
        <br />
      </div>
    </div>
  );
}