import "./Loginstyles.css";
import { FiEyeOff,FiEye } from "react-icons/fi";
import { BsFacebook,BsGoogle } from "react-icons/bs"
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../User.context";

const Login = () => {

    function changeType(visibilityBool) {
        setEyeIcon(visibilityBool)
        let inputType = EyeIcon ? "text" : "password";
        document.getElementById('psw').type = inputType;
    }

    const {
        Accestoken,
        setAccestoken
      } = useContext(UserContext);   

    function login() {

        let request = {
          "method": "POST",
          "headers": { 
            "content-type": "application/json" 
          },
          "body": JSON.stringify({
            username: document.querySelector('#mailaddress').value,
            password: document.querySelector('#psw').value,
          }),
        }
        
        fetch("/api/login", request)
          .then(res => res.json())
          .then(dat => {
            if (JSON.parse(dat).succes) {
              alert("succes!")
              setAccestoken("insert accestoken here")
            }
            else {
              alert("Wrong username or password!")
            }
          })
        
      }

    const [EyeIcon,setEyeIcon] = useState(true)

    const eyeOpenIcon = <FiEye className="EyeIcon" 
                            size="2rem" color="gray"
                            onClick={() => changeType(!EyeIcon)}
                            />
    const eyeClosedIcon = <FiEyeOff className="EyeIcon" 
                            size="2rem" color="gray"
                            onClick={() => changeType(!EyeIcon)}
                            />

    const facebookIcon = <BsFacebook className="EyeIcon" 
                            size="2.3rem" color="blue"
                            />                    
    
    const googleIcon =  <BsGoogle className="EyeIcon" 
                        size="2.3rem" color="red"
                        />                          


    return (
        <div className="LoginContainer">
            <div className="loginForm">
                <div className="loginText">
                    <h1>Login</h1>
                </div>

                <form className="loginCover">
                    <div className="loginRow">
                        <label className="form-label">Email</label>
                        <input id="mailaddress" type="email" placeholder="Enter Email" className="form-input" required/>
                    </div>

                    <div className="loginRow">
                        <label className="form-label">Password</label>
                        <input type="password" placeholder="Enter Password" id="psw" className="form-input" required />
                        <span className="passwordEye">{EyeIcon ? eyeClosedIcon : eyeOpenIcon}</span>
                    </div>

                    <div className="passwordExtra">
                        <label className="rememberCheckbox">
                            <input type="checkbox"/>
                            <span className="caption">Remember me</span>
                        </label>

                        <a href="#" className="forgotPassword">Forgot Password</a>
                    </div>
                    
                    <div className="loginBottom">
                        <button type="submit" onClick={ login }>Login</button>
                    </div>

                    <div className="socialLogin">
                        <a href="#">
                            <span className="facebookIcon">{facebookIcon}</span>
                        </a>
                        <a href="#">
                            <span className="googleIcon">{googleIcon}</span>
                        </a>
                    </div>


                    <div className="signup">
                        <p>Need an account? <Link to="/signup" className="forgotPassword">SIGN UP</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;