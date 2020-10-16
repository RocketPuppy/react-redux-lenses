import React from 'react';
import { ConnectedProps, connect } from "react-redux";
import * as R from "redux-consumer-toolkit";
import * as O from "optics-ts";
import { Checklist } from "./ducks/checklist";
import { Todo as TodoT } from "./ducks/todo";
import { State, checklist } from "./ducks";
import Todo from "./Todo";

interface Props {
  todo: TodoT[];
  done: TodoT[];
}

const selector : R.Consumer<{}, State, Checklist> = R.map(O.get(checklist), R.identity);
const connector = connect(selector);

const ChecklistC = ({ todo, done }: ConnectedProps<typeof connector>) => (
  <div>
    <div>
      <h1>Todo</h1>
      {todo.map(id => (
        <Todo id={id} />
      ))}
    </div>
    <div>
      <h1>Done</h1>
      {done.map(id => (
        <Todo id={id} />
      ))}
    </div>
  </div>
);

export default connector(ChecklistC);
