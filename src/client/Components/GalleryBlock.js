import React, { useState } from 'react';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';

import '../styles.css';

export default function Gallery(props) {
  const [loaded, didLoad] = useState(false);
  const item = props.item;

  return (
    <div className='gallery-block'>
      <div className='block-art'>
        { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
        <img src={ item.image } className='block-art-image' onLoad={ () => didLoad(true) } />
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
            { item.twitter && <div><img src={ Twitter } className='block-social' alt='Twitter' onClick={ () => openLink(`https://twitter.com/${ item.twitter }`) } /></div> }
            { item.instagram && <div><img src={ Instagram } className='block-social' alt='Instagram' onClick={ () => openLink(`https://instagram.com/${ item.instagram }`) } /></div> }
          </div>
        </div>
      </div>
    </div>
  );
}

const getGalleryData = () => {
  console.log(process.env);
  return fetch(`${ apiUrl() }/galleryData`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}