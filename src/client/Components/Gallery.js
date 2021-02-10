import React from 'react';
import { usePromise } from 'promise-hook';
import { apiUrl } from '../baseUrl';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';

import '../styles.css';

export default function Gallery() {
  const { isLoading, data } = usePromise(() => getGalleryData(), {
    resolve: true,
    resolveCondition: []
  });

  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  console.log(data);

  return (
    <div className='content-block'>
      <div className='text-m text-b'>
        The Gallery
      </div>
      <div className='text-s text-desc'>
        Genesis Grants aim to curate, educate, and fund an artist's first true digital signature to ease and bridge the gap
        between traditional publishing and NFTs, the future of our creativity ❤️
      </div>
      <div className='cols'>
        { isLoading ?
          <div className='gallery-block'>
            <div className='block-art'>
              <div className='block-art-image'>
                ?
              </div>
            </div>
            <div className='block-info text-s'>
              Artwork by Artist
            </div>
          </div>
          :
          <div className='gallery-container margin-top'>
            {
              data && data.map((item, index)=>{
                return (
                  <div className='gallery-block' key={ index }>
                    <div className='block-art'>
                      <img src={ item.image } className='block-art-image' />
                    </div>
                    <div className='text-s'>
                      <div className='flex'>
                        <div className='flex-full text-left'>
                          <div className='block-info'>
                            <div className='flex-full'>
                              <i>{ item.name }</i><br />
                              <strong>{ item.artist }</strong>
                            </div>
                            <div className='block-market'>
                              <span className='pointer text-gradient' onClick={ () => openLink(item.external_url) }>View Market</span>
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
              })
            }
            {
              data && data.map((item, index)=>{
                return (
                  <div className='gallery-block' key={ index }>
                    <div className='block-art'>
                      <img src={ item.image } className='block-art-image' />
                    </div>
                    <div className='text-s'>
                      <div className='flex'>
                        <div className='flex-full text-left'>
                          <div className='block-info'>
                            <div className='flex-full'>
                              <i>{ item.name }</i><br />
                              <strong>{ item.artist }</strong>
                            </div>
                            <div className='block-market'>
                              <span className='pointer text-gradient' onClick={ () => openLink(item.external_url) }>View Market</span>
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
              })
            }
            {
              data && data.map((item, index)=>{
                return (
                  <div className='gallery-block' key={ index }>
                    <div className='block-art'>
                      <img src={ item.image } className='block-art-image' />
                    </div>
                    <div className='text-s'>
                      <div className='flex'>
                        <div className='flex-full text-left'>
                          <div className='block-info'>
                            <div className='flex-full'>
                              <i>{ item.name }</i><br />
                              <strong>{ item.artist }</strong>
                            </div>
                            <div className='block-market'>
                              <span className='pointer text-gradient' onClick={ () => openLink(item.external_url) }>View Market</span>
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
              })
            }
          </div>
        }
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