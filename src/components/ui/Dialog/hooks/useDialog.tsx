import { stateEnums } from "@context/reducer";
import { StateContext } from "@context/StateProvider";
import { useContext } from "react";

export const useHandleDialog = () => {
    const { state, dispatch } = useContext(StateContext);
    const { showDialog } = state;

    const handleDialogClick = (content: JSX.Element | null) => {
        dispatch({
            type: stateEnums.SHOW_DIALOG,
            payload: !showDialog
        });
        dispatch({
            type: stateEnums.SET_DIALOG_CONTENT,
            payload: content
        })
    }

    return { handleDialogClick };
}