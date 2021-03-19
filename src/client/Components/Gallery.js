import React, { useState, useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import '@appnest/masonry-layout';

import { apiUrl } from '../baseUrl';

import '../styles.scss';
import GalleryBlock from './GalleryBlock';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function Gallery() {
  const auth = useStoreState(state => state.user.auth);
  const grantees = shuffle(useStoreState(state => state.grantees));
  const nominees = shuffle(useStoreState(state => state.nominees));

  const [viewTab, setViewTab] = useState('grantee');
  const [showData, setShowData] = useState([]);
  const contentRef = useRef(null);
  useEffect(() => {
    if (grantees && Array.isArray(grantees)) setShowData(grantees.slice(0, 30));
  }, [grantees])

  useEffect(() => {
    if (nominees && Array.isArray(nominees)) setShowData(nominees.slice(0, 30));
  }, [nominees])

  useScrollPosition(({ currPos }) => {
    if (((-1 * currPos.y) + 1500 > contentRef.current.offsetHeight)) {
      if (viewTab === 'grantee') setShowData(grantees.slice(0, showData.length + 30))
      else if (viewTab === 'nominee') setShowData(nominees.slice(0, showData.length + 30))
    }
  }, [showData]);

  const toggleView = (view) => {
    if (view === 'grantee') {
      setShowData([]); setTimeout(() => setShowData(grantees.slice(0, 30)));
    } else if (view === 'nominee') {
      setShowData([]); setTimeout(() => setShowData(nominees.slice(0, 30)));
    }
    setViewTab(view);
  }

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

  return (
    <div className='content-block' ref={ contentRef }>
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
      <div className='flex margin-top'>
        <div className={ viewTab === 'grantee' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => toggleView('grantee') }>
          Grantees
        </div>
        <div className='info-block-space' />
        <div className={ viewTab === 'nominee' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => toggleView('nominee') }>
          Nominees
        </div>
      </div>
      <div className='cols'>
        { !showData ?
          <div className='gallery-container margin-top'>
            <div className='margin-top-l'>
              <div className="loading"><div></div><div></div></div>
            </div>
          </div>
          :
          <div className='margin-top'>
            <masonry-layout cols={ cols } >
              {
                (showData) && showData.map((item, index)=>{
                  return (
                    <GalleryBlock item={ item } key={ index } index={ index } viewTab={ viewTab } />
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