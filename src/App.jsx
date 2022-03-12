import { DataVisualisation } from "./components/dataVisualisation/DataVisualisation";
import { useStateValue } from './Context/StateProvider';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from 'react';
import { auth } from "./firebaseConfig";
import Login from './components/login/Login';
import Sidebar from './components/sidebar/Sidebar';
import useStaticDataCsv from "./hooks/useStaticData";
import "./App.css";


const App = () => {
  const [{user, data}, dispatch] = useStateValue();
  const rawData = useStaticDataCsv();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('User: ', authUser)
      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
        dispatch({
          type: 'SET_DATA',
          data: rawData,
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        })
        dispatch({
          type: 'SET_DATA',
          data: rawData,
        })
      }
    })
  }, [])
  return (
    <>
      {user ? (
        <Router>
          <Switch>
              <Route exact path="/">
                <Sidebar data={rawData} />
                <DataVisualisation data={rawData} />
              </Route>
          </Switch>
        </Router>
        ) 
        : (
          <Login />
        )}
    </>
  );
};

export default App;
