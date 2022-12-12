import Navigation from "./components/NavBar/Navigation";
import Login from "./components/Login/Login";
import SignupWithContext from "./components/Signup/SignupWithContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map";
import Overview from "./components/Overview/Overview";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Map />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupWithContext />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
