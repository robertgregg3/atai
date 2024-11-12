import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useStateValue } from "../../Context/StateProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ataiLogo from "../../images/atai1.svg";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeButton, setActiveButton] = useState("Login");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(true);
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const handleSignIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      let loggedInUser = userCredential;
      console.log("user: ", loggedInUser);
      dispatch({
        type: "SET_USER",
        user: loggedInUser,
      });
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("user: ", auth);
        auth.user.updateProfile({
          displayName: name,
        });
        dispatch({
          type: "SET_USER",
          user: auth.user,
          displayName: name,
        });
      })
      .catch((err) => console.log(err));
    history.push("/dashboard");
  };

  const handleButtonClick = (value, linkName) => {
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
                />
              </>
            )}
            <label>E-mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
