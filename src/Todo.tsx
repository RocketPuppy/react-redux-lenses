import React from 'react';
import { ConnectedProps, connect } from "react-redux";
import * as R from "redux-consumer-toolkit";
import * as O from "optics-ts";
import { Todo, TodoId, todoById } from "./ducks/todo";
import { State, todos } from "./ducks";

interface OwnProps {
  id: TodoId;
}

const allTodosById = (id: TodoId) => O.compose(todos, todoById(id));

const selector : R.Consumer<OwnProps, State, Todo> =
  (state: State, { id }: OwnProps) => O.collect(allTodosById(id))(state)[0];

const connector = connect(
  selector
);

const TodoC = ({ task, deadline }: ConnectedProps<typeof connector>) => (
  <p>{task} due on <time dateTime={deadline.toISOString()}>{deadline.toLocaleString()}</time></p>
);

export default connector(TodoC);
