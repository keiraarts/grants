import React, { useState } from 'react';
import ReactModal from 'react-modal';
import ReactAutolinker from 'react-autolinker';

import Twitter from '../../assets/twitter.png';
import Instagram from '../../assets/instagram.png';
import Web from '../../assets/website.png';
import '../../styles.scss';

function openLink(page)
{
  page = page.replace('@', '');
  let win = window.open(page, '_blank');
  win.focus();
}


export default function DecidedBlock({ nft, undo, type, blind }) {
  const [loaded, didLoad] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const imageType = nft.artWeb.split('.')[1];

  return (
    <div className='margin-top-minus'>
      <ReactModal
        isOpen={ infoOpen }
        style={{ content: { margin: 'auto', width: '80%', height: '80%' } }}
        onRequestClose={ () => setInfoOpen(false) }
        shouldCloseOnOverlayClick={ true }
        ariaHideApp={ false }
      >
        <div className='white-space center'>
          <div className='text-s'>
            <div className='gallery-plate metal linear'>
              { !blind ?
                <div className='text-s'>
                  <strong>{ nft.user.artistName }</strong><br />
                  { nft.user.country } { nft.user.birthYear && `(b. ${ nft.user.birthYear })` }
                </div>
              :
                <div className='text-s'>
                  <strong>Artist Info Hidden</strong><br />
                </div>
              }
              <div className='margin-top-s text-s text-b'>
                <strong><i>{ nft.title || 'Untitled' }</i></strong>, 2021<br />
                { imageType.toUpperCase() } as NFT
              </div>
              <div className='margin-top-s text-xs'>
                { nft.description }
              </div>
            </div>
          </div>
          { !blind &&
            <div className='flex margin-top-s center'>
              { nft.user.website && <div><img src={ Web } className='account-social-web pointer' style={{ marginTop: '0.2rem' }} alt='Website' onClick={ () => openLink(nft.user.website) } /></div> }
              { nft.user.twitter && <div><img src={ Twitter } className='account-social pointer' alt='Twitter' onClick={ () => openLink(`https://twitter.com/${ nft.user.twitter }`) } /></div> }
              { nft.user.instagram && <div><img src={ Instagram } className='account-social pointer' alt='Instagram' onClick={ () => openLink(`https://instagram.com/${ nft.user.instagram }`) } /></div> }
            </div>
          }
          <div className='margin-top-s text-s'>
            <div className='text-m'>Statement of Intent</div>
            <ReactAutolinker text={ nft.statement } />
          </div>
          { nft.additional &&
            <div className='margin-top-s text-s'>
              <div className='text-m'>Additional Info</div>
              <ReactAutolinker text={ nft.additional } />
            </div>
          }
        </div>
      </ReactModal>
      <div className='gallery-block'>
        { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
        { imageType === 'mp4' ?
          <video muted loop autoPlay webkit-playsinline='true' playsInline preload='none' className='block-art-image' onCanPlay={ () => didLoad(true) }>
              <source src={ `https://cdn.grants.art/${ nft.artWeb }` }
                      type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          :
          <img src={ `https://cdn.grants.art/${ nft.artWeb }` } className='block-art-image' onLoad={ () => didLoad(true) } />
        }
      </div>
      <div className='flex'>
        { undo &&
          <div className='small-button flex-full' onClick={ () => undo(nft.id, type) }>
            Undo
          </div>
        }
        { undo && <div className='small-space' /> }
        <div className='small-button flex-full' onClick={ () => setInfoOpen(true) }>
          View Info
        </div>        
      </div>
    </div>
  );
}
