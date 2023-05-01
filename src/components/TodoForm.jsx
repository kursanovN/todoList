import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { TodoList } from "./TodoList";

export const TYPES = {
  ADD: "ADD",
  DELETE: "DELETE",
  TITLE: "TITLE",
};

const initialState = {
  todos: JSON.parse(localStorage.getItem("todo")) || [],
  title: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TYPES.TITLE:
      return {
        ...state,
        title: [action.payload],
      };
    case TYPES.DELETE:
      return {
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
export const TodoForm = () => {
  const [state, dispacht] = useReducer(reducer, initialState);
  const changeHandler = (e) => {
    dispacht({ type: TYPES.TITLE, payload: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      title: state.title,
      id: v4(),
    };

    dispacht((state.title = ""));
    dispacht({ type: TYPES.ADD, payload: data });
  };

  const deleteHandler = (id) => {
    dispacht({ type: TYPES.DELETE, payload: id });
  };
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(state.todos));
  }, [state.todos]);
  return (
    <>
      <Form onSubmit={submitHandler}>
        <input type="text" value={state.title} onChange={changeHandler} />
        <button type="submit" disabled={!state.title}>
          add todo
        </button>
      </Form>
      <TodoList todo={state.todos} deleteHandler={deleteHandler} />
    </>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
