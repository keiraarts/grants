import React, { useEffect } from 'react';
import { StoreComponent, store } from '../redux';

import '../styles.css';

export default function FAQ() {
  return (
    <div className='content-block'>
      <div className='text-m text-b'>
        NFT Frequently Asked Questions
      </div>
      <div className='text-s text-desc'>
        What exactly is an NFT?
      </div>
      <div className='gallery-container margin-top'>
        An NFT, or a Non-Fungible Token, represents a single asset of ownership.
      </div>
    </div>
  );
}