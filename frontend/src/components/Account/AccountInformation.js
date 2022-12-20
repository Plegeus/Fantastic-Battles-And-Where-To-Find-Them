import { useState } from "react";
import useFetch from "../../Util/useFetch";
import "./AccountInformationStyles.css"
import Picture from "./Picture";

//fetch user information

const AccountInformation = (props) => {

    const [ProfileDescription, setProfileDescription] = useState("")
    const [IsEditingProfile, setIsEditingProfile] = useState(false)

    const fetchurl = "/api/user/" + props.UsernameAccountPage;
    const { FetchedData, IsLoading, Error } = useFetch(fetchurl, {
        "method": "GET"
    });


    const EditProfile = () => {
        setIsEditingProfile(true)
        setProfileDescription(FetchedData.bio)
    }

    const CancelChanges = () => {
        setIsEditingProfile(false)
        setProfileDescription("")
    }

    const SaveChanges = () => {
        setIsEditingProfile(false)
        console.log("post nieuwe description in user")
        console.log(ProfileDescription)
        const fetchurl = "/api/account/" + props.Username + "/edit";
        console.log(fetchurl);
        //post request to update description
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
                {IsLoading && <div>Loading Profile Picture</div>}
                {Error && <div>{Error}</div>}
                {FetchedData && console.log(FetchedData)}
                {FetchedData && <Picture username={props.UsernameAccountPage} />}
            </div>
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
                        {!IsEditingProfile &&
                            <p className="ParagraphDescription">{FetchedData.bio}</p>
                        }
                        {IsEditingProfile &&
                            <input className="InputDescription" type="text" value={ProfileDescription} maxLength="1000"
                                onChange={(e) => { setProfileDescription(e.target.value) }}></input>}
                    </div>
                    <div>
                        {props.Accestoken && !IsEditingProfile && props.Username === props.UsernameAccountPage && <button type="submit" className="ProfileButton" onClick={EditProfile}>Edit Profile</button>}
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