import { combineReducers, legacy_createStore } from "redux";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";

export const store = legacy_createStore(combineReducers({
    taskManager: taskReducer,
    userManager: userReducer,
}))

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;