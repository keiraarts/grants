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
      <div className='page-container'>
        <div className='text-s margin-top text-desc'>
          Sevens Foundation is a non-profit organization committed to helping artists.
          Our donation address is <span className='text-s text-rainbow pointer' onClick={ () => openLink('https://etherscan.io/address/foundation.eth') }>foundation.eth</span> and intend to transition this to a decentralized autonomous organization. 
        </div>
        <div className='text-m margin-top'>Grant Donors</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://parishilton.com/') }>Paris Hiton</span>
        <div className='text-s'>Platinum Donor</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://friendswithyou.com/') }>FriendsWithYou</span>
        <div className='text-s'>Gold Donor</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://diplo.com/') }>Diplo</span>
        <div className='text-s'>Gold Donor</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>Tim Kang</span>
        <div className='text-s'>Gold Donor</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/WhaleShark_Pro') }>Whaleshark</span>
        <div className='text-s'>Silver Donor</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/etyoung') }>Eric Young</span>
        <div className='text-s'>Silver Donor</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/ediep') }>Eric Diep</span>
        <div className='text-s'>Silver Donor</div>
        <span className='text-s margin-top-s text-grey pointer' onClick={ () => openLink('https://twitter.com/Weel25067618') }>Weel</span>
        <div className='text-s'>Bronze Donor</div>
        <br />
      </div>
    </div>
  );
}