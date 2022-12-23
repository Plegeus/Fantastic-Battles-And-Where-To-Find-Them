import { useState, createContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [Accestoken, setAccestoken] = useState();
    const [Username, setUsername] = useState();
    const [Id, setId] = useState('');

    useEffect(() => {
        console.log("fetching refresh token")
        fetch("/refresh", {
            'method': 'GET'
          }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                setAccestoken(null)
                setUsername(null);
                //window.location.replace('http://localhost:3000/login')
                <Navigate to="http://localhost:3000/login"/>
            }
          }).then(dat => {
            setUsername(dat.username)
            setAccestoken(dat.token)
          })
    }, [])

    //;

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