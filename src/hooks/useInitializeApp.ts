import { useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { StateContext } from "@context/StateProvider";
import firebase from 'firebase/compat/app';
import { stateEnums } from "@context/reducer";
import { CsvDataProps } from "@components/charts/chart.types";


const useInitializeApp = (data: CsvDataProps[]) => {
    const dispatch = useContext(StateContext).dispatch;
    const [isLoading, setisLoading] = useState(true); 
    const [appData, setAppData] = useState<CsvDataProps[]>();

    useEffect(() => {
      auth.onAuthStateChanged((authUser: firebase.User | null) => {
          if (authUser) {
            dispatch({
              type: stateEnums.SET_USER,
              payload: {
                user: authUser,
                displayName: authUser.displayName || "Unknown"
              },
            });
            dispatch({
              type: stateEnums.SET_DATA,
              payload: data,
            });
            setAppData(data)
          }
          setisLoading(false);
        });
    }, [data]);

    return { appData, isLoading }
}

export default useInitializeApp