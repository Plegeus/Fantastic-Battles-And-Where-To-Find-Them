
import App from "./App.js";
import { UserProvider } from "./components/User.context.js";

const AppRefresh = () => {

    return (
        <UserProvider>
            <App />
        </UserProvider>
    )
}

export default AppRefresh