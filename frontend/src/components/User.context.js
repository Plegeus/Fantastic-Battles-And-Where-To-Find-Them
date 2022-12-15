import { useState, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [Accestoken, setAccestoken] = useState();
    const [Id, setId] = useState('');


    return (
        <UserContext.Provider
            value={{
                Accestoken,
                Id,
                setAccestoken,
                setId,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext