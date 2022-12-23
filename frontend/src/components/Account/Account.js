import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../../Util/useFetch"
import Logout from "../Logout/Logout"
import SearchBar from "../SearchBar/SearchBar"
import UserContext from "../User.context"
import AccountInformation from "./AccountInformation"
import "./AccountInformationStyles.css"
import AccountPosts from "./AccountPosts"


//Select all users
const Account = () => {
    const { name } = useParams()

    const {
        Accestoken,
        Username
    } = useContext(UserContext);

    // Receive every username to be able to search them on the account page
    const { FetchedData, IsLoading, Error } = useFetch("/api/user/names", {
        "method": "GET"
    })


    return (
        <div className="AccountContainer">
            <div className="Account">
                {IsLoading && <div>Loading...</div>}
                {Error && <div>{Error}</div>}
                {name !== "SearchUser" ?
                    (<div>
                        {/* All the user information, Username,Email,total likes,..   */}
                        <AccountInformation UsernameAccountPage={name} Accestoken={Accestoken} Username={Username}/>
                        {/* All the posts made by the user  */}
                        <AccountPosts UsernameAccountPage={name} Accestoken={Accestoken} Username={Username}/>
                    </div>) :
                    ""}
                {FetchedData && <SearchBar placeholder="Enter Account Name" starturl="/account/" data={FetchedData} />}
                {/* If the user is Logged in and he is viewing his own profile, he will see the Logout button  */}
                {Accestoken && name === Username ?
                    <div className="LogoutContainer">
                        <Logout />
                    </div> :
                    null}
            </div>
        </div>
    )
}

export default Account