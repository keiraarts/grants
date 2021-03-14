import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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

  const [metadata, setMetadata] = useState({});
  useEffect(() => {
    // console.log('YO', item);
    if (item && item.traits) {
      const loadedMetaData = {};
      item.traits.forEach(trait => {
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
  }, [item])

  console.log('YEO', metadata);

  return (
    <div className='gallery-block'>
      <div className='block-art'>
        { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
        { (item && item.image_preview_url) && item.image_preview_url.slice(-3) === 'mp4' ?
          <video controls muted loop webkit-playsinline='true' playsInline className='block-art-image' onCanPlay={ () => didLoad(true) }>
            <source src={ item.image_preview_url }
                    type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
         :
         <img src={ item.image_preview_url } className='block-art-image' onLoad={ () => didLoad(true) } />
        }
      </div>
      <div className='text-s'>
        <div className='flex'>
          <div className='flex-full text-left'>
            <div className='block-info'>
              <div className='flex-full'>
                <i>{ item.name }</i><br />
                <strong>{ metadata.artist ? metadata.artist : 'Artist Unknown' }</strong>
              </div>
              <div className='block-market'>
                <Link to={ `/gallery/${ item.token_id }` } className='pointer text-grey'>View Market</Link>
              </div>
            </div>
          </div>
          <div>
            { metadata.website && <div><img src={ Web } className='block-social-web pointer' alt='Website' onClick={ () => openLink(metadata.website) } /></div> }
            { metadata.twitter && <div><img src={ Twitter } className='block-social' alt='Twitter' onClick={ () => openLink(`https://twitter.com/${ metadata.twitter }`) } /></div> }
            { metadata.instagram && <div><img src={ Instagram } className='block-social' alt='Instagram' onClick={ () => openLink(`https://instagram.com/${ metadata.instagram }`) } /></div> }
          </div>
        </div>
      </div>
    </div>
  );
}
