import { useState } from "react";
import useFetch from "../../Util/useFetch";
import "./AccountInformationStyles.css"
import Picture from "./Picture";



const AccountInformation = (props) => {

    const [ProfileDescription, setProfileDescription] = useState(null)
    const [IsEditingProfile, setIsEditingProfile] = useState(false)

    const fetchurl = "/api/user/" + props.UsernameAccountPage;
    // Fetch all the data about this user
    const { FetchedData, IsLoading, Error } = useFetch(fetchurl, {
        "method": "GET"
    });


    const EditProfile = () => {
        setIsEditingProfile(true)
        if (!ProfileDescription) {
            setProfileDescription(FetchedData.bio)
        }
    }

    const CancelChanges = () => {
        setIsEditingProfile(false)
        setProfileDescription(null)
    }

    // Post request to update the database with this new userinformation, with the Accestoken to make sure that the user is logged in
    const SaveChanges = () => {
        setIsEditingProfile(false)
        const fetchurl = "/api/account/" + props.Username + "/edit";
        fetch(fetchurl, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.Accestoken}`,
            },
            "body": JSON.stringify({
                bio: ProfileDescription
            }),
        })
    }


    return (

        <div className="AccountInformation" >
            <div className="ProfilePicture">
                {/* Load the Profile Picture if there weren't any issues */}
                {IsLoading && <div>Loading Profile Picture</div>}
                {Error && <div>{Error}</div>}
                {FetchedData && console.log(FetchedData)}
                {FetchedData && <Picture username={props.UsernameAccountPage} />}
            </div>
             {/* Load the User Information if there weren't any issues */}
            {IsLoading && <div>Loading account information</div>}
            {Error && <div>{Error}</div>}
            {FetchedData &&
                <div className="generalAccountInfo">
                    <h2 className="AccountName">{FetchedData.username}</h2>
                    <h4 className="emailInformation" >{FetchedData.email}</h4>
                    <div className="Rating">
                        <p>Likes: {FetchedData.rating}</p>
                    </div>
                    <div className="AccountDescription">
                        <h4 className="TitleDescription">Account Description</h4>
                        {!IsEditingProfile && ProfileDescription &&
                            <p className="ParagraphDescription">{ProfileDescription}</p>
                        }
                        {!IsEditingProfile && !ProfileDescription &&
                            <p className="ParagraphDescription">{FetchedData.bio}</p>
                        }
                        {IsEditingProfile &&
                            <input className="InputDescription" type="text" value={ProfileDescription} maxLength="1000"
                                onChange={(e) => { setProfileDescription(e.target.value) }}></input>}
                    </div>
                    <div>
                         {/* If the user is logged in and we aren't in editing mode and we are viewing our own profile, display an edit button */}
                        {props.Accestoken && !IsEditingProfile && props.Username === props.UsernameAccountPage && <button type="submit" className="ProfileButton" onClick={EditProfile}>Edit Profile</button>}
                        {/* If the user is logged in and we are in editing mode and we are viewing our own profile, display a cancel and save button */}
                        {props.Accestoken && IsEditingProfile && props.Username === props.UsernameAccountPage &&
                            <div>
                                <button type="submit" className="ProfileButton" onClick={CancelChanges}>Cancel Changes</button>
                                <button type="submit" className="ProfileButton" onClick={SaveChanges}>Save Changes</button>
                            </div>}
                    </div>
                </div>}
        </div>

    )
}

export default AccountInformation