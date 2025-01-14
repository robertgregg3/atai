import { Button } from "@components";
import { useState } from "react";
import './LoginHeader.css'

interface LoginHeaderProps {
    buttonClick: (arg1: boolean) => void;
}

export const LoginHeader = ({ buttonClick }: LoginHeaderProps) => {
    const [ isLogin, setIsLogin ] = useState<boolean>(true);

    const handleButtonClick = (value: boolean) => {
        setIsLogin(value);
        buttonClick(value)
    }
  return (
    <div className="login__options">
        <Button
            handleClick={() => handleButtonClick(false)}
            text="Create Account"
            aria-label="Create Account"
            className={`button__text-only ${!isLogin ? 'active' : ''}`}
        />
        <Button
            handleClick={() => handleButtonClick(true)}
            text="Login"
            aria-label="Login"
            className={`button__text-only ${isLogin ? 'active' : ''}`}
        />
        </div>
  )
}
