import React, { useState, useEffect, useRef } from 'react';
import {
  usePositioner,
  useResizeObserver,
  useContainerPosition,
  MasonryScroller
} from "masonic";

import DecidedBlock from './DecidedBlock';
import { useWindowSize } from "@react-hook/window-size";
// import '../../styles.scss';

export default function ArtList({ list, type, undo, blind, contentRef, cols, metrics, user, finalScore }) {
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    if (list) {
      list.forEach(item => {
        item.undo = undo ? () => undo(item.id, type) : undefined;
        item.blind = blind;
        item.type = type;
        item.metrics = metrics;
        item.me = user;
        item.finalScore = finalScore;
      })

      setShowData(list);
    }
  }, [list])

  const containerRef = useRef(null);

  const [windowWidth, windowHeight] = useWindowSize();

  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight
  ]);

  const positioner = usePositioner(
    { width, columnWidth: 300, columnGutter: 20, columnCount: Number(cols) },
    [showData]
  );

  const resizeObserver = useResizeObserver(positioner);

  return (
    <div ref={ containerRef }>
      <MasonryScroller
        positioner={ positioner }
        resizeObserver={ resizeObserver }
        containerRef={ containerRef }
        items={ showData }
        height={ windowHeight }
        offset={ offset }
        overscanBy={ 1 }
        render={ DecidedBlock }
      />
    </div>
  );
}
