import { useState, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [Accestoken, setAccestoken] = useState();
    const [Username, setUsername] = useState();
    const [Id, setId] = useState('');


    return (
        <UserContext.Provider
            value={{
                Accestoken,
                Username,
                Id,
                setAccestoken,
                setUsername,
                setId,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext