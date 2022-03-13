import { DataVisualisation } from "./components/dataVisualisation/DataVisualisation";
import { useStateValue } from './Context/StateProvider';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from 'react';
import { auth } from "./firebaseConfig";
import Login from './components/login/Login';
import useStaticDataCsv from "./hooks/useStaticData";
import Upload from './components/upload/Upload';
import "./App.css";


const App = () => {
  const [{user, displayName}, dispatch] = useStateValue();

  const rawData = useStaticDataCsv();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('User: ', authUser)
      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
          displayName: authUser.displayName
        });
        dispatch({
          type: 'SET_DATA',
          data: rawData,
        })
      }
    })
  }, [user, rawData])
  return (
    <>
      {user ? (
        <Router>
          <Switch>
              <Route exact path="/">
                <DataVisualisation data={rawData} user={user} />
              </Route>
              <Route path="/upload">
                <Upload />
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
