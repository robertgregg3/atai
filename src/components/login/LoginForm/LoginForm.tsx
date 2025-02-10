import { ChangeEvent, useState } from "react";
import { SlLogin } from "react-icons/sl";
import { Button } from "@components";
import { useNavigate } from "react-router-dom";
import { useToast } from "@components";
import { PASSWORD_LENGTH, TOAST_DURATION } from "@utils";
import useAuth from "@hooks/useAuth";

interface LoginFormProps {
    login: boolean;
}

export const LoginForm = ({ login }: LoginFormProps) => {
    const [ name, setName ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ confirmPassword, setConfirmPassword ] = useState<string>("");
    const [ confirmPasswordError, setConfirmPasswordError ] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const { error, signIn, register } = useAuth({email, password, name})
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login ? signIn() : register();
        addToast({
            id: 4,
            message: 'Login successful',
            position: 'bottom-right',
            status: 'success',
            duration: TOAST_DURATION
          })
        return navigate("/dashboard")
    };

    const checkIfSubmitShouldBeDisabled = () => {
        return (
            password === "" ||
            password.length < PASSWORD_LENGTH || 
            confirmPassword === "" ||
            password !== confirmPassword
        );
    };
    
    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
    
        if (password.length < PASSWORD_LENGTH) {
            setConfirmPasswordError(`Password must be at least ${PASSWORD_LENGTH} characters long`);
        } else if (value !== password) {
            setConfirmPasswordError('Your passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
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
            {!login && (
                <>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => handleConfirmPassword(e)}
                        required
                    />
                    <span>{confirmPasswordError}</span>
                </>
            )}
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
                    disabled={checkIfSubmitShouldBeDisabled()}
                />
            )}
            <span className="error-message">{error}</span>
        </form>
    )
}
