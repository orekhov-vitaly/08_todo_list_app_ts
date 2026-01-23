import type { IUser } from "../types";
import type { IUserAction } from "./userAction";

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

export default function userReducer(state = initialState, action: IUserAction) {
    switch (action.type) {
        case "CREATE_USER":
            return { ...state, users: [action.payload, ...state.users] };
        case "EDIT_USER":
            return {
                ...state,
                users: state.users.map((e) =>
                    e.id === action.payload.id ? action.payload : e,
                ),
            };
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter((e) => e.id !== action.payload),
            };
        case "FETCH_USER":
            return {
                ...state,
                users: [...action.payload],
            };
        default:
            return state;
    }
}
