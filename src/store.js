import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "./config";
import { controlsReducer } from "./features/controls/control_slice";
import { countryReducer } from "./features/countries/countries_slice";
import { detailsReducer } from "./features/details/details_slice";
import { themeReducer } from "./features/theme/theme_slice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        controls: controlsReducer,
        countries: countryReducer,
        details: detailsReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    client: axios,
                    api,
                },
            },
            serializableCheck: false,
        }),
});
