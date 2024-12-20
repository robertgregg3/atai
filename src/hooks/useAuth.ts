import { stateEnums } from "@context/reducer";
import { auth } from "../firebaseConfig";
import { StateContext } from '@context/StateProvider';
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

interface UseAuthProps {
    email: string;
    password: string;
    name: string;
}

const useAuth = ({email, password, name}: UseAuthProps) => {
  const [error, setError] = useState<string>("");
  const dispatch = useContext(StateContext).dispatch;
  const navigate = useNavigate();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      let loggedInUser = userCredential.user;
      console.log("user: ", loggedInUser);
      if (loggedInUser && loggedInUser.displayName) {
        dispatch({
          type: stateEnums.SET_USER,
          payload: {
            user: loggedInUser,
            displayName: loggedInUser.displayName,
          },
          });        
          navigate("/dashboard");
        }
      })
    .catch((err: { message: string }) => {
      const formattedError = err.message.replace("Firebase: ", "");
      setError(formattedError);
      console.log(err);
    });
  }

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log("user: ", user);
          updateProfile(user, {
            displayName: name,
          });
          dispatch({
            type: stateEnums.SET_USER,
            payload: {
              user: user,
              displayName: name,
            },
          });
          navigate("/dashboard");
        }
    })
    .catch((err: { message: string; }) => {
      const formattedError = err.message.replace("Firebase: ", "");
      setError(formattedError);
      console.log(err);
    });
  }

  return { error, signIn, register };
};

export default useAuth;
