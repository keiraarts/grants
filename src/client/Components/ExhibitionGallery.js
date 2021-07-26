import React, { useState, useRef } from 'react';
import { useStoreState } from 'easy-peasy';
import {
  usePositioner,
  useResizeObserver,
  useContainerPosition,
  MasonryScroller
} from "masonic";
import { useWindowSize } from "@react-hook/window-size";

export default function ExhibitionGallery({ nfts, url }) {
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

  nfts.forEach(nft => nft.url = url);

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
        render={ NFT }
      />
    </div>
  );
}

function openLink(page)
{
  let win = window.open(page, '_blank');
  win.focus();
}

const NFT = ({ data, index, width }) => {
  const video = useRef();
  const [info, showInfo] = useState(false);
  const tap = () => {
    showInfo(!info);
    // if (video.current && video.current.readyState > 3) video.current.play();
  }

  data.imageType = data.art.split('.')[1];

  return (
    <div key={ index } className='gallery-info-container'>
      { info &&
        <div className='flex' onClick={ () => tap() }>
          <div className='text-s gallery-info center v-center'>
            <div>
              <div>{ data.title }</div>
              <div className='margin-top-s text-xs'>
                { data.description }
              </div>
              <div className='margin-top-s pointer' onClick={ () => openLink(data.opensea) }>
                View on OpenSea
              </div>
            </div>
          </div>
        </div>
      }
      <a className='gallery-block' style={{ width }} href={ `/${ data.url }/${ data.order }` }>
      { (data.imageType === 'mp4' || data.imageType === 'mov') ?
        <video muted loop autoPlay webkit-playsinline='true' playsInline preload='none' className='block-art-image' ref={ video }>
            <source src={ `https://cdn.grants.art/${ data.artWeb }` }
                    type={ `video/${ data.imageType }` } />
            Sorry, your browser doesn't support embedded videos.
          </video>
        :
        <img src={ `https://cdn.grants.art/${ data.artWeb }` } className='block-art-image' />
      }
      </a>
    </div>
  );
};