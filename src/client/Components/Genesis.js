import React, { useEffect, useState, useRef } from 'react';
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
  const type = useLocation().pathname.split('/')[1] === 'gallery' ? 'grantee' : 'nominee';
  const address = type === 'grantee' ? contractAddress : nomineeAddress;

  const gallery = useStoreState(state => { return (type === 'grantee') ? state.grantees.data : state.nominees.data });
  const [preload, setPreload] = useState([]);
  useEffect(() => {
    if (gallery && gallery.length) {
      const index = Number(id);
      let before = index - 3;
      if (before < 0) before = 0;
      let after = index + 2;
      setPreload([]);
      setTimeout(() => {
        setPreload(gallery.slice(before, after));
      });
    }
  }, [gallery, id])

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.opensea.io/api/v1/assets?asset_contract_address=${ address }&token_ids=${ id }`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then(json => setData(json));
  }, [id])

  function switchPage(direction) {
    if (id === '1' && direction === 'previous') return id;
    else if (direction === 'next') return Number(id) + 1
    else return Number(id) - 1;
  }

  return (
    <div className='content-block'>
      <Resizer />
      <WalletConnect />
      <div className='text-m text-b'>
        Genesis Grant { type !== 'grantee' && 'Nominee ' }Exhibition
      </div>
      <div className='margin-top flex'>
        <Link to={ `/${ type === 'grantee' ? 'gallery' : 'nominee' }/${ switchPage('previous') }` } className='relative'>
          <div class='round'>
            <div id='cta'>
              <span class='arrow-left segunda previous'></span>
              <span class='arrow-left primera previous'></span>
            </div>
          </div>
        </Link>
        <div className='flex-full' />
        <Link to={ `/${ type === 'grantee' ? 'gallery' : 'nominee' }/${ switchPage('next') }` } className='relative'>
          <div class='round arrow-right'>
            <div id='cta'>
              <span class='arrow primera next'></span>
              <span class='arrow segunda next'></span>
            </div>
          </div>
        </Link>
      </div>
      <div class='gallery-min-height'>
        { preload.map((preload, key) => {
          console.log('PRELOADING', preload);
            return (
              <div className={ `${ (Number(id) !== Number(preload.tokenId)) && 'hidden' }` }>
                <NFT key={ key } small={ small } nft={ gallery.find((e => e.tokenId === preload.tokenId)) } />
              </div>
            )
          })
        }
      </div>
      <div className='margin-top-l' />
    </div>
  );
}
