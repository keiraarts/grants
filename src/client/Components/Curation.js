import React, { useEffect, useState, useRef } from 'react';
import { usePromise } from 'promise-hook';
import { apiUrl } from '../baseUrl';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import CurationBlock from './CurationBlock';

import '../styles.scss';

export default function Curation() {
   const { isLoading, data } = usePromise(() => getGalleryData(), {
    resolve: true,
    resolveCondition: []
  });

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
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    if (resizing) {
      if (window.innerWidth <= 450) setCols('1');
      else if (window.innerWidth > 450 && window.innerWidth <= 700) setCols('2');
      else if (window.innerWidth > 700 && window.innerWidth <= 1000) setCols('3')
      else setCols('4');
      setResizer(false);
      setWindowHeight(window.innerHeight);
    }
  }, [resizing]);
  
  
  const [showData, setShowData] = useState([]);
  const contentRef = useRef(null);
  useEffect(() => {
    if (data && data.length) setShowData(data.slice(0, 30));
  }, [data])

  const [loading, setLoading] = useState(false);
  useScrollPosition(({ currPos }) => {
    if (((-1 * currPos.y) + 1500 > contentRef.current.offsetHeight) && !loading) {
      setShowData(data.slice(0, showData.length + 30))
    }
  }, [showData]);

  console.log(data);

  return (
    <div className='content-block' ref={ contentRef }>
      <div className='text-l text-b'>
        Committee Curation
      </div>
      <div className='text-s margin-top-s'>
        Let's move people forward.
      </div>
      <div className='margin-top'>
        { (!isLoading && showData.length) &&
          <masonry-layout cols={ cols } >
            {
              showData && showData.map((item, index)=>{
                return (
                  <CurationBlock item={ item } key={ index } />
                );
              })
            }
          </masonry-layout>
        }
      </div>
    </div>
  );
}

const getGalleryData = () => {
  return fetch(`${ apiUrl() }/viewAllApplications`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}