import { useState } from "react";
import { SlLogin } from "react-icons/sl";
import { Button } from "@components";
import { useNavigate } from "react-router-dom";
import { useToast } from "@components";
import useAuth from "@hooks/useAuth";

interface LoginFormProps {
    login: boolean;
}

export const LoginForm = ({ login }: LoginFormProps) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { error, signIn, register } = useAuth({email, password, name})
    const navigate = useNavigate();
    const addToast = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login ? signIn() : register();
        addToast({
            id: 4,
            message: 'Login successful',
            position: 'bottom-right',
            status: 'success',
          })
        return navigate("/dashboard")
    };

    return (
        <form role='form' onSubmit={handleSubmit}>
            {!login && (
                <>
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </>
            )}
            <label htmlFor="email">E-mail</label>
            <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {login ? (
                <Button 
                    icon={<SlLogin />}
                    text="Login"
                    textCenter
                    type="submit"
                />
            ) : (
                <Button 
                    icon={<SlLogin />}
                    text="Create ATAINR Account"
                    textCenter
                    type="submit"
                />
            )}
            <span className="error-message">{error}</span>
        </form>
    )
}
