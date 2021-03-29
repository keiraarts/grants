import React, { useState } from 'react';

import '../../styles.scss';

export default function Gallery({ nft, undo, type }) {
  const [loaded, didLoad] = useState(false);
  const imageType = nft.artWeb.split('.')[1];

  return (
    <div className='margin-top-minus'>
      <div className='gallery-block'>
        { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
        { imageType === 'mp4' ?
          <video muted loop autoPlay webkit-playsinline='true' playsInline preload='none' className='block-art-image' onCanPlay={ () => didLoad(true) }>
              <source src={ `https://cdn.grants.art/${ nft.artWeb }` }
                      type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          :
          <img src={ `https://cdn.grants.art/${ nft.artWeb }` } className='block-art-image' onLoad={ () => didLoad(true) } />
        }
      </div>
      <div className='flex'>
        <div className='small-button flex-full' onClick={ () => undo(nft.id, type) }>
          Undo
        </div>
        <div className='small-space' />
        <div className='small-button flex-full'>
          View Info
        </div>        
      </div>
    </div>
  );
}
