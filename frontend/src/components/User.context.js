import { useState, createContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [Accestoken, setAccestoken] = useState();
    const [Username, setUsername] = useState();
    const [Id, setId] = useState('');

    useEffect(() => {
        fetch("/api/user/refresh", {
            'method': 'GET'
          }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                
            }
          }).then(dat => {
            setAccestoken(dat.token)
          })
    }, [])

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