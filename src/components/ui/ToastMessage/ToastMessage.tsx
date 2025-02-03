import { stateEnums } from "@context/reducer";
import { StateContext } from "@context/StateProvider";
import { useContext } from "react";
import './ToastMessage.css';
import { getToastIcon } from "@utils/getToastIcon";

type ToastPositionsType =  'top' | 'bottom' | 'top-right' | 'bottom-right';
export type ToastStatusType = 'success' | 'error' | 'info';

export interface ToastMessageprops {
    id: number;
    message: string;
    status: ToastStatusType;
    duration?: number; 
    position: ToastPositionsType
}[];

type ToastProps = {
    toasts: ToastMessageprops[]
}

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

export const ToastMessage = ({ toasts }: ToastProps): JSX.Element => {
  return(
    <>
      {toasts.map(({ status, message, id, position }) => {
          return (
            <div className={`toast-message ${position} ${status}`} key={id}>
              <span>{getToastIcon(status)}</span>
              <span>{message}</span>
            </div>
          )}
      )}
    </>)
}