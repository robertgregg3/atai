import { Button } from "@components";

interface LoginHeaderProps {
    activeButton: string;
    buttonClick: (arg1: boolean, arg2: string) => void;
}

const LoginHeader = ({ activeButton, buttonClick }: LoginHeaderProps) => {
    const selectedPage = activeButton === "login__active" ? "login__active" : "Create Account";
  return (
    <div className="login__options">
        <Button
            handleClick={() => buttonClick(false, "Create Account")}
            text="Create Account (DEMO Only)"
            className={`button__text-only ${selectedPage}`}
        />
        <Button
            handleClick={() => buttonClick(true, "Login")}
            text="Login"
            className={`button__text-only ${selectedPage}`}
        />
        </div>
  )
}

export default LoginHeader