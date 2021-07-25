import React, { useState } from 'react';

// import '../../styles.scss';

export default function DecidedBlock({ order, nft }) {
  const [loaded, didLoad] = useState(false);
  const imageType = nft.artWeb.split('.')[1];

  return (
    <div className='reorder-block flex'>
      <img src='/assets/drag.png' className='drag-icon v-center' />
      { (!loaded) && <div className='reorder-loading'><div className='loading'><div></div><div></div></div></div> }
      <div className='drag-order'>
        { order + 1 }
      </div>
      { imageType === 'mp4' ?
        <video muted loop autoPlay webkit-playsinline='true' playsInline preload='none' className='reorder-image' onCanPlay={ () => didLoad(true) }>
            <source src={ `https://cdn.grants.art/${ nft.artWeb }` }
                    type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        :
        <img src={ `https://cdn.grants.art/${ nft.artWeb }` } className='reorder-image' onLoad={ () => didLoad(true) } />
      }
      <div className='flex-full' />
    </div>
  );
}
