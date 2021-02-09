import React, { useEffect } from 'react';
import { usePromise } from 'promise-hook';
import { apiUrl } from '../baseUrl';

import '../styles.css';

export default function Gallery() {
  const { isLoading, data } = usePromise(() => getGalleryData(), {
    resolve: true,
    resolveCondition: []
  });

  console.log(data);

  return (
    <div className='content-block'>
      <div className='text-m text-b'>
        The Gallery
      </div>
      <div className='text-s text-desc'>
        Genesis Grants aim to curate, educate, and fund an artist's first true digital signature to ease and bridge the gap
        between traditional publishing and NFTs, the future of our creativity ❤️
      </div>
      <div className='cols'>
        { isLoading ?
          <div className='gallery-block'>
            <div className='block-art'>
              <div className='block-art-image'>
                ?
              </div>
            </div>
            <div className='block-info text-s'>
              Artwork by Artist
            </div>
          </div>
          :
          <div className='gallery-container margin-top'>
            {
              data && data.map((item, index)=>{
                return (
                  <div className='gallery-block' key={ index }>
                    <div className='block-art'>
                      <img src={ item.image } className='block-art-image' />
                    </div>
                    <div className='block-info text-s'>
                      Artwork by Artist
                    </div>
                  </div>
                );
              })
            }
            {
              data && data.map((item, index)=>{
                return (
                  <div className='gallery-block' key={ index }>
                    <div className='block-art'>
                      <img src={ item.image } className='block-art-image' />
                    </div>
                    <div className='block-info text-s'>
                      Artwork by Artist
                    </div>
                  </div>
                );
              })
            }
            {
              data && data.map((item, index)=>{
                return (
                  <div className='gallery-block' key={ index }>
                    <div className='block-art'>
                      <img src={ item.image } className='block-art-image' />
                    </div>
                    <div className='block-info text-s'>
                      Artwork by Artist
                    </div>
                  </div>
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