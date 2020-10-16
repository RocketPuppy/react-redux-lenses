import { Checklist } from "./checklist";
import { Todo, TodoId } from "./todo";
import * as O from "optics-ts";
import * as R from "redux-consumer-toolkit";

export interface State {
  checklist: Checklist;
  todos: Todo[];
  nextId: TodoId;
};

export const defaultState: State = {
  checklist: {
    done: [1],
    todo: [2],
  },
  todos: [{ id: 1, task: "Done-it", deadline: new Date() }, { id: 2, task: "Todo-it", deadline: new Date() }],
  nextId: 3,
};

const nullAction = { type: "null" };

type Actions = typeof nullAction;

export const reducer : R.Consumer<Actions, State | undefined, State> =
  R.mapIn((t: State | undefined) => t === undefined ? defaultState : t, R.identity);

export const state = O.optic<State>()
export const checklist = state.prop("checklist");
export const todos = state.prop("todos");
