import React, { useEffect, useState } from 'react';
import { usePromise } from 'promise-hook';
import { useParams } from "react-router-dom";
import { useStoreState } from 'easy-peasy';
import { Link } from "react-router-dom";
import OpenMarket from './OpenMarket.js';
import WalletConnect from './WalletConnect.js';
import Resizer from './Tools/Resizer.js';

import '../styles.scss';

const contractAddress = '0x3f4200234e26d2dfbc55fcfd9390bc128d5e2cca';

export default function Genesis() {
  const small = useStoreState(state => state.app.small);

  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.opensea.io/api/v1/assets?asset_contract_address=${ contractAddress }&token_ids=${ id }`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then(json => setData(json));
  }, [id])

  const [asset, setAsset] = useState({});
  const [metadata, setMetadata] = useState({});
  useEffect(() => {
    console.log('WTF', data);
    if (data && data.assets) {
      const found = data.assets[0];
      setAsset(found);
      if (found) {
        const loadedMetaData = {};
        found.traits.forEach(trait => {
          if (trait.trait_type === 'Artist') loadedMetaData.artist = trait.value;
          if (trait.trait_type === 'Birth Year') loadedMetaData.year = trait.value;
          if (trait.trait_type === 'Country of Representation') loadedMetaData.country = trait.value;
          if (trait.trait_type === 'Country Code') loadedMetaData.countryCode = trait.value;
          if (trait.trait_type === 'City') loadedMetaData.city = trait.value;
          if (trait.trait_type === 'Website') loadedMetaData.website = trait.value;
          if (trait.trait_type === 'Twitter') loadedMetaData.twitter = trait.value;
          if (trait.trait_type === 'Instagram') loadedMetaData.instagram = trait.value;
        });

        setMetadata(loadedMetaData);
      }
    }
  }, [data])

  function switchPage(direction) {
    if (id === '1' && direction === 'previous') return id;
    else if (direction === 'next') return Number(id) + 1
    else return Number(id) - 1;
  }

  console.log('YO', asset);

  return (
    <div className='content-block'>
      <Resizer />
      <WalletConnect />
      <div className='text-m text-b'>
        Genesis Grant Exhibition
      </div>
      <div className='margin-top flex'>
        <Link to={ `/gallery/${ switchPage('previous') }` } className='relative'>
          <div class='round'>
            <div id='cta'>
              <span class='arrow-left segunda previous'></span>
              <span class='arrow-left primera previous'></span>
            </div>
          </div>
        </Link>
        <div className='flex-full' />
        <Link to={ `/gallery/${ switchPage('next') }` } className='relative'>
          <div class='round arrow-right'>
            <div id='cta'>
              <span class='arrow primera next'></span>
              <span class='arrow segunda next'></span>
            </div>
          </div>
        </Link>
      </div>
      <div className={ `margin-top flex full-width ${ !small && 'side-space' }` }>
        { asset ?
          <div className='margin-top-l gallery-container full-width'>
            { small &&
              <div className='flex-full center gallery-frame-container-small'>
                <div className='frame gallery-art-container'>
                  { (asset && asset.image_url && asset.image_url.slice(-3) === 'mp4') ?
                    <video controls muted loop autoplay webkit-playsinline='true' playsInline className='gallery-art'>
                      <source src={ asset.image_url }
                              type="video/mp4" />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  :
                    <img src={ asset.image_url } className='gallery-art'  />
                  }
                </div>
                <div className='margin-top' />
              </div>
            }
            <div className={ `gallery-description` }>
              <div className='text-s'>
                <div className='gallery-plate metal linear'>
                  <div className='text-s'>
                    <strong>{ metadata.artist }</strong> { metadata.year && `(b. ${ metadata.year })` }<br />
                    { metadata.country }
                  </div>
                  <div className='margin-top-s text-s text-b'>
                    <strong><i>{ asset.name || 'Untitled' }</i></strong>, 2021<br />
                    Digital Art as NFT
                  </div>
                  <div className='margin-top-s'>
                    { asset.description }
                  </div>
                </div>
              </div>
              { (!small && asset.asset_contract) && <OpenMarket asset={ asset } /> }
            </div>
            { !small &&
              <div className='flex-full center gallery-frame-container'>
                <div className='frame gallery-art-container'>
                  { (asset && asset.image_url && asset.image_url.slice(-3) === 'mp4') ?
                    <video controls muted loop autoplay webkit-playsinline='true' playsInline className='gallery-art'>
                      <source src={ asset.image_url }
                              type="video/mp4" />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  :
                    <img src={ asset.image_url } className='gallery-art'  />
                  }
                </div>
              </div>
            }
            { (small && asset.asset_contract) && <OpenMarket asset={ asset } /> }
          </div>
          :
          <div className='margin-top'>
            This NFT does not seem to exist...
            <div className='margin-top' />
          </div>
        }
      </div>
      <div className='margin-top-l' />
    </div>
  );
}
