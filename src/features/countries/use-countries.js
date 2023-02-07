import { useDispatch, useSelector } from "react-redux";
import {
    selectVisibleCountries,
    selectCountriesInfo,
    loadCountry,
} from "./countries_slice";
import { useEffect } from "react";
import { selectAllControls } from "./../controls/control_slice";

export const useCountries = () => {
    const dispatch = useDispatch();
    const controls = useSelector(selectAllControls);
    const countries = useSelector((state) =>
        selectVisibleCountries(state, controls),
    );

    const { status, error, countryLength } = useSelector(selectCountriesInfo);

    useEffect(() => {
        if (!countryLength) {
            dispatch(loadCountry());
        }
    }, [countryLength, dispatch]);

    return [countries, { status, error, countryLength }];
};
