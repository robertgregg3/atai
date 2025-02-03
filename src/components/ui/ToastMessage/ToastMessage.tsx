import { getToastIcon } from "@components/ui/ToastMessage/utils/getToastIcon";
import { ToastMessageprops } from "./toastMessage.types";
import './ToastMessage.css';

type ToastProps = {
    toasts: ToastMessageprops[]
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