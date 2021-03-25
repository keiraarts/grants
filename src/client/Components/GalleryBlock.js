import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';

import '../styles.scss';

export default function Gallery(props) {
  const [loaded, didLoad] = useState(false);
  const item = props.item || {};
  const type = props.viewTab;

  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  let displayArt;
  if (item.imageWeb) displayArt = `https://cdn.grants.art/${ item.imageWeb }`;
  else if (item.thumbnail) displayArt = item.thumbnail;
  else displayArt = item.image;
  const displayType = item.thumbnailType || item.imageType;

  return (
    <div className='margin-top-minus'>
      <div className='gallery-block'>
        <Link to={ `/${ type === 'grantee' ? 'gallery' : 'nominee' }/${ item.tokenId }` } className='block-art pointer'>
          { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
          { (displayArt) && displayType === 'mp4' ?
            <video muted loop autoPlay webkit-playsinline='true' playsInline preload='none' className='block-art-image' onCanPlay={ () => didLoad(true) }>
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
