import * as O from "optics-ts";
import { createAction, createReducer } from "@reduxjs/toolkit";

export type TodoId = number;

export interface Todo {
  id: TodoId;
  deadline: Date;
  task: string;
}

const optic = O.optic<Todo>();

const updateTask = createAction<string>("todo/updateTask");
const updateDeadline = createAction<Date>("todo/updateDeadline");

export type Actions = typeof updateTask | typeof updateDeadline;

export const todoById = (id: TodoId) => O.optic<Todo[]>().find(t => t.id === id);
