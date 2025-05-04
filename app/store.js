import { configureStore } from "@reduxjs/toolkit";
import movieHubReducer from "../app/movieHubSlice.js"

export const store = configureStore({
    reducer: {
        movieHub: movieHubReducer
    }
})

