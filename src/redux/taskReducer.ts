import type { ITask } from "../types";
import type { IAction } from "./taskAction";

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

export default function taskReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case "CREATE_TASK":
            return { ...state, tasks: [action.payload, ...state.tasks] };
        case "EDIT_TASK":
            return {
                ...state,
                tasks: state.tasks.map((e) =>
                    e.id === action.payload.id ? action.payload : e,
                ),
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((e) => e.id !== action.payload),
            };
        case "FETCH_TASK":
            return {
                ...state,
                tasks: [...action.payload],
            };
        default:
            return state;
    }
}
