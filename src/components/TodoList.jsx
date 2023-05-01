import React from "react";
import styled from "styled-components";

export const TodoList = ({ todo, deleteHandler }) => {
  return (
    <Ul>
      {todo.map((item) => {
        return (
          <>
            <Li key={item.id}>
              {item.title}
              <button onClick={() => deleteHandler(item.id)}>delete</button>
            </Li>
          </>
        );
      })}
    </Ul>
  );
};

const Ul = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
const Li = styled.li`
  width: 50vw;
  height: 5vh;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 0px 10px;
`;
