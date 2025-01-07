import { useState } from "react";
import { SlLogin } from "react-icons/sl";
import { Button } from "@components";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
    login: boolean;
}

export const LoginForm = ({ login}: LoginFormProps) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { error, signIn, register } = useAuth({email, password, name})
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login ? signIn() : register();
        return navigate("/dashboard")
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    icon={<SlLogin />}
                    text="Login"
                    textCenter
                    type='submit'
                />
            ) : (
                <Button 
                    icon={<SlLogin />}
                    text="Create ATAINR Account"
                    textCenter
                    type='submit'
                />
            )}
           
                <span className="error-message">{error}</span>
        </form>
    )
}
