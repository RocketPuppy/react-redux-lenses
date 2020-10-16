import * as O from "optics-ts";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { TodoId } from "./todo";

export interface Checklist {
  todo: TodoId[];
  done: TodoId[];
}

const optic = O.optic<Checklist>();

const finishTodo = createAction<TodoId>("checklist/finish-todo");
const unfinishTodo = createAction<TodoId>("checklist/unfinish-todo");
const addTodo = createAction<TodoId>("checklist/add-todo");

export type Actions = typeof finishTodo | typeof unfinishTodo | typeof addTodo;
