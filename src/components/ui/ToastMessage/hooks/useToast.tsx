import { StateContext } from "@context/StateProvider";
import { useContext } from "react";
import { stateEnums } from "@context/reducer";
import { ToastMessageprops } from "../toastMessage.types";
import { TOAST_DURATION } from "@utils/constants";

export const useToast = () => {
    const { dispatch } = useContext(StateContext);
    
    const addToast = ({ id, message, position, duration = TOAST_DURATION, status }: ToastMessageprops) => {
      try {
        dispatch({
          type: stateEnums.ADD_TOAST,
          payload: { id, message, position, status, duration },
        });
    
        setTimeout(() => {
          dispatch({
            type: stateEnums.REMOVE_TOAST,
            payload: id
          })
        }, duration + 500)
      } catch(error) {
        console.log('error:', error);
      }
    }
  
    return { addToast }
  }