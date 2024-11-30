interface LoginHeaderProps {
    activeButton: string;
    buttonClick: (arg1: boolean, arg2: string) => void;
}

const LoginHeader = ({ activeButton, buttonClick }: LoginHeaderProps) => {
  return (
    <div className="login__options">
        <button
            className={`${activeButton === "Login" ? "login__active" : ""}`}
            onClick={() => buttonClick(true, "Login")}>
            Login
        </button>
        <button
            className={`${
            activeButton === "Create Account" ? "login__active" : ""
            }`}
            onClick={() => buttonClick(false, "Create Account")}>
            Create Account (DEMO Only)
        </button>
        </div>
  )
}

export default LoginHeader