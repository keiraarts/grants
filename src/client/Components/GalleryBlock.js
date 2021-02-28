import React, { useState } from 'react';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';

import '../styles.scss';

export default function Gallery(props) {
  const [loaded, didLoad] = useState(false);
  const item = props.item;

  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='gallery-block'>
      <div className='block-art'>
        { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
        { item.image.slice(-3) === 'mp4' ?
          <video controls muted loop webkit-playsinline playsinline className='block-art-image' onCanPlay={ () => didLoad(true) }>
            <source src={ item.image }
                    type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
         :
         <img src={ item.image } className='block-art-image' onLoad={ () => didLoad(true) } />
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
                <span className='pointer text-grey' onClick={ () => openLink(item.external_url) }>View Market</span>
              </div>
            </div>
          </div>
          <div>
            { (item.external || item.website) && <div><img src={ Web } className='block-social-web pointer' alt='Website' onClick={ () => openLink(item.external || item.website) } /></div> }
            { item.twitter && <div><img src={ Twitter } className='block-social' alt='Twitter' onClick={ () => openLink(item.twitter.substring(0, 4) === 'http' ? item.twitter : `https://twitter.com/${ item.twitter }`) } /></div> }
            { item.instagram && <div><img src={ Instagram } className='block-social' alt='Instagram' onClick={ () => openLink(item.instagram.substring(0, 4) === 'http' ? item.instagram : `https://instagram.com/${ item.instagram }`) } /></div> }
          </div>
        </div>
      </div>
    </div>
  );
}
