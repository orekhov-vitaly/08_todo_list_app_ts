import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import tasksReducer from "./tasksSlice";
import usersReducer from "./usersSlice";

export const storeRTK = configureStore({
    reducer: {
        themeManager: themeReducer,
        tasksManager: tasksReducer,
        usersManager: usersReducer,
    },
});

export type RootStateRTK = ReturnType<typeof storeRTK.getState>;
export type AppDispatchRTK = typeof storeRTK.dispatch;
