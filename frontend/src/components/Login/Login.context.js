import { useState, createContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');


    return (
        <LoginContext.Provider
            value={{
                Email,
                Password,
                setEmail,
                setPassword
            }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContext