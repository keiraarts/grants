import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../styles.scss';

export default function Gallery(props) {
  const [loaded, didLoad] = useState(false);
  const item = props.item || {};
  const type = props.viewTab;

  const displayArt = `https://cdn.grants.art/${ item.artWeb }`;
  const displayType = item.artWeb.split('.')[1];

  return (
    <div className='margin-top-minus'>
      <div className='gallery-block'>
        <Link to={ `/${ type === 'grantee' ? 'gallery' : 'nominee' }/${ item.order }` } className='block-art pointer'>
          { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
          { (displayArt && (displayType === 'mp4' || displayType === 'mov')) ?
            <video muted loop autoPlay webkit-playsinline='true' playsInline preload='none' className='block-art-image' onLoadedData={ () => didLoad(true) }>
              <source src={ displayArt }
                      type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          :
          <img src={ displayArt } className='block-art-image' onLoad={ () => didLoad(true) } />
          }
        </Link>
      </div>
    </div>
  );
}
