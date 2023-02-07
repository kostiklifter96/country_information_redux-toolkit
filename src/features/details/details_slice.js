import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCounrtyByName = createAsyncThunk(
    "@@details/load-country-by-name",
    (name, { extra: { client, api } }) => {
        return client.get(api.searchByCountry(name));
    },
);

export const loadNeighborsBorder = createAsyncThunk(
    "@@details/load-neighbors",
    (borders, { extra: { client, api } }) => {
        return client.get(api.filterByCode(borders));
    },
);

const initialState = {
    currentCountry: null,
    status: "idle",
    error: null,
    neighbors: [],
};

const detaisSlice = createSlice({
    name: "@@details",
    initialState,
    reducers: {
        clearDetails: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCounrtyByName.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loadCounrtyByName.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || action.error.message;
            })
            .addCase(loadCounrtyByName.fulfilled, (state, action) => {
                state.status = "idle";
                state.currentCountry = action.payload.data[0]; //.data[0] нюанс работы axios
            })

            .addCase(loadNeighborsBorder.fulfilled, (state, action) => {
                state.neighbors = action.payload.data.map(
                    (country) => country.name,
                );
            });
    },
});

export const { clearDetails } = detaisSlice.actions;
export const detailsReducer = detaisSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
