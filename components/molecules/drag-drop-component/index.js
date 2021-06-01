import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reOrder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// const getItemStyle = (isDragging, draggableStyle) => ({
//   ...
//   ...draggableStyle
// });

// const getListStyle = isDraggingOver => ({
// ...
// });

export default function DragDropComponent({
  items = [],
  actionUpdate,
  itemsStyle,
  listStyle
}) {

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    const newItems = reOrder(items, sourceIndex, destinationIndex);
    actionUpdate(newItems);
  }
  return <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId='droppable' >
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={listStyle(snapshot.isDraggingOver)}
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  className="react-dnd-element"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={itemsStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
}