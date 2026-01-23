import { combineReducers, legacy_createStore } from "redux";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";
import themeReduer from "./themeReducer";

export const store = legacy_createStore(combineReducers({
    taskManager: taskReducer,
    userManager: userReducer,
    themeManager: themeReduer,
}))

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;