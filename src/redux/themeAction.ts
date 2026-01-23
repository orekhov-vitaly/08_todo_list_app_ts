import type { Theme } from "../types";

export const SET_THEME = "SET_THEME";

export const setTheme = (theme: Theme): IAction => ({
    type: SET_THEME,
    payload: theme,
});

export type IAction = { type: typeof SET_THEME; payload: Theme };
