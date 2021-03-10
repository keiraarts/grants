import React, { useState } from 'react';
import Twitter from '../assets/twitter.png';
import Instagram from '../assets/instagram.png';
import Web from '../assets/website.png';
import Flag from '../assets/flag.png';
import Flagged from '../assets/flagged.png';
import ReactModal from 'react-modal';

import '../styles.scss';

export default function Gallery(props) {
  const [loaded, didLoad] = useState(false);
  const item = props.item;

  const [artOpen, setArtOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [flagOpen, setFlagOpen] = React.useState(false);

  const [flagData, setFlagData] = useState('');

  function openLink(page)
  {
    console.log(page);
    page = page.replace('@', '');
    if (item.twitter.substring(0, 3) === 'www') page = `https://${ page }`
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='gallery-block'>
      <ReactModal
        isOpen={ artOpen }
        style={{ content: { margin: 'auto', } }}
        onRequestClose={ () => setArtOpen(false) }
        shouldCloseOnOverlayClick={ true }
        ariaHideApp={ false }
      >
        <div className='block-art'>
          { item.art && item.art.slice(-3) === 'mp4' ?
            <video controls muted webkit-playsinline='true' playsInline loop className='curation-art' onCanPlay={ () => didLoad(true) }>
              <source src={ `https://cdn.grants.art/${ item.art }` }
                      type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          :
          <img src={ `https://cdn.grants.art/${ item.art }` } className='curation-art' onLoad={ () => didLoad(true) } />
          }
          <br />
          <span className='flex text-grey center pointer text-m font' onClick={ () => setArtOpen(false) }>Close</span>
          <br />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={ infoOpen }
        style={{ content: { height: '50%', margin: 'auto', } }}
        onRequestClose={ () => setInfoOpen(false) }
        shouldCloseOnOverlayClick={ true }
        ariaHideApp={ false }
      >
        <div className='font flex-v full-height'>
          <div className='flex-full'>
            <span className='text-m'>Statement of Intent</span><br />
            { item.statement }<br /><br />
            { item.additional &&
              <div>
                <span className='text-m'>Additional Info</span><br />
                { item.additional }
              </div>
            }
            <br />
          </div>
          <span className='flex text-grey center pointer text-m font' onClick={ () => setInfoOpen(false) }>Close</span>
          <br />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={ flagOpen }
        style={{ content: { width : '50%',  height: '80%', margin: 'auto', } }}
        onRequestClose={ () => setFlagOpen(false) }
        shouldCloseOnOverlayClick={ true }
        ariaHideApp={ false }
      >
        <div className='font flex-v full-height'>
          <div className='flex-full'>
            <span className='text-m'>Raise an Issue</span>
            <div className='form__group full-width field'>
              <textarea type='text' className='form__field intent-field' placeholder='Email' name='email' id='name' maxLength='2000' onChange={e => setFlagData(e.target.value) } />
              <label className='form__label'>Optional Information</label>
            </div>
            <div className='approve-block' onClick={ () => { props.submitFlag({ id: item.id, message: flagData, type: 'Already Minted' }, props.index); setFlagOpen(false) } }>
              Already Minted
            </div>
            <div className='approve-block' onClick={ () => { props.submitFlag({ id: item.id, message: flagData, type: 'Artwork Issue' }, props.index); setFlagOpen(false) } }>
              Issue with Artwork
            </div>
            <div className='approve-block' onClick={ () => { props.submitFlag({ id: item.id, message: flagData, type: 'Other' }, props.index); setFlagOpen(false) } }>
              Other
            </div>
            <br /><br />
            { (item.flagged && item.flagged.length) ?
              <div>
                Flags:
                {
                  item.flagged.map((flagged, index) => {
                    return (
                      <div>
                        <span className='text-grey pointer' onClick={ () => { props.removeFlag({ id: item.id, flagId: flagged._id }, props.index); setFlagOpen(false) }}>X&nbsp;&nbsp;</span>
                        { flagged.type }{ flagged.message ? ` - ${ flagged.message }` : '' }
                      </div>
                    )
                  })
                }
                <br />
              </div>
              :
              <></>
            }
          </div>
          <span className='flex text-grey center pointer text-m font' onClick={ () => setFlagOpen(false) }>Close</span>
        </div>
      </ReactModal>
      <div className='block-art'>
        { (!loaded) && <div className='block-loading'><div className='loading'><div></div><div></div></div></div> }
        { (item.art && !item.thumbnail && item.art.slice(-3) === 'mp4') ?
          <video controls webkit-playsinline='true' playsInline muted loop className='block-art-image pointer' onCanPlay={ () => didLoad(true) } onClick={ () => setArtOpen(true) }>
            <source src={ `https://cdn.grants.art/${ item.art }` }
                    type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
         :
         <img src={ `https://cdn.grants.art/${ item.thumbnail || item.art }` } className='block-art-image pointer' onLoad={ () => didLoad(true) } onClick={ () => setArtOpen(true) } />
        }
      </div>
      <div className='text-s'>
        <div className='flex'>
          <div className='flex-full text-left'>
            <div className='block-info'>
              <div className='flex-full'>
                <strong>{ item.name }</strong><br />
                <span className='text-xs'>{ item.city && `${ item.city }, ` }{ item.country }</span><br />
                <span className='text-xs'>{ item.email }</span>
              </div>
              <div className='block-market'>
                <span className='pointer text-grey' onClick={ () => setInfoOpen(true) }>Statement of Intent</span>
              </div>
            </div>
          </div>
          <div>
            { (item.external || item.website) && <div><img src={ Web } className='block-social-web pointer' alt='Website' onClick={ () => openLink(item.external || item.website) } /></div> }
            { item.twitter && <div><img src={ Twitter } className='block-social' alt='Twitter' onClick={ () => openLink(item.twitter.substring(0, 4) === 'http' || item.twitter.substring(0, 3) === 'www' ? item.twitter : `https://twitter.com/${ item.twitter }`) } /></div> }
            { item.instagram && <div><img src={ Instagram } className='block-social' alt='Instagram' onClick={ () => openLink(item.instagram.substring(0, 4) === 'http' || item.twitter.substring(0, 3) === 'www' ? item.instagram : `https://instagram.com/${ item.instagram }`) } /></div> }
            <div><img src={ (item.flagged && item.flagged.length) ? Flagged : Flag } className='block-flag' alt='Flag' onClick={ () => setFlagOpen(true) } /></div>
          </div>
        </div>
        { props.viewTab === 'results' ?
          <div className='margin-top-s'>
            Approvals: { item.approvalCount }<br />
            { item.user && 'Missing Registration' }
          </div>
        :
          <div className='approve-block' onClick={ () => {
            if (props.viewTab === 'unapproved' || props.viewTab === 'approved') props.setApproval({ id: item.id }, props.index);
            else props.setRejection({ id: item.id }, props.index);
          } }>
            { (props.viewTab === 'unapproved') && 'Approve' }
            { (props.viewTab === 'approved') && 'Unapprove' }
            { (props.viewTab === 'rejected') && 'Unreject' }
          </div>
        }
        { props.viewTab === 'unapproved' &&
          <div className='approve-block' onClick={ () => props.setRejection({ id: item.id }, props.index) }>
            Reject
          </div>
        }
      </div>
    </div>
  );
}
