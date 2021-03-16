import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';

import '../styles.scss';

export default function Gallery(props) {
  const [loaded, didLoad] = useState(false);
  const item = props.item || {};

  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  console.log(item);
  let displayArt;
  if (item.thumbnail) displayArt = item.thumbnail;
  else displayArt = item.imageWeb ? `https://cdn.grants.art/${ item.imageWeb }` : item.image;
  const displayType = item.thumbnailType || item.imageType;

  return (
    <div className='gallery-block'>
      <div className='block-art'>
        { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
        { (displayArt) && displayType === 'mp4' ?
          <video muted loop autoPlay webkit-playsinline='true' playsInline className='block-art-image' onCanPlay={ () => didLoad(true) }>
            <source src={ displayArt }
                    type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
         :
         <img src={ displayArt } className='block-art-image' onLoad={ () => didLoad(true) } />
        }
      </div>
      <div className='text-s'>
        <div className='flex'>
          <div className='flex-full text-left'>
            <div className='block-info'>
              <div className='flex-full'>
                <i>{ item.name }</i><br />
                <strong>{ item.artist ? item.artist : 'Artist Unknown' }</strong>
              </div>
              <div className='block-market'>
                <Link to={ `/gallery/${ item.tokenId }` } className='pointer text-grey'>View Market</Link>
              </div>
            </div>
          </div>
          <div>
            { item.website && <div><img src={ Web } className='block-social-web pointer' alt='Website' onClick={ () => openLink(item.website) } /></div> }
            { item.twitter && <div><img src={ Twitter } className='block-social' alt='Twitter' onClick={ () => openLink(`https://twitter.com/${ item.twitter }`) } /></div> }
            { item.instagram && <div><img src={ Instagram } className='block-social' alt='Instagram' onClick={ () => openLink(`https://instagram.com/${ item.instagram }`) } /></div> }
          </div>
        </div>
      </div>
    </div>
  );
}
