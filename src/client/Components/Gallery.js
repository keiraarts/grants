import React, { useState, useEffect } from 'react';
import { usePromise } from 'promise-hook';
import '@appnest/masonry-layout';

import { apiUrl } from '../baseUrl';

import '../styles.scss';
import FounderGallery from '../FounderGallery.json';
import GalleryBlock from './GalleryBlock';

export default function Gallery() {
  const { isLoading, data } = usePromise(() => getGalleryData(), {
    resolve: true,
    resolveCondition: []
  });

  const showData = FounderGallery ? FounderGallery : null;
  // console.log(showData);

  const resize = () => {
    setResizer(true);
  }

  const [listener, setListener] = useState(false);
  useEffect(() => {
    if (!listener) {
      window.addEventListener('resize', resize);
      setListener(true);
    }
  }, [listener]);

  const [resizing, setResizer] = useState(false);

  let initCols;
  if (window.innerWidth <= 450) initCols = '1';
  else if (window.innerWidth > 450 && window.innerWidth <= 700) initCols = '2';
  else if (window.innerWidth > 700 && window.innerWidth <= 1000) initCols = '3'
  else initCols = '4';

  const [cols, setCols] = useState(initCols);
  useEffect(() => {
    if (resizing) {
      if (window.innerWidth <= 450) setCols('1');
      else if (window.innerWidth > 450 && window.innerWidth <= 700) setCols('2');
      else if (window.innerWidth > 700 && window.innerWidth <= 1000) setCols('3')
      else setCols('4');
      setResizer(false);
    }
  }, [resizing]);

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Gallery
      </div>
      <div className='text-s margin-top-s text-desc'>
        Genesis Grants curates, educates, and funds artists' first true digital signature to ease and bridge the gap
        between traditional publishing and NFTs, the future of our creativity
      </div>
      <div className='text-s margin-top-s text-desc'>
        Once the first grant recipients have been finalized, this gallery will update with their respective artwork.
        Below is currently a placeholder collection of some of the founder's favorite NFTs
      </div>
      <div className='cols'>
        { isLoading ?
          <div className='gallery-container margin-top'>
            <div className='margin-top-l'>
              <div className="loading"><div></div><div></div></div>
            </div>
          </div>
          :
          <div className='margin-top'>
            <masonry-layout cols={ cols } >
              {
                showData && showData.map((item, index)=>{
                  return (
                    <GalleryBlock item={ item } key={ index } />
                  );
                })
              }
            </masonry-layout>
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