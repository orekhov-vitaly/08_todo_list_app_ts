import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask } from "../types";

interface ITaskState {
    tasks: ITask[];
}

function loadFromLocalStorage() {
    try {
        const raw = localStorage.getItem("tasks");
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
const initialState: ITaskState = {
    tasks: loadFromLocalStorage(),
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTaskAction(state, action: PayloadAction<ITask>) {
            state.tasks.push(action.payload);
        },
        getTaskListAction(state, action: PayloadAction<ITask[]>) {
            state.tasks = action.payload;
        },
        editTaskAction(state, action: PayloadAction<ITask>) {
            state.tasks = state.tasks.map((e) =>
                e.id === action.payload.id ? action.payload : e,
            );
        },
        deleteTaskAction(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter((e) => e.id !== action.payload);
        },
    },
});

export const {
    addTaskAction,
    getTaskListAction,
    editTaskAction,
    deleteTaskAction,
} = tasksSlice.actions;
export default tasksSlice.reducer;
