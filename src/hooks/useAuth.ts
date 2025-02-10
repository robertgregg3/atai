import { stateEnums } from "@context/reducer";
import { StateContext } from '@context/StateProvider';
import { useContext, useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";

interface UseAuthProps {
    email: string;
    password: string;
    name: string;
}

const useAuth = ({email, password, name}: UseAuthProps) => {
  const [error, setError] = useState<string>("");
  const dispatch = useContext(StateContext).dispatch;
  const auth = getAuth();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      let loggedInUser = userCredential.user;
      console.log("user: ", loggedInUser);
      if (loggedInUser && loggedInUser.displayName && loggedInUser.email) {
        dispatch({
          type: stateEnums.SET_USER,
          payload: {
            user: loggedInUser,
            displayName: loggedInUser.displayName,
            email: loggedInUser.email,
          },
          });        
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
          dispatch({
            type: stateEnums.SET_USER,
            payload: {
              user: { ...user, displayName: name },
              displayName: name,
              email: email,
            },
          });
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
