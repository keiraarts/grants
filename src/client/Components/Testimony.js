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
          "I would never have imagined connecting with people who I consider legends. Now I have the opportunity to
          be part of a community of the most creative and forward thinking individuals in the world, and it drives me to put out something great for the world."
          -  <span className='text-s text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>illestrater</span>
        </div>
        <div className='text-s margin-top'>
          "---------------------"
          -  <span className='text-s text-grey pointer' onClick={ () => openLink('') }>Artist</span>
        </div>
        <div className='text-s margin-top'>
          "---------------------"
          -  <span className='text-s text-grey pointer' onClick={ () => openLink('') }>Artist</span>
        </div>
      </div>
    </div>
  );
}