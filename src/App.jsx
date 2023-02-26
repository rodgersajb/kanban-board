import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import uuid from "react-uuid";

function App() {
  // toDos variable with uuid
  const toDos = [
    { id: uuid(), content: "Work Out" },
    { id: uuid(), content: "Cook/Order Dinner" },
    { id: uuid(), content: "Throw on some Pink Floyd/Start Coding" },
    { id: uuid(), content: "Walk the Dog" },
    { id: uuid(), content: "Watch Netflix" },
  ];

  // tasks variable with uuid, name and reference to toDos variable

  const tasks = {
    [uuid()]: {
      name: "To Do",
      items: toDos,
    },
    [uuid()]: {
      name: "In Progress",
      items: [],
    },
    [uuid()]: {
      name: "Done",
      items: [],
    },
  };
  const [columns, setColumns] = useState(tasks);
  // Create three cards: To Do, In Progress, and Done.
  // Display grid for the cards
  //for Each card, have tasks displayed that can be moved around based on what card it applies to
  // Each card organized into components once dnd is working

  // list taskTtems, blank for now

  const onDragEnd = (result, columns, setColumns) => {
    // if statement determines if a draggable item did not change indexes, do nothing
    if (!result.destination) return;

    const { source, destination } = result;
    // if the droppable source id does not equal droppable destination id, let's do this:
    // capture the droppableId of the columns' destination and source droppableIds into variables
    //create a copy of the variables
    // splice the copied variable containing tge columns' source droppableId starting at the index, deleting the first item
    // splice the variable containing the destinations's droppleId starting at the index, deleting the first item and adding the deleted item from the previous splice method
    if (source.droppableId !== destination.droppableId) {
      const columnSource = columns[source.droppableId];
      const columnDestination = columns[destination.droppableId];
      const sourceItems = [...columnSource.items];
      const destinationItems = [...columnDestination.items];
      const removed = sourceItems.splice(source.index, 1)[0];
      destinationItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columnSource,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...columnDestination,
          items: destinationItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      console.log(column, "column");
      const copiedItems = [...column.items];
      const removed = copiedItems.splice(source.index, 1)[0];
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <>
      <h1>Kanban Board</h1>
      <div className="flex-container">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div className="ul-flex" key={id}>
                <h2>{column.name}</h2>

                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#7aa095"
                            : "#AFBC88",
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      minHeight: "60px",
                                      font: "24px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#98C9A3 "
                                        : "#BFD8BD",
                                      color: "#77bfa3",

                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </li>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
