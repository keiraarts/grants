import React, { useEffect, useReducer, useState, useRef } from 'react';
import { usePromise } from 'promise-hook';
import { useParams, useLocation } from "react-router-dom";
import { useStoreState } from 'easy-peasy';
import { Link } from "react-router-dom";
import GenesisNFT from './GenesisNFT.js';
import WalletConnect from './WalletConnect.js';
import Resizer from './Tools/Resizer.js';

import '../styles.scss';

const contractAddress = '0xc0b4777897a2a373da8cb1730135062e77b7baec';
const nomineeAddress = '0xf6e716ba2a2f4acb3073d79b1fc8f1424758c2aa';

const NFT = React.memo(GenesisNFT);

export default function Genesis() {
  const small = useStoreState(state => state.app.small);
  const { id } = useParams();
  const tokenId = Number(id);
  const location = useLocation().pathname.split('/');
  const type = location[location.length - 2] === 'gallery' ? 'grantee' : 'nominee';
  const address = type === 'grantee' ? contractAddress : nomineeAddress;

  const gallery = useStoreState(state => { return (type === 'grantee') ? state.grantees.data : state.nominees.data });
  const [preload, dispatch] = useReducer((preload, { type, value }) => {
    if (type === 'add') {
      return [...preload, value];
    } else if (type === 'update') {
      const index = preload.findIndex(e => Number(e.tokenId) === value.tokenId);
      if (index) {
        const updated = preload[index];
        if (updated) {
          updated.image = value.image;
          return [
            ...preload.slice(0, index),
            updated,
            ...preload.slice(index + 1)
          ];
        }
      }
    } else if (type === 'remove') {
      return preload.filter(e => Number(e.tokenId) !== value.tokenId);
    }

    return preload;
  }, []);

  useEffect(() => {
    if (gallery && gallery.length && !preload.length) {
      const index = tokenId;
      let before = index - 1;
      if (before < 0) before = 0;
      let after = index + 1;
      for (let i = before; i <= after; i++) {
        if (gallery[i - 1].imageType === 'mp4' || gallery[i - 1].imageType === 'mov') {
          dispatch({ type: 'add', value: { tokenId: i, image: null, isVideo: true } });
          fetch(gallery[i - 1].image).then(async (res) => {
            const blob = await res.blob();
            const image = window.URL.createObjectURL(blob);
            dispatch({ type: 'update', value: { tokenId: i, image } });
          });
        } else {
          let image;
          image = new Image();
          image.src = gallery[i - 1].image;
          dispatch({ type: 'add', value: { tokenId: i, image } });
        }
      }
    }
  }, [gallery])

  function updatePreload(direction, currentToken) {
    let inc;
    if (direction === 'next') {
      dispatch({ type: 'remove', value: { tokenId: currentToken - 4 }});
      inc = 5;
    } else if (direction === 'previous') {
      dispatch({ type: 'remove', value: { tokenId: currentToken + 4 }});
      inc = -5;
    }

    const newLoad = gallery[currentToken - 1 + inc];

    if (newLoad && (newLoad.imageType === 'mp4' || gallery[i - 1].imageType === 'mov')) {
      dispatch({ type: 'add', value: { tokenId: currentToken + inc, image: null, isVideo: true } });
      fetch(newLoad.image).then(async (res) => {
        const blob = await res.blob();
        const image = window.URL.createObjectURL(blob);
        dispatch({ type: 'update', value: { tokenId: currentToken + inc, image } });
      });
    } else if (newLoad) {
      const image = new Image();
      image.src = newLoad.image;
      dispatch({ type: 'add', value: { tokenId: currentToken + inc, image } });
    }
  }

  function switchPage(direction) {
    if (id === '1' && direction === 'previous') return id;
    else if (direction === 'next') return Number(id) + 1;
    else return Number(id) - 1;
  }

  let foundSrc, src1, src2, src3;
  if (preload && preload.length) {
    foundSrc = preload.find(e => { return (e.isVideo && e.tokenId === (tokenId - 1)) });
    src1 = foundSrc ? foundSrc.image : null;

    foundSrc = preload.find(e => { return (e.isVideo && e.tokenId === (tokenId)) });
    src2 = foundSrc ? foundSrc.image : null;

    foundSrc = preload.find(e => { return (e.isVideo && e.tokenId === (tokenId + 1)) });
    src3 = foundSrc ? foundSrc.image : null;
  }

  return (
    <div className='content-block'>
      <Resizer />
      <WalletConnect />
      <div className='text-m text-b'>
        Genesis Grant { type !== 'grantee' && 'Nominee ' }Exhibition
      </div>
      <div className='margin-top flex'>
        <Link to={ `/${ type === 'grantee' ? 'gallery' : 'nominee' }/${ switchPage('previous') }` } className='relative' onClick={ () => updatePreload('previous', tokenId) }>
          <div className='round'>
            <div id='cta'>
              <span className='arrow-left segunda previous'></span>
              <span className='arrow-left primera previous'></span>
            </div>
          </div>
        </Link>
        <div className='flex-full' />
        <Link to={ `/${ type === 'grantee' ? 'gallery' : 'nominee' }/${ switchPage('next') }` } className='relative' onClick={ () => updatePreload('next', tokenId) }>
          <div className='round arrow-right'>
            <div id='cta'>
              <span className='arrow primera next'></span>
              <span className='arrow segunda next'></span>
            </div>
          </div>
        </Link>
      </div>
      { gallery &&
        <div className='gallery-min-height'>
          <NFT key={ tokenId - 2 } small={ small } nft={ gallery[tokenId - 2] } src={ src1 } important hidden />
          <NFT key={ tokenId - 1} small={ small } nft={ gallery[tokenId - 1] } src={ src2 } important />
          <NFT key={ tokenId } small={ small } nft={ gallery[tokenId] } src={ src3 } important hidden />
        </div>
      }
      <div className='margin-top-l' />
    </div>
  );
}
