import type { IUser } from "../types";

export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const CREATE_USER = "CREATE_USER";
export const FETCH_USER = "FETCH_USER";

export const createUser = (newUser: IUser): IAction => ({
    type: CREATE_USER,
    payload: newUser,
});
export const editUser = (newUser: IUser): IAction => ({
    type: EDIT_USER,
    payload: newUser,
});
export const deleteUser = (id: string): IAction => ({ type: DELETE_USER, payload: id });
export const fetchUser = (userList: IUser[]): IAction => ({
    type: FETCH_USER,
    payload: userList,
});

export type IAction =
    | { type: "CREATE_USER"; payload: IUser }
    | { type: "EDIT_USER"; payload: IUser }
    | { type: "DELETE_USER"; payload: string }
    | { type: "FETCH_USER"; payload: IUser[] };
