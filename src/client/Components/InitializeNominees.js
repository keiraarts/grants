import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { usePromise } from 'promise-hook';
import { apiUrl } from '../baseUrl';

export default function InitializeData() {
  const setNominees = useStoreActions(dispatch => dispatch.nominees.setNominees);

  const { isLoading, data: nominees } = usePromise(() => getNomineeData(), {
    resolve: true,
    resolveCondition: []
  });

  useEffect(() => {
    if (nominees && nominees.length) setNominees(nominees);
  }, [nominees])

  return (<></>);
}

const getNomineeData = () => {
  return fetch(`${ apiUrl() }/nomineeData`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}