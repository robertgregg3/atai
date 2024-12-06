import { createBrowserRouter, Navigate } from "react-router-dom";
import { DataVisualisation } from "@components/dataVisualisation/DataVisualisation";
import firebase from 'firebase/compat/app';
import LoginPage from "@components/login/Login/LoginPage";

interface CreateAppRouterProps {
  isAuthUser: firebase.User | null;
}

const createAppRouter = ({ isAuthUser }: CreateAppRouterProps) =>
  createBrowserRouter(
    [
      { path: "/", element: isAuthUser ? <Navigate to="/dashboard" /> : <LoginPage /> },
      {
        path: "/dashboard",
        element: isAuthUser ? (
          <DataVisualisation />
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

export default createAppRouter;