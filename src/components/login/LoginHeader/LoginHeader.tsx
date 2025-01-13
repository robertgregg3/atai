import { Button } from "@components";
import './LoginHeader.css'

interface LoginHeaderProps {
    activeButton: string;
    buttonClick: (arg1: boolean, arg2: string) => void;
}

export const LoginHeader = ({ activeButton, buttonClick }: LoginHeaderProps) => {
  return (
    <div className="login__options">
        <Button
            handleClick={() => buttonClick(false, "Create Account")}
            text="Create Account"
            aria-label="Create Account"
            className={`button__text-only ${activeButton !== 'login' ? 'active' : ''}`}
        />
        <Button
            handleClick={() => buttonClick(true, "Login")}
            text="Login"
            aria-label="Login"
            className={`button__text-only ${activeButton === 'login' ? 'active' : ''}`}
        />
        </div>
  )
}
