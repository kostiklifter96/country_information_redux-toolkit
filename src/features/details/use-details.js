import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
    clearDetails,
    loadCounrtyByName,
    selectDetails,
} from "./details_slice";

export const useDetails = (name) => {
    const dispatch = useDispatch();
    const details = useSelector(selectDetails);

    useEffect(() => {
        dispatch(loadCounrtyByName(name));

        return () => {
            dispatch(clearDetails());
        };
    }, [name, dispatch]);

    return details;
};
