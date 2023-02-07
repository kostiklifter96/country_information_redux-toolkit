import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadNeighborsBorder, selectNeighbors } from "./details_slice";

export const useNeighbors = (borders = []) => {
    const dispatch = useDispatch();
    const neighbors = useSelector(selectNeighbors);

    useEffect(() => {
        if (borders.length) {
            dispatch(loadNeighborsBorder(borders));
        }
    }, [borders, dispatch]);

    return neighbors;
};
