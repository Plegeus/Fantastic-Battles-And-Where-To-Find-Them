
import App from "./App.js";
import { UserProvider } from "./components/User.context.js";

const AppRefresh = (props) => {

    return (
        <UserProvider>
            <App func={props.func} filter={props.filter}/>
        </UserProvider>
    )
}

export default AppRefresh