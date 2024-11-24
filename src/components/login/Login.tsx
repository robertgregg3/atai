import { SetStateAction, useContext, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { stateEnums } from "../../context/reducer";
import { StateContext } from "../../context/StateProvider";
import firebase from 'firebase/compat/app';
import ataiLogo from "../../images/atai1.svg";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeButton, setActiveButton] = useState("Login");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(true);
  const { state, dispatch } = useContext(StateContext);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent<HTMLButtonElement>) => {
    console.log(state);
    setError("");
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
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

  const handleRegister = (e: { preventDefault: () => void; }) => {
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

  const handleButtonClick = (value: boolean, linkName: SetStateAction<string>) => {
    setActiveButton(linkName);
    setLogin(value);
  };

  return (
    <>
      <div className="login__container">
        <div className="login__left-side">
          <div className="login__container-header">
            <img
              alt="Atainr Logo"
              src={ataiLogo}
              width={"200px"}
              height={"200px"}
            />
          </div>
        </div>
        <div>
          <div className="login__options">
            <button
              className={`${activeButton === "Login" ? "login__active" : ""}`}
              onClick={() => handleButtonClick(true, "Login")}>
              Login
            </button>
            <button
              className={`${
                activeButton === "Create Account" ? "login__active" : ""
              }`}
              onClick={() => handleButtonClick(false, "Create Account")}>
              Create Account (DEMO Only)
            </button>
          </div>

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
                <button type="submit" onClick={handleSignIn}>
                  Sign in
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className="login__registerAccount">
                  Create ATAINR Account
                </button>
              )}
              <span className="error-message">{error}</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
