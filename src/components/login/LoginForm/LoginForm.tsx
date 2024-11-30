import { stateEnums } from "@context/reducer";
import { StateContext } from "@context/StateProvider";
import { useContext, useState } from "react";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';

interface LoginFormProps {
    login: boolean;
}

const LoginForm = ({ login}: LoginFormProps) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { dispatch } = useContext(StateContext);
    const navigate = useNavigate();


    const handleSigninClick = (e: React.FormEvent<HTMLButtonElement>) => {
        setError("");
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
          .then((userCredential: firebase.auth.UserCredential) => {
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
      };
    
      const handleRegisterClick = (e: { preventDefault: () => void; }) => {
        setError("");
        e.preventDefault();
    
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential: firebase.auth.UserCredential) => {
            const user = userCredential.user;
            if (user) {
              console.log("user: ", user);
              user.updateProfile({
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
      };





    return (
        <form>
            {!login && (
                <>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </>
            )}
            <label>E-mail</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <div className="login__button-container">
                {login ? (
                <button type="submit" onClick={(e) => handleSigninClick(e)}>
                    Sign in
                </button>
                ) : (
                <button
                    onClick={(e) => handleRegisterClick(e)}
                    className="login__registerAccount">
                    Create ATAINR Account
                </button>
                )}
                <span className="error-message">{error}</span>
            </div>
        </form>
    )
}

export default LoginForm