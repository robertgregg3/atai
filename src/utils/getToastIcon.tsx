import { ToastStatusType } from "@components/ui";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

export  const getToastIcon = (status: ToastStatusType) => {
    if(status === 'success') {
      return <FaCheckCircle />
    } else if (status === 'info') {
      return <FaInfoCircle />
    } else {
      return <MdOutlineError />
    }
  }