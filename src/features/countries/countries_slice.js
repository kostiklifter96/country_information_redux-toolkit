import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountry = createAsyncThunk(
    "@@countries/load-countries",
    async (_, { extra: { client, api }, rejectWithValue }) => {
        try {
            return client.get(api.ALL_COUNTRIES);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const initialState = {
    list: [],
    status: "idle", //*received | loading | rejected
    error: null,
};

const countrySlice = createSlice({
    name: "@@countries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCountry.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loadCountry.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message || action.payload;
            })
            .addCase(loadCountry.fulfilled, (state, action) => {
                state.status = "received";
                state.list = action.payload.data;
            });
    },
});

export const countryReducer = countrySlice.reducer;

export const selectCountriesInfo = (state) => ({
    status: state.countries.status,
    error: state.countries.error,
    countryLength: state.countries.list.length,
});

export const selectAllCountries = (state) => state.countries.list;

export const selectVisibleCountries = (state, { search = "", region = "" }) => {
    return state.countries.list.filter(
        (country) =>
            country.name.toLowerCase().includes(search.toLowerCase()) &&
            country.region.includes(region),
    );
};
