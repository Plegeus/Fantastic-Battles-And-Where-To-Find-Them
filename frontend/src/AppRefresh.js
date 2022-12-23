
import App from "./App.js";
import { UserProvider } from "./components/User.context.js";

const AppRefresh = (props) => {
    //We put UserProvider around the App component so every component in App hass access to the Accestoken and Username state and their respective setter function
    return (
        <UserProvider>
            <App func={props.func} filter={props.filter} />
        </UserProvider>
    )
}

export default AppRefresh