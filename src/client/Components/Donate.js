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
        Donors
      </div>
      <div className='text-s margin-top-s'>
        We are endlessly grateful for all of our donors
      </div>
      <div className='text-s margin-top text-desc'>
        Sevens Genesis Grant is a non-profit organization committed to helping artists.
        Our donation address is genesisgrants.eth currently managed by the founder. We intend to transition this to a multi-sig or DAO. 
      </div>
      <div className='page-container'>
        <div className='text-m margin-top'>Grant Donors</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>Tim Kang</span>
        <div className='text-s'>Gold Donor</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/etyoung') }>Eric Young</span>
        <div className='text-s'>Silver Donor</div>
      </div>
    </div>
  );
}