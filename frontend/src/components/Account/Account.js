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
                        <AccountInformation UsernameAccountPage={name} Accestoken={Accestoken} Username={Username}/>
                        <AccountPosts UsernameAccountPage={name} Accestoken={Accestoken} Username={Username}/>
                    </div>) :
                    ""}
                {FetchedData && <SearchBar placeholder="Enter Account Name" starturl="/account/" data={FetchedData} />}
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