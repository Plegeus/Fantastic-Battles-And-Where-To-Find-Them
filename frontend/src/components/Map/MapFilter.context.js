import { useState, createContext } from "react";

const MapFilterContext = createContext();

export const MapFilterProvider = ({ children }) => {
    const [minDeath, setminDeath] = useState(0);
    const [minYear, setminYear] = useState(0);


    return (
        <MapFilterContext.Provider
            value={{
                minDeath,
                minYear,
                setminDeath,
                setminYear,
            }}>
            {children}
        </MapFilterContext.Provider>
    );
};

export default MapFilterContext