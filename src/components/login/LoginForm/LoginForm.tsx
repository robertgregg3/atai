import useAuth from "@hooks/useAuth";
import { useState } from "react";

interface LoginFormProps {
    login: boolean;
}

const LoginForm = ({ login}: LoginFormProps) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { error, signIn, register } = useAuth({email, password, name})

    const handleSigninClick = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signIn();
      };
    
    const handleRegisterClick = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      register();      
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