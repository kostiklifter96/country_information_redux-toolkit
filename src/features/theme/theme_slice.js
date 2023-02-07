import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "@@theme",
    initialState: "dark",
    reducers: {
        setTheme: (_, action) => action.payload,
    },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
