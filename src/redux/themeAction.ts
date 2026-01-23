import type { Theme } from "../types";

export const SET_THEME = "SET_THEME";

export const setTheme = (newTheme: Theme): IThemeAction => ({
    type: SET_THEME,
    payload: newTheme,
});

export type IThemeAction = { type: "SET_THEME"; payload: Theme };
