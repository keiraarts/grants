import React, { useState, useEffect, useRef } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import '@appnest/masonry-layout';

import DecidedBlock from './DecidedBlock';
import '../../styles.scss';

export default function ArtList({ list, type, undo, blind, contentRef, cols }) {
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    if (list) setShowData(list.slice(0, 30));
  }, [list])

  useScrollPosition(({ currPos }) => {
    if ((currPos.y + 1500 > contentRef.current.offsetHeight)) {
      setShowData(list.slice(0, showData.length + 30))
    }
  }, [showData], null, true);

  return (
    <div className='cols'>
      { (showData) ?
        <React.Fragment key={ showData.length }>
          <masonry-layout cols={ cols }>
            { showData.map((item, index) => {
                return (<DecidedBlock key={ index } nft={ item } undo={ undo ? () => undo(item.id, type) : undefined } blind={ blind } type={ type } />);
            }) }
          </masonry-layout>
        </React.Fragment>
        :
        <div><em>No submissions to show</em></div>
      }
    </div>
  );
}
