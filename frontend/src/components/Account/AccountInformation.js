import { useState } from "react";
import useFetch from "../../Util/useFetch";
import "./AccountInformationStyles.css"
import Picture from "./Picture";

//fetch user information

const AccountInformation = (props) => {

    const [ProfileDescription, setProfileDescription] = useState("")
    const [IsEditingProfile, setIsEditingProfile] = useState(false)

    const EditProfile = () => {
        setIsEditingProfile(true)
    }

    const CancelChanges = () => {
        setIsEditingProfile(false)
        console.log("cancel editing profile")
        setProfileDescription(null)
    }

    const SaveChanges = (newDescription) => {
        setIsEditingProfile(false)
        console.log("post nieuwe description in user")
        console.log(newDescription)
    }


    return (

        <div className="AccountInformation" >
            <div className="ProfilePicture">
                <Picture username={"Plegeus"}/>
            </div>

            <div className="generalAccountInfo">
                <h2>Username</h2>
                <h4 className="emailInformation" >example@gmail.com</h4>
                <div className="Rating">
                    <p>Likes: 1203</p>
                </div>
                <div className="AccountDescription">
                    <h4 className="TitleDescription">Account Description</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam viverra porta nisi dapibus varius.
                        Vivamus sagittis elit posuere enim varius viverra.
                        Aliquam tincidunt neque et sapien maximus rhoncus.
                        Sed quis tincidunt diam. Donec efficitur maximus elit, dictum vestibulum lacus luctus nec.
                        Duis elit mi, faucibus in nunc nec, pellentesque dignissim mi.
                        Aenean vehicula viverra finibus. Cras fringilla sed augue ac imperdiet.
                        Phasellus aliquam velit vel augue commodo, id tincidunt erat pretium.
                        Donec eu felis accumsan, ullamcorper nibh sed, vulputate justo. Donec euismod tincidunt nulla, non fermentum libero pulvinar lobortis.
                        Donec varius hendrerit velit, et venenatis magna aliquet nec.
                        In vitae libero nisl.
                        Proin a elementum orci, vel tincidunt arcu.
                        Cras non tortor ut erat mattis lacinia.
                        Aliquam vehicula a lectus nec vehicula.Donec varius hendrerit velit, et venenatis magna aliquet nec.
                        In vitae libero nisl.
                        Proin a elementum orci, vel tincidunt arcu. Cras non tortor ut erat mattis...</p>
                </div>
                <div>
                    {props.Accestoken && !IsEditingProfile && props.Username === props.UsernameAccountPage && <button type="submit" className="ProfileButton" onClick={EditProfile}>Edit Profile</button>}
                    {props.Accestoken && IsEditingProfile && props.Username === props.UsernameAccountPage && 
                        <div>
                            <button type="submit" className="ProfileButton" onClick={CancelChanges}>Cancel Changes</button>
                            <button type="submit" className="ProfileButton" onClick={SaveChanges}>Save Changes</button>
                        </div>}
                </div>
            </div>
        </div>

    )
}

export default AccountInformation