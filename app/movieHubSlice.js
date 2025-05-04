import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHomePageData = createAsyncThunk(
    "movieHub/fetchHomePageData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://${import.meta.env.VITE_API_1_HOST}/imdb/top-box-office`,
                {
                    headers: {
                        "x-rapidapi-key":
                            import.meta.env.VITE_API_1_KEY,
                        "x-rapidapi-host": import.meta.env.VITE_API_1_HOST,
                    },
                }
            );
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchMovieDetails = createAsyncThunk(
    "movieHub/fetchMovieDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://${import.meta.env.VITE_API_1_HOST}/imdb/${id}`, {
                headers: {
                    "x-rapidapi-key":
                        import.meta.env.VITE_API_1_KEY,
                    "x-rapidapi-host": import.meta.env.VITE_API_1_HOST,
                },
            })
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchTmdbId = createAsyncThunk(
    "movieHub/fetchTmdbId",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://${import.meta.env.VITE_API_1_HOST}/imdb/${id}/tmdb-id`, {
                headers: {
                    "x-rapidapi-key":
                        import.meta.env.VITE_API_1_KEY,
                    "x-rapidapi-host": import.meta.env.VITE_API_1_HOST,
                },
            })
            return response.data.tmdbId
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchMovieUrl = createAsyncThunk(
    "movieHub/fetchMovieUrl",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `https://${import.meta.env.VITE_API_2_HOST}/api.php`,
                {
                    type: 'movie',
                    id: id,
                },
                {
                    headers: {
                        'x-rapidapi-key': import.meta.env.VITE_API_2_KEY,
                        'x-rapidapi-host': import.meta.env.VITE_API_2_HOST,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.url;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchSearchResults = createAsyncThunk(
    "movieHub/fetchSearchResults",
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://${import.meta.env.VITE_API_1_HOST}/imdb/search`, {
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_API_1_KEY,
                    'x-rapidapi-host': import.meta.env.VITE_API_1_HOST
                },
                params: {
                    originalTitle: query,
                    type: 'movie',
                    rows: '25',
                    sortOrder: 'ASC',
                    sortField: 'id'
                }
            })
            //console.log(response)
            return response.data.results
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

const movieHubSlice = createSlice({
    name: "movieHub",
    initialState: {
        homePageData: [],
        movieDetails: {},
        loading: true,
        error: null,
        tmdbId: null,
        movieUrl: null,
        searchResults: [],
        watchListItems: []
    },
    reducers: {
        addToWatchList: (state, action) => {
            state.watchListItems.push(action.payload)
        },
        clearWatchList: state => {
            state.watchListItems = []
        },
        removeFromWatchList: (state, action) => {
            state.watchListItems = state.watchListItems.filter(item => item.id !== action.payload.id)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchHomePageData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomePageData.fulfilled, (state, action) => {
                state.homePageData = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchHomePageData.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
                state.homePageData = []
            })
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.movieDetails = action.payload
                //console.log(action.payload)
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.movieDetails = {}
            })
            .addCase(fetchTmdbId.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTmdbId.fulfilled, (state, action) => {
                state.tmdbId = action.payload
            })
            .addCase(fetchTmdbId.rejected, (state, action) => {
                state.tmdbId = null
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchMovieUrl.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMovieUrl.fulfilled, (state, action) => {
                state.movieUrl = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchMovieUrl.rejected, (state, action) => {
                state.movieUrl = null
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.searchResults = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.searchResults = []
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { addToWatchList, clearWatchList, removeFromWatchList } = movieHubSlice.actions

export default movieHubSlice.reducer

