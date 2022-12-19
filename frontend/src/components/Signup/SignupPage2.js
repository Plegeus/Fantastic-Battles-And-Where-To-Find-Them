import { FiEyeOff,FiEye } from "react-icons/fi";
import { useState } from "react";
import "./SignupPagesStyles.css";

import { useContext } from "react";
import SignupContext from "./Signup.context";

const SignupPage2 = (props) => {    
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

        <div className="formRow">
            <label className="form-label">Username</label>
            <input type="text" placeholder="Enter Username" className="form-input" 
            value={Username} onChange={(e) => {setUsername(e.target.value) }} />
            <p className="ErrorMessage">{props.usernameError}</p>
        </div>

        <div className="formRow">
            <label className="form-label">Password</label>
            <input type="password" placeholder="Enter Password" id="psw" className="form-input" 
            title="Must contain at least 8 or more characters" minLength="8" 
            value={Password} onChange={(e) => {setPassword(e.target.value) }} />
            <span className="passwordEye">{EyeIcon ? eyeClosedIcon : eyeOpenIcon}</span>
            <p className="ErrorMessage">{props.passwordError}</p>
        </div>

        <div className="signupBottom">
            <button type="submit" className="NextButton">Sign Up</button>
        </div>
    </div>
  )
}

export default SignupPage2