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
        Testimonies
      </div>
      <div className='text-s margin-top-s'>
        Artist lives are changing drastically through NFTs
      </div>
      <div className='page-container'>
        <div className='text-s margin-top'>
          "The NFT space has changed my life. I feel like an artist with a clear mission. I am inspired and honoured to be in this space.
          But most of all I am grateful for this initiative of change. We, as artists can help shape the future of this community and support upcoming creatives with
          knowledge and support resulting in more inclusivity and talent in the NFT world"
          -  <span className='text-s text-grey pointer' onClick={ () => openLink('https://twitter.com/billelis') }>Billelis</span>
        </div>
        <div className='text-s margin-top'>
          "I would never have imagined connecting with people who I consider legends. Now I have the opportunity to
          be part of a community of the most creative and forward thinking individuals in the world, and it drives me to do something great for others."
          -  <span className='text-s text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>illestrater</span>
        </div>
        <div className='text-s margin-top'>
          "---------------------"
          -  <span className='text-s text-grey pointer' onClick={ () => openLink('') }>Artist</span>
        </div>
      </div>
    </div>
  );
}