import { StateContext } from "@context/StateProvider";
import { useContext } from "react";
import { stateEnums } from "@context/reducer";
import { ToastMessageprops } from "../toastMessage.types";

export const useToast = () => {
    const { dispatch } = useContext(StateContext);
    
    const addToast = ({ id, message, position, duration = 200000, status }: ToastMessageprops) => {
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
        }, duration)
      } catch(error) {
        console.log('error:', error);
      }
    }
  
    return addToast
  }