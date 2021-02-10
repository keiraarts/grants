import React, { useEffect } from 'react';

import '../styles.css';

export default function FAQ() {
  return (
    <div className='content-block'>
      <div className='text-m text-b'>
        NFT Frequently Asked Questions
      </div>
      <div className='text-s text-desc'>
        There's a new future for art?
      </div>
      <div className='page-container margin-top'>
        <div className='text-m'>
          What is an NFT?
        </div>
        <div className='text-s'>
          An NFT, or a Non-Fungible Token, represents a single asset of ownership.
        </div>
        <div className='text-m margin-top-s'>
          Who owns these?
        </div>
        <div className='text-s'>
          There is a single owner that cannot be controlled by anyone else.
        </div>
      </div>
    </div>
  );
}