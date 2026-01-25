import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../types";

interface IUserState {
    users: IUser[];
}

function loadFromLocalStorage() {
    try {
        const raw = localStorage.getItem("users");
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed;
    } catch {
        return [];
    }
}
const initialState: IUserState = {
    users: loadFromLocalStorage(),
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUserAction(state, action: PayloadAction<IUser>) {
            state.users.push(action.payload);
        },
        getUserListAction(state, action: PayloadAction<IUser[]>) {
            state.users = action.payload;
        },
        editUserAction(state, action: PayloadAction<IUser>) {
            state.users = state.users.map((e) =>
                e.id === action.payload.id ? action.payload : e,
            );
        },
        deleteUserAction(state, action: PayloadAction<string>) {
            state.users = state.users.filter((e) => e.id !== action.payload);
        },
    },
});

export const {
    addUserAction,
    getUserListAction,
    editUserAction,
    deleteUserAction,
} = usersSlice.actions;
export default usersSlice.reducer;
