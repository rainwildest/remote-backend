// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";

const Layout = () => {
  const [fruitItems, setFruitItems] = useState([
    { id: "1", Title: "Apple" },
    { id: "2", Title: "Mango" },
    { id: "3", Title: "Peach" },
    { id: "4", Title: "Grapes" },
    { id: "5", Title: "BlueBerry" },
    { id: "6", Title: "StrawBerry" }
  ]);

  const [testItems, setTestItems] = useState([
    { id: "1-1", Title: "test-1" },
    { id: "1-2", Title: "test-2" },
    { id: "1-3", Title: "test-3" },
    { id: "1-4", Title: "test-4" },
    { id: "1-5", Title: "test-5" },
    { id: "1-6", Title: "test-6" }
  ]);

  const onDragEnd = result => {
    console.log(result);
    const newItems = Array.from(fruitItems);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setFruitItems(newItems);
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "lightblue",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "grey",
    padding: grid,
    width: 250
  });

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="11" isCombineEnabled={false}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex"
            >
              <Draggable draggableId="8888" index={0}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    ppp
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable
          type="COLUMN"
          direction="horizontal"
          droppableId="1"
          isCombineEnabled={false}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
              className="flex"
            >
              <Draggable draggableId="test" index={1}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <div className="h-10" {...provided.dragHandleProps}>
                      5555
                    </div>

                    <Droppable
                      droppableId="7"
                      // type="QUOTE"
                      ignoreContainerClipping={true}
                      isCombineEnabled={false}
                      renderClone={(provided, snapshot, descriptor) => {
                        console.log(provided);
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border border-solid border-red-800 !h-60 !w-60"
                          >
                            sdfsd
                          </div>
                        );
                      }}
                    >
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                          {fruitItems.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  {item.Title}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>

              <Draggable draggableId="test-1" index={2}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <div className="h-10" {...provided.dragHandleProps}>
                      666
                    </div>

                    <Droppable
                      droppableId="8"
                      // type="QUOTE"
                      isCombineEnabled={false}
                    >
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                          {testItems.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  {item.Title}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>

        {/* <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {fruitItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.Title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable> */}
      </DragDropContext>
      {/* <DndProvider backend={HTML5Backend}> */}
      {/* 拖拽容器 */}
      {/* <Container /> */}

      {/* 正在拖拽的项 */}
      {/* <DragLayer /> */}
      {/* </DndProvider> */}
    </div>
  );
};

export default Layout;
