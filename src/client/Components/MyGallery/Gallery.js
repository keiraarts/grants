import React, { useState, useRef, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import {
  usePositioner,
  useResizeObserver,
  useContainerPosition,
  MasonryScroller
} from "masonic";
import { useWindowSize } from "@react-hook/window-size";

import '../../styles.scss';

export default function Collection({ nfts, add }) {
  const cols = useStoreState(state => state.app.cols);
  const containerRef = useRef(null);

  const [windowWidth, windowHeight] = useWindowSize();

  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight
  ]);
  const positioner = usePositioner(
    { width, columnWidth: 300, columnGutter: 20, columnCount: Number(cols) },
    [nfts]
  );
  const resizeObserver = useResizeObserver(positioner);

  return (
    <div ref={ containerRef }>
      <MasonryScroller
        positioner={ positioner }
        resizeObserver={ resizeObserver }
        containerRef={ containerRef }
        items={ nfts }
        height={ windowHeight }
        offset={ offset }
        overscanBy={ 1 }
        render={ add ? addNFT : NFT }
      />
    </div>
  );
}

const addNFT = ({ data, index, width }) => {
  return (
    <div key={ index }>
      <div className='gallery-block' style={{ width }}>
      { (data.imageType === 'mp4' || data.imageType === 'mov') ?
        <video muted loop webkit-playsinline='true' playsInline preload='none' className='block-art-image'>
            <source src={ data.image }
                    type={ `video/${ data.imageType }` } />
            Sorry, your browser doesn't support embedded videos.
          </video>
        :
        <img src={ data.image } className='block-art-image' />
      }
      </div>
      <div className='flex'>
        <div className='small-button flex-full' onClick={ () => data.addToGallery(data) }>
          Add to Gallery
        </div>
      </div>
    </div>
  );
};

function openLink(page)
{
  console.log('OPENING', page);
  let win = window.open(page, '_blank');
  win.focus();
}

const NFT = ({ data, index, width }) => {
  const video = useRef();
  const [info, showInfo] = useState(false);
  const tap = () => {
    showInfo(!info);
    if (video.current) video.current.play();
  }

  const [isFullScreen, setFullScreen] = useState(false);
  function fullScreen() {
    if (video.current) {
      video.current.muted = false;
      if (video.current.requestFullScreen) {
        video.current.requestFullScreen();
      } else if (video.current.webkitRequestFullScreen) {
        video.current.webkitRequestFullScreen();
      } else if (video.current.mozRequestFullScreen) {
        video.current.mozRequestFullScreen();
      } else if (video.current.msRequestFullscreen) {
        video.current.msRequestFullscreen();
      } else if (video.current.webkitEnterFullscreen) {
        video.current.webkitEnterFullscreen(); //for iphone this code worked
      }
    } else {
      if (document.documentElement.requestFullScreen) {
        if (isFullScreen) document.exitFullscreen();
        else document.documentElement.requestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        if (isFullScreen) document.webkitExitFullscreen();
        else document.documentElement.webkitRequestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        if (isFullScreen) document.mozExitFullscreen();
        else document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.msRequestFullscreen) {
        if (isFullScreen) document.msExitFullscreen();
        else document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.webkitEnterFullscreen) {
        if (isFullScreen) document.webkitExitFullscreen();
        else document.documentElement.webkitEnterFullscreen()
      }

      setFullScreen(!isFullScreen);
    }
  }

  useEffect(() => {
    document.addEventListener('webkitfullscreenchange', (event) => {
      if (!document.webkitIsFullScreen) {
        setFullScreen(false);
        if (video.current) {
          setTimeout(() => {
            video.current.play();
          });
        }
      } else setFullScreen(true);
    });

    return () => {
      document.removeEventListener('fullscreenchange', () => {});
    }
  }, [])

  return (
    <div key={ index } className='gallery-info-container'>
      { info &&
        <div className='flex' onClick={ () => tap() }>
          <div className='text-s gallery-info center v-center'>
            <div>
              <div>{ data.name }</div>
              <div className='margin-top-s text-xs'>
                { data.description }
              </div>
              <div className='margin-top-s pointer' onClick={ () => openLink(data.opensea) }>
                View Original
              </div>
            </div>
          </div>
        </div>
      }
      <div className='gallery-block' style={{ width }} onClick={ () => tap() }>
      { (data.imageType === 'mp4' || data.imageType === 'mov') ?
        <video muted loop webkit-playsinline='true' playsInline preload='none' className='block-art-image' poster={ data.poster } ref={ video }>
            <source src={ data.image }
                    type={ `video/${ data.imageType }` } />
            Sorry, your browser doesn't support embedded videos.
          </video>
        :
        <img src={ data.image } className='block-art-image' />
      }
      </div>
    </div>
  );
};