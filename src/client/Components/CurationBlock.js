import React, { useState } from 'react';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';

import '../styles.scss';

export default function Gallery(props) {
  const item = props.item;

  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  const isVideo = ((item.art && item.art.slice(-3)) === 'mp4');

  return (
    <div className='text-s center'>
      { item.name }<br />
      URL: <a href={ item.website } className='text-grey'>{ item.website }</a><br />
      Instagram: { item.instagram }<br />
      { isVideo ?
        <video controls loop className='block-art-image' onCanPlay={ () => didLoad(true) }>
          <source src={ `https://cdn.grants.art/${ item.art }` }
                  type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
        :
        <img src={ `https://cdn.grants.art/${ item.art }` } width='800' />
      }
      <br />
      <span onClick={ () => openLink(`https://cdn.grants.art/${ item.art }`) } className='text-grey'>View Full Res</span>
      <br /><br />
    </div>
  );
}
