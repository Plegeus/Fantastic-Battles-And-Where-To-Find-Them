import "./Signupstyles.css";
import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage1Bottom from "./SignupPage1Bottom";
import { useState, useContext, useEffect } from "react";
import SignupContext from "./Signup.context";

import "./SignupStepsstyles.css"
import UserContext from "../User.context";


const Signup = () => {

    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const [page, setPage] = useState(1)
    const {
        Email,
        setEmail,
        Username,
        setUsername,
        Password,
        setPassword
    } = useContext(SignupContext);

    const {
        Accestoken,
        setAccestoken
      } = useContext(UserContext);   

    const [FormErrors, setFormErrors] = useState({});


    const handleRegister = (e) => {
        e.preventDefault()
        setFormErrors(handleErrors)
    }

    useEffect(() => {
        if (Object.keys(FormErrors).length === 0) {
            console.log(Email, Password, Username)
            setAccestoken("insert accestoken here")

        }
        else if (!Email || !regex.test(Email)) {
            setPage(1)
        }
        else if (!Username || !Password) {
            setPage(2)
        }

    }, [FormErrors])

    const handleErrors = () => {
        const errors = {};
        if (!Email || !regex.test(Email)) {
            if (!Email) {
                errors.email = "Email is required"
            }
            else {
                errors.email = "Email is not valid"
            }
        }
        if (!Username) {
            errors.username = "Username is required"
        }
        if (!Password) {
            errors.password = "Password is required"
        }
        return errors
    }

    function decideIcons(page) {
        setPage(page)
        if (page === 1) {
            const collection = document.getElementsByClassName("circle");
            for (let i = 0; i < collection.length; i++) {
                collection[i].style.backgroundColor = "gray";
            }

            const circle = document.querySelector('#circle1');
            circle.style.backgroundColor = 'green';


        } else if (page === 2) {
            const collection = document.getElementsByClassName("circle");
            for (let i = 0; i < collection.length; i++) {
                collection[i].style.backgroundColor = "gray";
            }


            const circle = document.querySelector('#circle2');
            circle.style.backgroundColor = 'green';


        } else {

        }
    }

    return (
        <div className="LoginContainer">
            <div className="loginForm">
                <div className="loginText">
                    <h1>Signup</h1>
                </div>
                <form onSubmit={handleRegister} className="loginCover">
                    {
                        page === 1 ? <SignupPage1 emailError={FormErrors.email} /> :
                            page === 2 ? <SignupPage2 usernameError={FormErrors.username} passwordError={FormErrors.password} /> : null
                    }
                    {
                        page < 2 && (
                            <div className="loginBottom">
                                <button type="submit" className="NextButton" onClick={() => { decideIcons(page + 1) }}>Next</button>
                            </div>
                        )
                    }
                    {
                        page > 1 && (
                            <div className="loginBottom">
                                <button type="submit" className="BackButton" onClick={() => { decideIcons(page - 1) }}>Back</button>
                            </div>
                        )
                    }

                    {
                        page === 1 ? <SignupPage1Bottom /> : null
                    }



                    <div className="SignupSteps">
                        <span id="circle1" className="circle"></span>
                        <span id="circle2" className="circle"></span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup;