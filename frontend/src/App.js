import Navigation from "./components/NavBar/Navigation";
import Login from "./components/Login/Login";
import SignupWithContext from "./components/Signup/SignupWithContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map";
import Overview from "./components/Overview/Overview";
import NotFound from "./components/NotFound/NotFound";
import UserContext, { UserProvider } from './components/User.context';
import LoggedOutRoutes from "./components/LoggedOutRoutes";
import Account from "./components/Account/Account";
import "./app.css"
import { LoginProvider } from "./components/Login/Login.context";
import BattlePage from "./components/BattlePage/BattlePage";
import { useContext, useEffect, useState } from "react";


const App = () => {

  const {
    Accestoken,
    setAccestoken,
    Username
  } = useContext(UserContext);

  /*const [IsLoading, setLoading] = useState(true);

  console.log("accestoken in app:",Accestoken)
  console.log("username:in app",Username)

  useEffect(() => {
    console.log("Username:",Username);
    fetch(`"/api/user/refresh/${Username}`, {
      method: "GET"
    }).then(res => {
      console.log(res);
      if(res.ok){
        return res.json();
      }
      else {
        alert("refreshtoken expired")
      }
    }).then(data => {
      console.log(data);
      setLoading(false);
    })
  }, []);

  if (IsLoading) {
    return <div>Loading...</div>
  } */
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="Content">
          <Routes>
            <Route exact path="/" element={<Map />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/BattlePage/:id" element={<BattlePage />} />
            <Route element={<LoggedOutRoutes />}>
              <Route path="/login" element={<LoginProvider><Login /></LoginProvider>} />
              <Route path="/signup" element={<SignupWithContext />} />
            </Route>
            <Route path="/account/:name" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
