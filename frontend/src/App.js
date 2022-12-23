import Navigation from "./components/NavBar/Navigation";
import Login from "./components/Login/Login";
import SignupWithContext from "./components/Signup/SignupWithContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map";
import Overview from "./components/Overview/Overview";
import NotFound from "./components/NotFound/NotFound";
import LoggedOutRoutes from "./components/LoggedOutRoutes";
import Account from "./components/Account/Account";
import "./app.css"
import { LoginProvider } from "./components/Login/Login.context";
import BattlePage from "./components/BattlePage/BattlePage";


//The Map component will only get rendered if the url starts with nothing or a /
//BattlePage takes the id of the battle as an argument in the url, the same for Account but with the username, so we can fetch the specific data
// If the user is already logged in then we will not be able to go to the login or signup page
// If Router doesn't find an url that fits any of the paths then we display a NotFound component which will show u a 404 error and have a link ready to go back to the home page

const App = (props) => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="Content">
          <Routes>
            <Route exact path="/" element={
              <Map func={props.func} filter={props.filter} />
            } />
            <Route path="/overview" element={<Overview />} />
            <Route path="/BattlePage/:id" element={<BattlePage />} />
            <Route element={<LoggedOutRoutes />}>
              <Route path="/login" element={<LoginProvider><Login /></LoginProvider>} />
              <Route path="/signup" element={<SignupWithContext />} />
            </Route>
            <Route path="/account/:name" element={<Account />} />
            <Route path="/api/*" element={<p>Hello World</p>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
