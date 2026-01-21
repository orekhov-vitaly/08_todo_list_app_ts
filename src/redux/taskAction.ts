import type { ITask } from "../types";

export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CREATE_TASK = "CREATE_TASK";
export const FETCH_TASK = "FETCH_TASK";

export const createTask = (newTask: ITask): IAction => ({
    type: CREATE_TASK,
    payload: newTask,
});
export const editTask = (newTask: ITask): IAction => ({
    type: EDIT_TASK,
    payload: newTask,
});
export const deleteTask = (id: string): IAction => ({ type: DELETE_TASK, payload: id });
export const fetchTask = (taskList: ITask[]): IAction => ({
    type: FETCH_TASK,
    payload: taskList,
});

export type IAction =
    | { type: "CREATE_TASK"; payload: ITask }
    | { type: "EDIT_TASK"; payload: ITask }
    | { type: "DELETE_TASK"; payload: string }
    | { type: "FETCH_TASK"; payload: ITask[] };
