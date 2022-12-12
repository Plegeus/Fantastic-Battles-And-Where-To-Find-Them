import { FiEyeOff,FiEye } from "react-icons/fi";
import { useState } from "react";
import "./SignupPagesStyles.css";

import { useContext } from "react";
import SignupContext from "./Signup.context";

const SignupPage2 = () => {
    
    function changeType(visibilityBool) {
        setEyeIcon(visibilityBool)
        let inputType = EyeIcon ? "text" : "password";
        document.getElementById('psw').type = inputType;
    }

    const {
        Username,
        setUsername,
        Password,
        setPassword
      } = useContext(SignupContext);

    const [EyeIcon,setEyeIcon] = useState(true)

    const eyeOpenIcon = <FiEye className="EyeIcon" 
                            size="2rem" color="gray"
                            onClick={() => changeType(!EyeIcon)}
                            />
    const eyeClosedIcon = <FiEyeOff className="EyeIcon" 
                            size="2rem" color="gray"
                            onClick={() => changeType(!EyeIcon)}
                            />



  return (
    <div className='SignupPage2'>

        <div className="loginRow">
            <label for="uname" className="form-label">Username</label>
            <input type="text" placeholder="Enter Username" className="form-input" 
            value={Username} onChange={(e) => {setUsername(e.target.value) }} required/>
        </div>

        <div className="loginRow">
            <label for="id" className="form-label">Password</label>
            <input type="password" placeholder="Enter Password" id="psw" className="form-input" 
            title="Must contain at least 8 or more characters" minlength="8" 
            value={Password} onChange={(e) => {setPassword(e.target.value) }} required/>
            <span className="passwordEye">{EyeIcon ? eyeClosedIcon : eyeOpenIcon}</span>
            <div id="message">
                <h3>Password must contain the following:</h3>
                <p id="length">Minimum <b>8 characters</b></p>
            </div>
        </div>

        <div className="loginBottom">
            <button type="submit" className="NextButton">Sign Up</button>
        </div>
    </div>
  )
}

export default SignupPage2