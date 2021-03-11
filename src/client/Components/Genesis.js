import React, { useEffect, useState } from 'react';
import { usePromise } from 'promise-hook';
import { useParams } from "react-router-dom";
import OpenMarket from './OpenMarket.js';
import WalletConnect from './WalletConnect.js';

import '../styles.scss';

export default function Genesis() {
  const { id } = useParams();
  const { isLoading, data } = usePromise(() => getAsset('0x3f4200234e26d2dfbc55fcfd9390bc128d5e2cca', id), {
    resolve: true,
    resolveCondition: []
  });

  const [asset, setAsset] = useState({});
  const [artist, setArtist] = useState(undefined);
  useEffect(() => {
    if (data) {
      const found = data.assets[0];
      setAsset(found);
      found.traits.forEach(trait => {
        if (trait.trait_type === 'Artist') setArtist(trait.value);
      });
    }
  }, [data])

  return (
    <div className='content-block'>
      <WalletConnect />
      <div className='text-m text-b'>
        Genesis Grant Exhibition
      </div>
      <div className='margin-top flex full-width'>
        <div className='gallery-description text-s'>
          <div className='text-s margin-top-s'>
            <strong>{ artist }</strong> (b. 1993)<br />
            United States of America
          </div>
          <div className='margin-top-s text-s text-b'>
            <strong><i>{ asset.name }</i></strong>, 2021<br />
            Digital Art as NFT
          </div>
          <div className='margin-top-s'>
            { asset.description }
          </div>
          { asset.asset_contract && <OpenMarket asset={ asset } /> }
        </div>
        <div className='flex-full center'>
          { (asset && asset.image_url && asset.image_url.slice(-3) === 'mp4') ?
            <video controls muted loop webkit-playsinline='true' playsInline className='gallery-art'>
              <source src={ asset.image_url }
                      type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          :
          <img src={ asset.image_url } className='gallery-art'  />
          }
        </div>
      </div>
    </div>
  );
}

const getAsset = (contract, id) => {
  return fetch(`https://api.opensea.io/api/v1/assets?asset_contract_address=${ contract }&token_ids=${ id }`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}
