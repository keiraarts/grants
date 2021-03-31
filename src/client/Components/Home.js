import React, { useState, useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import '@appnest/masonry-layout';

import { apiUrl } from '../baseUrl';

import Resizer from './Tools/Resizer.js';
import GalleryBlock from './GalleryBlock';
import '../styles.scss';

const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

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
  const cols = useStoreState(state => state.app.cols);

  const [viewTab, setViewTab] = useState('grantee');
  const [showData, setShowData] = useState([]);
  const contentRef = useRef(null);

  const [grantees, setGrantees] = useState([]);
  const [nominees, setNominees] = useState([]);
  useEffect(() => {
    fetch(`${ apiUrl() }/program/getGallery`, {
      method: 'POST',
      body: JSON.stringify({ program: 'gallery' }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
    .then(json => {
      if (json && json.gallery) setGrantees(shuffle(json.gallery))
    });

    fetch(`${ apiUrl() }/program/getGallery`, {
      method: 'POST',
      body: JSON.stringify({ program: 'nominee' }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
    .then(json => {
      if (json && json.gallery) setNominees(shuffle(json.gallery))
    });
  }, [])

  useEffect(() => {
    if (grantees && grantees.length && viewTab === 'grantee') setShowData(grantees.slice(0, 30));
  }, [grantees])

  useEffect(() => {
    if (nominees && nominees.length && viewTab === 'nominee') setShowData(nominees.slice(0, 30));
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

  return (
    <div className='content-block' ref={ contentRef }>
      <Resizer />
      <div className='text-l flex'>
        Sevens Genesis Grant
        <div className='flex-full' />
        { auth.committee &&
          <div className='text-s center'>
            <Link to='/curation' className='text-grey pointer text-right'>Curation Portal</Link>
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
                    <React.Fragment key={ index }>
                      <GalleryBlock item={ item } index={ index } viewTab={ viewTab } />
                    </React.Fragment>
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
