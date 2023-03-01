import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const CardList = (props) => {
  const { column, id } = props;
  return (
    <>
      <div className="ul-flex" key={props.id}>
        <h2>{props.column.name}</h2>

        <Droppable droppableId={id} key={id}>
          {(provided, snapshot) => {
            return (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "#7aa095" : "#AFBC88",
                }}
              >
                {column.items.map((item, index) => {
                  return <Card item={item} index={index} key={index} />;
                })}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
      </div>
    </>
  );
};

export default CardList;
