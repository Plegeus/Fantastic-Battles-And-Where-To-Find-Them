import "./SignupPagesStyles.css";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { Link } from "react-router-dom";

const SignupPage1Bottom = () => {

    const facebookIcon = <BsFacebook className="EyeIcon"
        size="2.3rem" color="blue"
    />

    const googleIcon = <BsGoogle className="EyeIcon"
        size="2.3rem" color="red"
    />

    return (
        <div>
            <div className="socialLogin">
                <a href="#">
                    <span className="facebookIcon">{facebookIcon}</span>
                </a>
                <a href="#">
                    <span className="googleIcon">{googleIcon}</span>
                </a>
            </div>


            <div className="login">
                <p>Already an account? <Link to="/login" className="forgotPassword">LOGIN</Link></p>
            </div>
        </div>
    )
}

export default SignupPage1Bottom