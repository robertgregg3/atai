import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { DataVisualisation } from "./components/dataVisualisation/DataVisualisation";
import { useStateValue } from "./Context/StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { Audio } from "react-loader-spinner";
import Login from "./components/login/Login";
import useStaticDataCsv from "./hooks/useStaticData";
import "./App.css";

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true); // New loading state

  const rawData = useStaticDataCsv();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("User: ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
          displayName: authUser.displayName,
        });
        dispatch({
          type: "SET_DATA",
          data: rawData,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [user, rawData, dispatch]);

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
  }

  return (
    <>
      <Router>
        <Switch>
          {user && window.location.pathname === "/" && (
            <Redirect to="/dashboard" />
          )}
          {user ? (
            <Route path="/dashboard">
              <DataVisualisation data={rawData} user={user} />
            </Route>
          ) : (
            <Route path="/">
              <Login />
            </Route>
          )}
        </Switch>
      </Router>
    </>
  );
};

export default App;
