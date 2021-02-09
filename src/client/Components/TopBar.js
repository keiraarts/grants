import React from 'react';
import { useStore, useAction } from 'easy-peasy';

import CueLogo from '../assets/logo.png';
import Discord from '../assets/discord.png';
import Reddit from '../assets/reddit.png';
import Mixcloud from '../assets/mixcloud.png';
import Twitter from '../assets/twitter.png';
import { FaShareSquare as ShareIcon } from 'react-icons/fa';
import TimeLeft from './TimeLeft';

export default function TopBar(props) {
  const { data } = props;
  const mobile = useStore(state => state.player.mobile);
  const liveState = useStore(state => state.player.liveState);
  const setModalState = useAction(dispatch => dispatch.player.setModalState);
  const user = useStore(state => state.player.user) || {};

  function openLink(page)
  {
    let win;
    if (page === 'reddit') {
      win = window.open('https://reddit.com/r/cuemusic', '_blank');
    } else if (page === 'mixcloud') {
      win = window.open('https://mixcloud.com/cuemusicmixes/', '_blank');
    } else if (page === 'discord') {
      win = window.open('https://discordapp.com/invite/dVQxD3G', '_blank');
    } else if (page === 'twitter') {
      win = window.open('https://twitter.com/cuelivemusic', '_blank');
    }

    win.focus();
  }

  function openCUE()
  {
    let win;
    if (data.room) {
      win = window.open(`https://${ window.location.hostname }`, '_blank');
    } else {
      win = window.open(`https://${ window.location.hostname }/ref?id=${ data.user._id }`, '_blank');
    }

    win.focus();
  }

  return (
    <div className={ mobile ? 'top-bar-mobile' : 'top-bar' }>
      <img
        src={ CueLogo }
        className='cue-logo'
        style={{ marginLeft: mobile ? '0rem' : '0.5rem' }}
        alt='CUE'
        onTouchEnd={ () => openCUE() }
        onMouseUp={ () => openCUE() }
      />
      <div className={ mobile ? 'social-bar-mobile' : 'social-bar' }>
        <img src={ Reddit } className='social-logo reddit' alt='Reddit' onClick={ () => openLink('reddit') } />
        <img src={ Mixcloud } className='social-logo mixcloud' alt='Mixcloud' onClick={ () => openLink('mixcloud') } />
        <img src={ Discord } className='social-logo discord' alt='Discord' onClick={ () => openLink('discord') } />
        <img src={ Twitter } className='social-logo twitter' alt='Twitter' onClick={ () => openLink('twitter') } />
        <ShareIcon className='social-logo share' onClick={ () => setModalState('share') }/>
      </div>
      { (liveState === 'live' || user.live) &&
        <TimeLeft />
      }
    </div>
  );
}
