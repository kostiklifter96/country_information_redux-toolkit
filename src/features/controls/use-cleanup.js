import { useDispatch } from "react-redux";
import { clearControls } from "./control_slice";

export const useCleanUp = () => {
    const dispatch = useDispatch();

    const cleanUp = () => dispatch(clearControls());

    return cleanUp;
};
