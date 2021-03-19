import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import OpenMarket from './OpenMarket.js';

import '../styles.scss';

const contractAddress = '0xc0b4777897a2a373da8cb1730135062e77b7baec';
const nomineeAddress = '0xf6e716ba2a2f4acb3073d79b1fc8f1424758c2aa';

export default function GenesisNFT(props) {
  const nft = props.nft;
  const small = props.small;

  const [loaded, setLoaded] = useState(false);

  return (
    <div className={ `margin-top flex full-width ${ !small && 'side-space' }` }>
      { nft ?
        <div className='margin-top-l gallery-container full-width'>
          { small &&
            <div className='flex-full center gallery-frame-container-small'>
              <div className='frame gallery-art-container'>
                <div className='frame-shadow'>
                  { (nft.imageType === 'mp4')  &&
                    <video muted loop autoPlay webkit-playsinline='true' playsInline className={ `gallery-art ${ !loaded && 'hidden'}` }>
                      <source src={ nft.image } />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  }
                  { (nft.imageType === 'mp4' && nft.thumbnailType !== 'gif') &&
                    <video muted loop autoPlay webkit-playsinline='true' playsInline className={ `gallery-art ${ loaded && 'hidden'}` }  onLoad={ () => setLoaded(true) }>
                      <source src={ `https://cdn.grants.art/${ nft.imageWeb }` } />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  }
                  { (nft.imageType !== 'mp4') &&
                    <img className={ `gallery-art ${ !loaded && 'hidden'}` } src={ nft.image } onLoad={ () => setLoaded(true) } />
                  }
                  { (nft.imageType !== 'mp4' || nft.thumbnailType === 'gif') &&
                    <img className={ `gallery-art ${ loaded && 'hidden '}` } src={ `https://cdn.grants.art/${ nft.imageWeb }` } />
                  }
                </div>
              </div>
              <div className='margin-top' />
            </div>
          }
          <div className={ `gallery-description` }>
            <div className='text-s'>
              <div className='gallery-plate metal linear'>
                <div className='text-s'>
                  <strong>{ nft.artist }</strong> { nft.year && `(b. ${ nft.year })` }<br />
                  { nft.country }
                </div>
                <div className='margin-top-s text-s text-b'>
                  <strong><i>{ nft.name || 'Untitled' }</i></strong>, 2021<br />
                  Digital Art as NFT
                </div>
                <div className='margin-top-s text-xs'>
                  { nft.description }
                </div>
              </div>
            </div>
            {/* { !small && <OpenMarket asset={ asset } /> } */}
          </div>
          { !small &&
            <div className='flex-full center gallery-frame-container'>
              <div className='frame gallery-art-container'>
                <div className='frame-shadow'>
                { (nft.imageType === 'mp4')  &&
                  <video muted loop autoPlay webkit-playsinline='true' playsInline className={ `gallery-art ${ !loaded && 'hidden'}` } onCanPlay={ () => setLoaded(true) }>
                    <source src={ nft.image } />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                }
                { (nft.imageType === 'mp4' && nft.thumbnailType !== 'gif') &&
                  <video muted loop autoPlay webkit-playsinline='true' playsInline className={ `gallery-art ${ loaded && 'hidden'}` }>
                    <source src={ `https://cdn.grants.art/${ nft.imageWeb }` } />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                }
                { (nft.imageType !== 'mp4') &&
                  <img className={ `gallery-art ${ !loaded && 'hidden'}` } src={ nft.image } onLoad={ () => setLoaded(true) } />
                }
                { (nft.imageType !== 'mp4' || nft.thumbnailType === 'gif') &&
                  <img className={ `gallery-art ${ loaded && 'hidden '}` } src={ `https://cdn.grants.art/${ nft.imageWeb }` } />
                }
                </div>
              </div>
              { !loaded &&
                <div class='loader margin-top-l'>
                  <div class='loaderBar'></div>
                </div>
              }
            </div>
          }
          {/* { small && <OpenMarket asset={ asset } /> } */}
        </div>
        :
        <div className='margin-top'>
          This NFT does not seem to exist...
          <div className='margin-top' />
        </div>
      }
    </div>
  );
}
