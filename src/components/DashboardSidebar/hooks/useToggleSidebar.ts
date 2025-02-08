import { StateContext } from "@context/StateProvider";
import { useContext } from "react";
import { stateEnums } from "@context/reducer";

export const useToggleSidebar = () => {
    const { dispatch } = useContext(StateContext);
    
    const toggleSidebar = (sidebarOpen: boolean) => {
      try {
        dispatch({
          type: stateEnums.TOGGLE_SIDEBAR,
          payload: !sidebarOpen,
        });
      } catch(error) {
        console.log('error toggling sidebar', error);
      }
    }
  
    return { toggleSidebar }
  }