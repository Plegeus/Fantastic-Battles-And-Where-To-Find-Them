import "./Signupstyles.css";
import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage1Bottom from "./SignupPage1Bottom";
import { useState, useContext, useEffect } from "react";
import SignupContext from "./Signup.context";
import WarVideo from "../WarVideo/WarVideo";

import "./SignupStepsstyles.css"
import UserContext from "../User.context";


const Signup = () => {
    // A regex to check if the filled in text is an email.
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // We hold a const to keep track which signup page we are currently on
    const [page, setPage] = useState(1)
    const {
        Email,
        Username,
        Password
    } = useContext(SignupContext);

    const {
        setAccestoken,
        setUsername
    } = useContext(UserContext);

    const [FormErrors, setFormErrors] = useState({});

    const [IsSubmitted, setIsSubmitted] = useState(false)

// When clicking register we update the isSubmitted state and we also update all the errors we currently have, this will also make sure that we fetch again unless 
// the user still has the same amount of errors
    const handleRegister = (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        setFormErrors(handleErrors)
    }

    // Each time the Formerrors object changes we will be ready to fetch again and only if we actually clicked submit will the fetch go through
    useEffect(() => {
        if (Object.keys(FormErrors).length === 0 && IsSubmitted) {
            fetch("/api/user/register", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify({
                    mailaddress: Email,
                    password: Password,
                    username: Username,
                }),
            }).then(res => {
                if (res.ok) {
                    // register succes, receiving access token...
                    res.json().then(tkn => {
                        setAccestoken(tkn)
                        setUsername(Username)
                    })
                } else {
                    // register failed...
                }
            })
            setIsSubmitted(false)
        }
        // Find the first error and redirect to that page
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

    // Show the user that how many pages there are and give visual feedback which page u are currently on by changing the colors
    function decideIcons(page) {
        setPage(page)
        if (page === 1) {
            const collection = document.getElementsByClassName("circle");
            for (let i = 0; i < collection.length; i++) {
                collection[i].style.backgroundColor = "grey";
            }

            const circle = document.querySelector('#circle1');
            circle.style.backgroundColor = 'white';


        } else if (page === 2) {
            const collection = document.getElementsByClassName("circle");
            for (let i = 0; i < collection.length; i++) {
                collection[i].style.backgroundColor = "grey";
            }


            const circle = document.querySelector('#circle2');
            circle.style.backgroundColor = 'white';


        } else {

        }
    }

    return (
        <div className="SignupContainer">
            <div className="signupForm">
                <div className="signupText">
                    <h1>Signup</h1>
                </div>
                <form onSubmit={handleRegister} className="loginCover">
                    {
                        page === 1 ? <SignupPage1 emailError={FormErrors.email} /> :
                            page === 2 ? <SignupPage2 usernameError={FormErrors.username} passwordError={FormErrors.password} /> : null
                    }
                    {
                        page < 2 && (
                            <div className="signupBottom">
                                <button type="submit" className="NextButton" onClick={() => { decideIcons(page + 1) }}>Next</button>
                            </div>
                        )
                    }
                    {
                        page > 1 && (
                            <div className="signupBottom">
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
            <WarVideo />
        </div>
    )
}

export default Signup;