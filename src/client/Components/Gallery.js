import React, { useState, useEffect } from 'react';
import { usePromise } from 'promise-hook';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import '@appnest/masonry-layout';

import { apiUrl } from '../baseUrl';

import '../styles.scss';
import FounderGallery from '../FounderGallery.json';
import GalleryBlock from './GalleryBlock';

const contractAddress = '0xc0b4777897a2a373da8cb1730135062e77b7baec';

export default function Gallery() {
  const auth = useStoreState(state => state.user.auth);

  // const { isLoading, data } = usePromise(() => getGalleryData(), {
  //   resolve: true,
  //   resolveCondition: []
  // });

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://api.opensea.io/api/v1/assets?asset_contract_address=${ contractAddress }`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then(json => setData(json));
  }, [])

  // const showData = FounderGallery ? FounderGallery : null;

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
  if (window.innerWidth <= 700) initCols = '1';
  else if (window.innerWidth > 700 && window.innerWidth <= 1200) initCols = '2';
  else initCols = '3'
  // else if (window.innerWidth > 700 && window.innerWidth <= 1000) initCols = '3'

  const [cols, setCols] = useState(initCols);
  useEffect(() => {
    if (resizing) {
      if (window.innerWidth <= 700) setCols('1');
      else if (window.innerWidth > 700 && window.innerWidth <= 1200) setCols('2');
      else setCols('3')
      // else if (window.innerWidth > 700 && window.innerWidth <= 1000) setCols('3')
      setResizer(false);
    }
  }, [resizing]);

  console.log('data', data);

  return (
    <div className='content-block'>
      <div className='text-l flex'>
        Sevens Genesis Grant
        <div className='flex-full' />
        { auth.committee && <div className='text-s flex'>
          <div className='flex-full' />
            <Link to='/curation' className='text-grey pointer'>Committee Curation</Link>
          </div>
        }
      </div>
      <div className='text-s margin-top-s text-desc'>
        Curating, educating, and funding artists' first step into creative self-sovereignty
      </div>
      <div className='cols'>
        { !data ?
          <div className='gallery-container margin-top'>
            <div className='margin-top-l'>
              <div className="loading"><div></div><div></div></div>
            </div>
          </div>
          :
          <div className='margin-top'>
            <masonry-layout cols={ cols } >
              {
                (data && data.assets) && data.assets.map((item, index)=>{
                  return (
                    <GalleryBlock item={ item } key={ index } index={ index } />
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
  return fetch(`${ apiUrl() }/galleryData`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}