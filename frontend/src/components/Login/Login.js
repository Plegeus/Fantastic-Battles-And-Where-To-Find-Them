import "./Loginstyles.css";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useContext, useState } from "react";
import { Link} from "react-router-dom";
import UserContext from "../User.context";
import LoginContext from "./Login.context";
import WarVideo from "../WarVideo/WarVideo";


const Login = () => {

    const {
        Email,
        setEmail,
        Password,
        setPassword
    } = useContext(LoginContext);

    // Change the input type depending on the visibilitybool, so we can either hide or reveal the password
    function changeType(visibilityBool) {
        setEyeIcon(visibilityBool)
        let inputType = EyeIcon ? "text" : "password";
        document.getElementById('psw').type = inputType;
    }

    const {setAccestoken, setUsername } = useContext(UserContext);

    const login = (e) => {
        e.preventDefault()
        fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mailaddress: Email,
                password: Password
            })
        }).then(res => {
            if (!res.ok) {
                alert("Login failed");
            }
            return res.json();
        })
            .then(dat => {
                if (dat) {
                    // login succes...
                    // Put the username and Accestoken in the consts, so the site can show stuff that a logged out user wouldn't be able to see/do
                    setUsername(dat.username)
                    setAccestoken(dat.token)

                } else {
                    // login failed...
                    

                }
            })
    }

    const [EyeIcon, setEyeIcon] = useState(true)

    const eyeOpenIcon = <FiEye className="EyeIcon"
        size="2rem" color="gray"
        onClick={() => changeType(!EyeIcon)}
    />
    const eyeClosedIcon = <FiEyeOff className="EyeIcon"
        size="2rem" color="gray"
        onClick={() => changeType(!EyeIcon)}
    />
// A form for logging in
    return (
        <div className="LoginContainer">
        
            

            <div className="loginForm">
                <div className="loginText">
                    <h1>Login</h1>
                </div>

                <form className="loginCover" onSubmit={login}>
                    <div className="formRow">
                        <label className="form-label">Email</label>
                        <input id="mailaddress" type="email" placeholder="Enter Email" className="form-input"
                            value={Email} onChange={(e) => { setEmail(e.target.value) }} required />
                    </div>

                    <div className="formRow">
                        <label className="form-label">Password</label>
                        <input type="password" placeholder="Enter Password" id="psw" className="form-input"
                            value={Password} onChange={(e) => { setPassword(e.target.value) }} required />
                        <span className="passwordEye">{EyeIcon ? eyeClosedIcon : eyeOpenIcon}</span>
                    </div>

                    

                    <div className="loginBottom">
                        <button type="submit">Login</button>
                    </div>
                    {/* A redirect to the Signup Page */}
                    <div className="signup">
                        <p>Need an account? <Link to="/signup" className="forgotPassword">SIGN UP</Link></p>
                    </div>
                </form>
            </div>
            <WarVideo/>
        </div>
    )
}

export default Login;