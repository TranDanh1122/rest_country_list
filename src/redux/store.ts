import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./countrySlicer";
export const store = configureStore({
    reducer: {
        country: countryReducer
    }
})
export type AppState = ReturnType<typeof store.getState>
export type AppDisPatch = typeof store.dispatch 