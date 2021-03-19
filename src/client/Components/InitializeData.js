import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { usePromise } from 'promise-hook';
import { apiUrl } from '../baseUrl';

export default function InitializeData() {
  const setGrantees = useStoreActions(dispatch => dispatch.grantees.setGrantees);
  const setNominees = useStoreActions(dispatch => dispatch.nominees.setNominees);

  const { isLoading: isLoading1, data: grantees } = usePromise(() => getGalleryData(), {
    resolve: true,
    resolveCondition: []
  });

  const { isLoading: isLoading2, data: nominees } = usePromise(() => getNomineeData(), {
    resolve: true,
    resolveCondition: []
  });

  useEffect(() => {
    if (grantees && grantees.length) setGrantees(grantees);
  }, [grantees])

  useEffect(() => {
    if (nominees && nominees.length) setNominees(nominees);
  }, [nominees])

  return (<></>);
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

const getNomineeData = () => {
  return fetch(`${ apiUrl() }/nomineeData`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}