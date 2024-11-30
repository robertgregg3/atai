import { SetStateAction, useState } from "react";
import ataiLogo from "@images/atai1.svg";
import LoginHeader from "../LoginHeader/LoginHeader";
import LoginForm from "../LoginForm/LoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  const [activeButton, setActiveButton] = useState("Login");
  const [login, setLogin] = useState(true);

  const handleButtonClick = (value: boolean, linkName: SetStateAction<string>) => {
    setActiveButton(linkName);
    setLogin(value);
  };

  return (
    <>
      <div className="login__container">
        <div className="login__left-side">
          <img
            alt="Atainr Logo"
            src={ataiLogo}
            width={"200px"}
            height={"200px"}
          />
        </div>
        <div>
          <LoginHeader activeButton={activeButton} buttonClick={handleButtonClick} />
          <LoginForm login={login} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
