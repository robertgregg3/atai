import { useState } from "react";
import { SlLogin } from "react-icons/sl";
import Button from "@components/ui/buttons/Button/Button";
import useAuth from "@hooks/useAuth";

interface LoginFormProps {
    login: boolean;
}

const LoginForm = ({ login}: LoginFormProps) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { error, signIn, register } = useAuth({email, password, name})

    const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signIn();
    };
    
    const handleRegisterClick = (e: React.FormEvent<HTMLButtonElement>) => {
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

            {login ? (
                <Button 
                    handleClick={(e) => handleClick(e)}
                    icon={<SlLogin />}
                    text="Login"
                    textCenter
                />
            ) : (
                <Button 
                    handleClick={(e) => handleRegisterClick(e)}
                    icon={<SlLogin />}
                    text="Create ATAINR Account"
                    textCenter
                />
            )}
           
                <span className="error-message">{error}</span>
        </form>
    )
}

export default LoginForm