import { Audio } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="loading-spinner">
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

export default Spinner