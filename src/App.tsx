import { RouterProvider } from "react-router-dom";
import { StateContext } from "./context/StateProvider";
import { useContext } from "react";
import { Spinner } from "@components";
import createAppRouter from "./config/createAppRouter";

const App = () => {
  const { user, isLoading } = useContext(StateContext).state;
 
  if (isLoading) {
    return <Spinner />;
  }
  
  return <RouterProvider router={createAppRouter({isAuthUser: user})} future={{
    v7_startTransition: true}} />;
};

export default App;
