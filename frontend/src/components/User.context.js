import { useState, createContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // These consts will be the place where we store the accestoken and the username if the user is logged in
    const [Accestoken, setAccestoken] = useState();
    const [Username, setUsername] = useState();

    useEffect(() => {
        console.log("fetching refresh token")
        fetch("/refresh", {
            'method': 'GET'
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.log("refreshtoken is expired")
                setAccestoken(null)
                setUsername(null);
                <Navigate to="http://localhost:3000/login" />
            }
        }).then(dat => {
            setUsername(dat.username)
            setAccestoken(dat.token)
        })
    }, [])

    return (
        <UserContext.Provider
            value={{
                Accestoken,
                Username,
                setAccestoken,
                setUsername
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext