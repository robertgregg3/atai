import { createBrowserRouter, Navigate } from "react-router-dom";
import { DataVis } from "@components";
import { LoginPage } from "@components";
import firebase from 'firebase/compat/app';

export interface CreateAppRouterProps {
  isAuthUser: firebase.User | null;
}

const createAppRouter = ({ isAuthUser }: CreateAppRouterProps) => {
  console.log(isAuthUser);
  return (createBrowserRouter(
    [
      { path: "/login", element: isAuthUser ? <Navigate to="/" /> : <LoginPage /> },
      {
        path: "/",
        element: isAuthUser ? <DataVis /> : <Navigate to="/login" />,
        children: [
          { path: "charts/:chartType", element: <DataVis /> },
        ],
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
  )
)}

export default createAppRouter;
