import { createBrowserRouter, Navigate } from "react-router-dom";
import { DataVisualisation } from "@components/dataVisualisation/DataVisualisation";
import Login from "@components/login/Login";
import { CsvDataProps } from "@components/charts/chart.types";
import firebase from 'firebase/compat/app';

interface CreateAppRouterProps {
  isAuthUser: firebase.User | null;
  appData: CsvDataProps[];
}

const createAppRouter = ({ isAuthUser, appData }: CreateAppRouterProps) =>
  createBrowserRouter(
    [
      { path: "/", element: isAuthUser ? <Navigate to="/dashboard" /> : <Login /> },
      {
        path: "/dashboard",
        element: isAuthUser ? (
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

export default createAppRouter;