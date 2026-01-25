import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Theme } from "../types";

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

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeAction(state, action: PayloadAction<Theme>) {
            state.theme = action.payload;
        },
    },
});

export const { setThemeAction } = themeSlice.actions;
export default themeSlice.reducer;
