import { useState, createContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [Accestoken, setAccestoken] = useState();
    const [Username, setUsername] = useState();
    const [Id, setId] = useState('');

    useEffect(() => {
        console.log("fetching refresh token")
        fetch("/api/user/refresh", {
            'method': 'GET'
          }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                setAccestoken(null)
                setUsername(null)
            }
          }).then(dat => {
            setUsername(dat.username)
            setAccestoken(dat.token)

            
          })
    }, [])

    //window.location.replace('http://localhost:3000/login');

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