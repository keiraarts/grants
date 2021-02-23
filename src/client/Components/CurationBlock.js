import React, { useState } from 'react';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';
import ReactModal from 'react-modal';

import '../styles.scss';

export default function Gallery(props) {
  const [loaded, didLoad] = useState(false);
  const item = props.item;

  const [artOpen, setArtOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);

  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='gallery-block'>
      <ReactModal
        isOpen={ artOpen }
        style={{ content: { width : '80%', margin: 'auto', } }}
        onRequestClose={ () => setArtOpen(false) }
        shouldCloseOnOverlayClick={ true }
      >
        <div className='block-art'>
          { item.art && item.art.slice(-3) === 'mp4' ?
            <video controls autoPlay muted loop className='curation-art' onCanPlay={ () => didLoad(true) }>
              <source src={ `https://cdn.grants.art/${ item.art }` }
                      type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          :
          <img src={ `https://cdn.grants.art/${ item.art }` } className='curation-art' onLoad={ () => didLoad(true) } />
          }
          <br />
          <span className='flex text-grey center pointer text-m font' onClick={ () => setArtOpen(false) }>Close</span>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={ infoOpen }
        style={{ content: { width : '80%',  height: '50%', margin: 'auto', } }}
        onRequestClose={ () => setInfoOpen(false) }
        shouldCloseOnOverlayClick={ true }
      >
        <div className='block-art font'>
          <span className='text-m'>Statement of Intent</span><br />
          { item.statement }<br /><br />
          { item.additional &&
            <div>
              <span className='text-m'>Additional Info</span><br />
              { item.additional }
            </div>
          }
          <br />
          <span className='flex text-grey center pointer text-m font' onClick={ () => setInfoOpen(false) }>Close</span>
        </div>
      </ReactModal>
      <div className='block-art'>
        { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
        { item.art && item.art.slice(-3) === 'mp4' ?
          <video controls autoPlay muted loop className='block-art-image pointer' onCanPlay={ () => didLoad(true) } onClick={ () => setArtOpen(true) }>
            <source src={ `https://cdn.grants.art/${ item.art }` }
                    type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
         :
         <img src={ `https://cdn.grants.art/${ item.art }` } className='block-art-image pointer' onLoad={ () => didLoad(true) } onClick={ () => setArtOpen(true) } />
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
                <span className='pointer text-grey' onClick={ () => setInfoOpen(true) }>Statement of Intent</span>
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
