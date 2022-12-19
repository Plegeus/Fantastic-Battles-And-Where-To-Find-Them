import "./SignupPagesStyles.css";
import { Link } from "react-router-dom";

const SignupPage1Bottom = () => {
    return (
        <div className="login">
            <p>Already an account? <Link to="/login" className="forgotPassword">LOGIN</Link></p>
        </div>
    )
}

export default SignupPage1Bottom