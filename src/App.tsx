import {
  Navigate,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { StateContext } from "./context/StateProvider";
import { useContext, useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import { auth } from "./firebaseConfig";
import { Audio } from "react-loader-spinner";
import { DataVisualisation } from "./components/dataVisualisation/DataVisualisation";
import csvData from "./data/static-data.csv?raw";
import Login from "./components/login/Login";
import { stateEnums } from "./context/reducer";
import Papa from "papaparse";

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
    );
  }const router = createBrowserRouter(
    [
      { path: "/", element: user ? <Navigate to="/dashboard" /> : <Login /> },
      {
        path: "/dashboard",
        element: user ? (
          <DataVisualisation data={appData} />
        ) : (
          <Navigate to="/" />
        ),
      },
      { path: "*", element: <Navigate to="/" /> },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return <RouterProvider router={router} future={{
    v7_startTransition: true}} />;
};

export default App;
