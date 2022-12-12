import "./Signupstyles.css";
import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage1Bottom from "./SignupPage1Bottom";
import { useState } from "react";

import "./SignupStepsstyles.css"


const Signup = () => {

    const [page, setPage] = useState(1)

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
                <form className="loginCover">
                    {
                        page === 1 ? <SignupPage1 /> : page === 2 ? <SignupPage2 /> : null
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