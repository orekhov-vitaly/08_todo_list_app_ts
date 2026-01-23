import type { Theme } from "../types";
import type { IThemeAction } from "./themeAction";

interface IThemeState {
    theme: Theme;
}

function loadFromLocalStorage(): Theme {
    try {
        const raw = localStorage.getItem("theme");
        if (raw as Theme) {
            return raw as Theme;
        }
        return "light";
    } catch {
        return "light";
    }
}

const initialState: IThemeState = {
    theme: loadFromLocalStorage(),
};

export default function themeReducer(state = initialState, action: IThemeAction) {
    switch (action.type) {
        case "SET_THEME":
            return { ...state, theme: action.payload };
        default:
            return state;
    }
}
