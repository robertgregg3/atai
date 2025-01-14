import { useState } from "react";
import { LoginHeader, LoginForm } from "@components";
import ataiLogo from "@images/atai1.svg";
import "./LoginPage.css";

export const LoginPage = () => {
  const [login, setLogin] = useState(true);

  const handleButtonClick = (value: boolean) => {
    setLogin(value);
  };

  return (
    <>
      <main className="login__container">
        <div className="login__left-side">
          <img
            alt="Atainr Logo"
            src={ataiLogo}
            width={"200px"}
            height={"200px"}
          />
        </div>
        <div>
          <LoginHeader buttonClick={handleButtonClick} />
          <LoginForm login={login} />
        </div>
      </main>
    </>
  );
};
