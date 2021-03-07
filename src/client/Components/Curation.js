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

  const { isLoading: loading2, data: top } = usePromise(() => viewTopApplications(auth.token), {
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
  
  const [viewTab, setViewTab] = useState('unapproved');
  const [showData, setShowData] = useState([]);
  const contentRef = useRef(null);
  useEffect(() => {
    if (data && Array.isArray(data.unapproved)) setShowData(data.unapproved.slice(0, 30));
  }, [data])

  const setApproval = (approve, index) => {
    if (viewTab === 'unapproved') {
      data.unapproved[index].approvalCount++;
      data.unapproved[index].approved.push({ _id: auth.id });
      data.approved.push(data.unapproved[index]);
      data.unapproved.splice(index, 1);
      approve.type = 'approve';
    } else if (viewTab === 'approved') {
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

  const setRejection = (reject, index) => {
    if (viewTab === 'unapproved') {
      data.unapproved[index].rejectCount++;
      data.unapproved[index].rejected.push({ _id: auth.id });
      data.rejected.push(data.unapproved[index]);
      data.unapproved.splice(index, 1);
      reject.type = 'reject'
    } else if (viewTab === 'rejected') {
      data.rejected[index].rejectCount--;
      data.unapproved.push(data.rejected[index]);
      const removeArray = data.rejected.findIndex(e => e.id === reject.id);
      const removeRejection = data.rejected[index].rejected.findIndex(e => e.id === reject.id);
      data.rejected[index].rejected.splice(removeRejection, 1);
      data.rejected.splice(removeArray, 1);
      reject.type = 'unreject'
    }

    const newData = showData;
    const removeIndex = newData.findIndex(e => e.id === reject.id);
    newData.splice(removeIndex, 1);
    setShowData([...newData]);

    return fetch(`${ apiUrl() }/rejectApplicant`, {
      method: 'POST',
      body: JSON.stringify(reject),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json());
  }

  const toggleView = (view) => {
    if (view === 'unapproved') setShowData(data.unapproved.slice(0, 30));
    else if (view === 'approved') setShowData(data.approved.slice(0, 30));
    else if (view === 'rejected') setShowData(data.rejected.slice(0, 30));
    else if (view === 'results') setShowData(top.slice(0, 30));
    setViewTab(view);
  }

  const [loading, setLoading] = useState(false);
  useScrollPosition(({ currPos }) => {
    if (((-1 * currPos.y) + 1500 > contentRef.current.offsetHeight) && !loading) {
      if (viewTab === 'approved') setShowData(data.approved.slice(0, showData.length + 30))
      else if (viewTab === 'unapproved') setShowData(data.unapproved.slice(0, showData.length + 30))
      else if (viewTab === 'rejected') setShowData(data.rejected.slice(0, showData.length + 30))
      else if (viewTab === 'results') setShowData(top.slice(0, showData.length + 30))
    }
  }, [showData]);

  const submitFlag = (flagData, index) => {
    if (viewTab === 'unapproved') data.unapproved[index].flagged.push(flagData);
    else if (viewTab === 'approved') data.approved[index].flagged.push(flagData);
    else if (viewTab === 'rejected') data.rejected[index].flagged.push(flagData);
    else if (viewTab === 'results') top[index].flagged.push(flagData);

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

  const removeFlag = (flagData, index) => {
    if (viewTab === 'unapproved') {
      const removeIndex = data.unapproved[index].flagged.findIndex(e => e._id === flagData.flagId);
      data.unapproved[index].flagged.splice(removeIndex, 1);
    } else if (viewTab === 'approved') {
      const removeIndex = data.approved[index].flagged.findIndex(e => e._id === flagData.flagId);
      data.approved[index].flagged.splice(removeIndex, 1);
    } else if (viewTab === 'rejected') {
      const removeIndex = data.rejected[index].flagged.findIndex(e => e._id === flagData.flagId);
      data.rejected[index].flagged.splice(removeIndex, 1);
    } else if (viewTab === 'results') {
      const removeIndex = top[index].flagged.findIndex(e => e._id === flagData.flagId);
      top[index].flagged.splice(removeIndex, 1);
    }

    return fetch(`${ apiUrl() }/removeFlag`, {
      method: 'POST',
      body: JSON.stringify(flagData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
    }).then(res => res.json());
  };

  console.log(top);

  return (
    <div className='content-block' ref={ contentRef }>
      <div className='text-l text-b'>
        Committee Curation
      </div>
      <div className='text-s margin-top-s'>
        Let's move people forward.
      </div>
      <div className='flex margin-top'>
        <div className={ viewTab === 'unapproved' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => toggleView('unapproved') }>
          Unapproved
        </div>
        <div className='info-block-space' />
        <div className={ viewTab === 'approved' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => toggleView('approved') }>
          Approved
        </div>
        <div className='info-block-space' />
        <div className={ viewTab === 'rejected' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => toggleView('rejected') }>
          Rejected
        </div>
        <div className='info-block-space' />
        <div className={ viewTab === 'results' ? 'info-block info-block-selected' : 'info-block' } onClick={ () => toggleView('results') }>
          Results
        </div>
        {/* <div className='info-block-space' />
        <div className='info-block'>
          Recipients
        </div> */}
      </div>
      <div className='margin-top'>
        { (showData.length && auth && auth.username) ?
          <masonry-layout cols={ cols } >
            {
              showData && showData.map((item, index) => {
                return (
                  <CurationBlock
                    item={ item }
                    key={ index }
                    index={ index }
                    setApproval={ setApproval }
                    setRejection={ setRejection }
                    viewTab ={ viewTab }
                    submitFlag={ submitFlag }
                    removeFlag={ removeFlag }
                  />
                );
              })
            }
          </masonry-layout>
          : <></>
        }
        { (!isLoading && !loading2 && !showData.length) &&
          <div>None to show</div>
        }
        { (isLoading || loading2) && <div>Loading data...</div> }
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

const viewTopApplications = (jwt) => {
  return fetch(`${ apiUrl() }/viewTopApplications`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': jwt
    },
  }).then(res => res.json());
}