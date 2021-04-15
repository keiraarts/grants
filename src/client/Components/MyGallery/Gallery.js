import React, { useRef } from 'react';
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
    <div>
      <div className='gallery-block' key={ index } style={{ width }}>
      { (data.imageType === 'mp4' || data.imageType === 'mov') ?
        <video muted loop autoPlay webkit-playsinline='true' playsInline preload='none' className='block-art-image' poster={ data.poster }>
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

const NFT = ({ data, index, width }) => {
  return (
    <div>
      <div className='gallery-block' key={ index } style={{ width }}>
      { (data.imageType === 'mp4' || data.imageType === 'mov') ?
        <video muted loop autoPlay webkit-playsinline='true' playsInline preload='none' className='block-art-image' poster={ data.poster }>
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