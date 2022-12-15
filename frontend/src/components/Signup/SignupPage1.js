import "./SignupPagesStyles.css";
import { useContext } from "react";
import SignupContext from "./Signup.context";


const SignupPage1 = (props) => {   
 
  const {
    Email,
    setEmail
  } = useContext(SignupContext);                      


  return (
    <div className="SignupPage1"> 
        <div className="loginRow">
            <label className="form-label">Email</label>
            <input type="email" placeholder="Enter Email" className="form-input" 
            value={Email} onChange={(e) => {setEmail(e.target.value) }} />
            <p className="ErrorMessage">{props.emailError}</p>
        </div>
    </div>
  )
}

export default SignupPage1