import "./SignupPagesStyles.css";
import { useContext } from "react";
import SignupContext from "./Signup.context";


const SignupPage1 = () => {   
  
  const {
    Email,
    setEmail
  } = useContext(SignupContext);                      


  return (
    <div className="SignupPage1"> 
        <div className="loginRow">
            <label for="email" className="form-label">Email</label>
            <input type="email" placeholder="Enter Email" className="form-input" 
            value={Email} onChange={(e) => {setEmail(e.target.value) }} required/>
        </div>
    </div>
  )
}

export default SignupPage1