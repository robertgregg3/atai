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
      { path: "/", element: isAuthUser ? <Navigate to="/dashboard" /> : <LoginPage /> },
      {
        path: "/dashboard",
        element: isAuthUser ? (
          <DataVis />
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
  )
)}

export default createAppRouter;
