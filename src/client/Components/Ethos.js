import React, { useEffect } from 'react';
import { StoreComponent, store } from '../redux';

import '../styles.css';

export default function Ethos() {
  return (
    <div className='content-block'>
      <div className='text-m text-b'>
        Ethos
      </div>
      <div className='text-s text-desc'>
        Origins, motivations, and vision
      </div>
      <div className='gallery-container margin-top'>
        Love.
      </div>
    </div>
  );
}