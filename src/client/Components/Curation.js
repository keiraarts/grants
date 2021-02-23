import React, { useEffect, useState } from 'react';
import { usePromise } from 'promise-hook';
import { apiUrl } from '../baseUrl';

import CurationBlock from './CurationBlock';

import '../styles.scss';


export default function Curation() {
  const { isLoading, data } = usePromise(() => getGalleryData(), {
    resolve: true,
    resolveCondition: []
  });

  console.log(data);

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Committee Curation
      </div>
      <div className='text-s margin-top-s'>
        Let's move people forward.
      </div>
      <div className='margin-top'>
        { (!isLoading && data.length) &&
          data.map((item, index)=>{
            return (
              <CurationBlock item={ item } key={ index } />
            );
          })
        }
      </div>
    </div>
  );
}

const getGalleryData = () => {
  console.log(process.env);
  return fetch(`${ apiUrl() }/viewAllApplications`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}