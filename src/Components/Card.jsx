import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Card = (props) => {

    const {item, index} = props;
  return (
    <Draggable key={props.item.id} draggableId={props.item.id} index={props.index}>
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
              backgroundColor: snapshot.isDragging ? "#98C9A3 " : "#BFD8BD",
              color: "#77bfa3",

              ...provided.draggableProps.style,
            }}
          >
            {props.item.content}
          </li>
        );
      }}
    </Draggable>
  );
};

export default Card;
