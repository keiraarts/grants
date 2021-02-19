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
        Resources
      </div>
      <div className='text-s margin-top-s'>
        Learn more about NFTs
      </div>
      <div className='page-container text-m'>
        <a className='text-grey pointer margin-top' onClick={ () => openLink('https://www.youtube.com/watch?v=a8ww4aNlPQU') }>Mankind's "What is an NFT?"</a><br />
        <Link to='/tutorial' className='text-grey remove-a margin-top'>Setting up a wallet</Link><br />
        <Link to='/opensea' className='text-grey remove-a margin-top'>Minting on OpenSea</Link><br />
        <Link to='/rarible' className='text-grey remove-a margin-top'>Minting on Rarible</Link><br />
        <br />
      </div>
    </div>
  );
}