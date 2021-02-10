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
        Form
      </div>
    </div>
  );
}