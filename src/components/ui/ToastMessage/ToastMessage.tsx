import { getToastIcon } from "@components/ui/ToastMessage/utils/getToastIcon";
import { ToastMessageprops } from "./toastMessage.types";
import { useEffect, useRef, useState } from "react";
import { useGetToastProgress } from "./hooks/useGetToastProgress";
import './ToastMessage.css';

type ToastProps = {
    toasts: ToastMessageprops[]
}

export const ToastMessage = ({ toasts }: ToastProps): JSX.Element => {
  // Get all of the toasts, then filter them to remove the empty arrays
  // Then create separate toasts containers for each position (that contains toasts only)
  
  const allToasts = {
    'top': toasts.filter(({ position }) => position === 'top'),
    'top-right': toasts.filter(({ position }) => position === 'top-right'),
    'bottom': toasts.filter(({ position }) => position === 'bottom'),
    'bottom-right': toasts.filter(({ position }) => position === 'bottom-right')
  }

  return (
    <>
      {Object.entries(allToasts)
        .filter(([_, toasts]) => toasts.length > 0)
        .map(([position, toasts]) => (
          <div className={`toasts-container ${position}`} key={position}>
            {toasts.map(({ status, id, message, duration, position }: ToastMessageprops) => (
              <Toast key={id} id={id} status={status} message={message} duration={duration} position={position} />
            ))}
          </div>
        ))}
    </>
  );
};
 
const Toast = ({ id, status, message, duration }: ToastMessageprops) => {
  const [ toastWidth, setToastWidth ] = useState<number>(0);
  const { progress } = useGetToastProgress({ toastWidth, duration });
  const [ showToast, setShowToast ] = useState<boolean>(true);
  const toastRef = useRef<HTMLDivElement | null>(null);

  // Get the toast width when it renders
  useEffect(() => {
    if (toastRef.current) {
      setToastWidth(toastRef.current.clientWidth);
    }
  }, []);

  const handleToastClick = () => {
    setShowToast(false)
  }

  return (
    <div 
      ref={toastRef} 
      className={`toast-message ${status} ${(progress === 0 || !showToast)? 'toast-message--remove' : ''}`} 
      key={id}
      onClick={handleToastClick}
    >
      <span>{getToastIcon(status)}</span> 
      <span>{message}</span>
      <div className={`toast-message__timed-border ${status}`} style={{ width: `${(toastWidth * progress - 20) / 100}px` }}></div>
    </div>
  )
}