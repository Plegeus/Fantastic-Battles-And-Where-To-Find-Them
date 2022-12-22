import { useState, createContext } from "react";

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
    //These conts are used to have front-end form validation and store the information across 2 different components
    const [Email, setEmail] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');


    return (
        <SignupContext.Provider
            value={{
                Email,
                Username,
                Password,
                setEmail,
                setUsername,
                setPassword
            }}>
            {children}
        </SignupContext.Provider>
    );
};

export default SignupContext