import { RouterProvider } from "react-router-dom";
import { StateContext } from "./context/StateProvider";
import { useContext, useEffect, useState } from "react";
import csvData from "./data/static-data.csv?raw";
import Papa from "papaparse";
import Spinner from "@components/ui/Spinner/Spinner";
import createAppRouter from "./config/appRouter";
import useInitializeApp from "@hooks/useInitializeApp";

const App = () => {
  const { state } = useContext(StateContext);
  const [ rawData, setRawData ] = useState<any>();
  const { user } = state;
  const { appData, isLoading } = useInitializeApp(rawData);

  useEffect(() => {
    setRawData(Papa.parse(csvData, {
      header: true, // Set to true if your CSV has headers
      skipEmptyLines: true,
    }).data);
  }, [csvData]);
 
  if (isLoading) {
    return <Spinner />;
  }
  
  return <RouterProvider router={createAppRouter({isAuthUser: user, appData: appData ?? []})} future={{
    v7_startTransition: true}} />;
};

export default App;
