import { stateEnums } from "@context/reducer";
import { StateContext } from "@context/StateProvider";
import { useContext } from "react";

export interface ToastMessageprops {
    id: number;
    message: string;
    status: 'success' | 'error' | 'info'; 
    duration?: number; 
    position: 'top' | 'bottom' | 'top-right' | 'bottom-right'
}[];

type ToastProps = {
    toasts: ToastMessageprops[]
}

export const useToast = () => {
  const { dispatch } = useContext(StateContext);
  
  const addToast = ({ id, message, position, duration = 2000, status }: ToastMessageprops) => {
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


export const ToastMessage = ({ toasts }: ToastProps) => {
    return (
        <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
          {toasts.map(({ status, message, id }, index) => (
            <div
              key={id}
              style={{
                marginBottom: 10,
                padding: '10px 20px',
                borderRadius: 5,
                backgroundColor: status === 'success' ? 'green' : status === 'error' ? 'red' : 'blue',
                color: 'white',
              }}
            >
              {message}
            </div>
          ))}
      </div>
    )
}