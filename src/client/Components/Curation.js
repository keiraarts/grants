import React, { useEffect, useState, useRef } from 'react';
import { usePromise } from 'promise-hook';
import { useStoreState } from 'easy-peasy';
import { apiUrl } from '../baseUrl';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import CurationBlock from './CurationBlock';

import '../styles.scss';

export default function Curation() {
  const auth = useStoreState(state => state.user.auth);

  const { isLoading, data } = usePromise(() => getGalleryData(auth.token), {
    resolve: true,
    resolveCondition: []
  });

  console.log(data);

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
  
  const [viewApproved, setViewApproved] = useState(false);
  const [showData, setShowData] = useState([]);
  const contentRef = useRef(null);
  useEffect(() => {
    if (data && Array.isArray(data.unapproved)) setShowData(data.unapproved.slice(0, 30));
  }, [data])

  const setApproval = (approve, index) => {
    console.log(approve, index);
    if (!viewApproved) {
      data.unapproved[index].approvalCount++;
      data.unapproved[index].approved.push({ _id: auth.id });
      data.approved.push(data.unapproved[index]);
      data.unapproved.splice(index, 1);
      approve.type = 'approve';
    } else {
      data.approved[index].approvalCount--;
      data.unapproved.push(data.approved[index]);
      const removeArray = data.approved.findIndex(e => e.id === approve.id);
      const removeApproval = data.approved[index].approved.findIndex(e => e.id === approve.id);
      data.approved[index].approved.splice(removeApproval, 1);
      data.approved.splice(removeArray, 1);
      approve.type = 'unapprove';
    }

    const newData = showData;
    const removeIndex = newData.findIndex(e => e.id === approve.id);
    newData.splice(removeIndex, 1);
    setShowData([...newData]);

    return fetch(`${ apiUrl() }/approveApplicant`, {
      method: 'POST',
      body: JSON.stringify(approve),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json());
  }

  const toggleView = (view) => {
    if (view === 'unapproved') {
      setShowData(data.unapproved.slice(0, 30));
      setViewApproved(false);
    } else if (view === 'approved') {
      setShowData(data.approved.slice(0, 30));
      setViewApproved(true);
    } else if (view === 'recipients'); {

    }
  }

  const [loading, setLoading] = useState(false);
  useScrollPosition(({ currPos }) => {
    if (((-1 * currPos.y) + 1500 > contentRef.current.offsetHeight) && !loading) {
      if (viewApproved) setShowData(data.approved.slice(0, showData.length + 30))
      else setShowData(data.unapproved.slice(0, showData.length + 30))
    }
  }, [showData]);

  const submitFlag = (flagData, index) => {
    if (!viewApproved) {
      data.unapproved[index].flagged.push(flagData);
    } else {
      data.approved[index].flagged.push(flagData);
    }

    return fetch(`${ apiUrl() }/flagApplicant`, {
      method: 'POST',
      body: JSON.stringify(flagData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json());
  };

  console.log('DAFUQ?', data);

  return (
    <div className='content-block' ref={ contentRef }>
      <div className='text-l text-b'>
        Committee Curation
      </div>
      <div className='text-s margin-top-s'>
        Let's move people forward.
      </div>
      <div className='flex margin-top'>
        <div className={ viewApproved ? 'info-block' : 'info-block info-block-selected' } onClick={ () => toggleView('unapproved') }>
          Unapproved
        </div>
        <div className='info-block-space' />
        <div className={ !viewApproved ? 'info-block' : 'info-block info-block-selected' } onClick={ () => toggleView('approved') }>
          Approved
        </div>
        <div className='info-block-space' />
        <div className='info-block'>
          Recipients
        </div>
      </div>
      <div className='margin-top'>
        { (!isLoading && showData.length && auth && auth.username) ?
          <masonry-layout cols={ cols } >
            {
              showData && showData.map((item, index) => {
                return (
                  <CurationBlock
                    item={ item }
                    key={ index }
                    index={ index }
                    setApproval={ setApproval }
                    viewApproved={ viewApproved }
                    submitFlag={ submitFlag }
                  />
                );
              })
            }
          </masonry-layout>
          :
          <div>None to show</div>
        }
      </div>
    </div>
  );
}

const getGalleryData = (jwt) => {
  return fetch(`${ apiUrl() }/viewAllApplications`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': jwt
    },
  }).then(res => res.json());
}