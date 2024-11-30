import {
  Navigate,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { StateContext } from "./context/StateProvider";
import { useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { DataVisualisation } from "./components/dataVisualisation/DataVisualisation";
import { stateEnums } from "./context/reducer";
import csvData from "./data/static-data.csv?raw";
import Login from "./components/login/Login";
import firebase from 'firebase/compat/app';
import Papa from "papaparse";
import Spinner from "@components/ui/Spinner/Spinner";
import createAppRouter from "./config/appRouter";

const App = () => {
  const { state, dispatch} = useContext(StateContext);
  const { user } = state;
  const [loading, setLoading] = useState(true); 
  const [appData, setAppData] = useState<any>();

  useEffect(() => {
    const rawData = Papa.parse(csvData, {
      header: true, // Set to true if your CSV has headers
      skipEmptyLines: true,
    }).data;
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
          payload: rawData,
        });
        setAppData(rawData)
      }
      setLoading(false);
    });
  }, [dispatch, csvData]);

  if (loading) {
    return <Spinner />;
  }
  
  return <RouterProvider router={createAppRouter({isAuthUser: user, appData})} future={{
    v7_startTransition: true}} />;
};

export default App;
