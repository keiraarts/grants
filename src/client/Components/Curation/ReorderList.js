import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ReorderBlock from './ReorderBlock';
// import '../../styles.scss';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function ReorderList({ list, setNewOrder }) {
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    if (list) setShowData(list);
  }, [list])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      showData,
      result.source.index,
      result.destination.index
    );

    setNewOrder(items);
    setShowData(items);
  }

  return (
    <div className='rows'>
      { (showData) ?
        <DragDropContext onDragEnd={ onDragEnd }>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                { showData.map((item, index) => {
                    return (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className='reorder-block'>
                              <ReorderBlock key={ index } order={ index } nft={ item } />
                            </div>
                          </div>
                        )}
                      </Draggable>

                    );
                }) }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      :
        <div><em>No submissions to show</em></div>
      }
    </div>
  );
}
