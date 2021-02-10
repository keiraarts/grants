import React, { useState, useEffect } from 'react';
import { usePromise } from 'promise-hook';

import { apiUrl } from '../baseUrl';

import '../styles.css';
import GalleryBlock from './GalleryBlock';

export default function Gallery() {
  const { isLoading, data } = usePromise(() => getGalleryData(), {
    resolve: true,
    resolveCondition: []
  });

  const showData = data ? data.slice(0, 10) : null;

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Gallery
      </div>
      <div className='text-s text-desc'>
        Genesis Grants curates, educates, and funds artists' first true digital signature to ease and bridge the gap
        between traditional publishing and NFTs, the future of our creativity - here are our grant recipients
      </div>
      <div className='cols'>
        { isLoading ?
          <div className='gallery-container margin-top'>
            <div className='margin-top-l'>
              <div className="loading"><div></div><div></div></div>
            </div>
          </div>
          :
          <div className='gallery-container margin-top'>
            {
              showData && showData.map((item, index)=>{
                return (
                  <GalleryBlock item={ item } key={ index } />
                );
              })
            }
          </div>
        }
      </div>
    </div>
  );
}

const getGalleryData = () => {
  console.log(process.env);
  return fetch(`${ apiUrl() }/galleryData`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}