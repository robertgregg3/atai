import { Audio } from "react-loader-spinner";
import "./Spinner.css";

interface SpinnerProps {
  customClass?: string;
}

export const Spinner = ({customClass}: SpinnerProps) => {
  return (
    <div className={`loading-spinner ${customClass}`}>
        <Audio
          height="100"
          width="100"
          color="#10a8a9"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
      </div>
  )
}
