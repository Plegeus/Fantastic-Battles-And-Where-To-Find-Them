import "./SignupPagesStyles.css";
import { Link } from "react-router-dom";

const SignupPage1Bottom = () => {
    // A router link to the Login page so that Signup and Login are connected
    return (
        <div className="login">
            <p>Already an account? <Link to="/login" className="forgotPassword">LOGIN</Link></p>
        </div>
    )
}

export default SignupPage1Bottom