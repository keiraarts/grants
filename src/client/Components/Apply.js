import React, { useState, useEffect } from 'react';
import { apiUrl } from '../baseUrl';

import '../styles.css';

export default function Application() {
  return (
    <div className='content-block'>
      <div className='text-m text-b'>
        Artist Application
      </div>
      <div className='text-s text-desc'>
        As your first NFT mint, submit a work of art that you believe is powerful and true to yourself
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