import { useContext } from "react"
import { useParams } from "react-router-dom"
import Logout from "../Logout/Logout"
import SearchBar from "../SearchBar/SearchBar"
import UserContext from "../User.context"
import AccountInformation from "./AccountInformation"
import "./AccountInformationStyles.css"
import AccountPosts from "./AccountPosts"


//Select all users
const Account = () => {
const { name  } = useParams()

    const {
        Accestoken,
        Username
    } = useContext(UserContext);



    return (
        <div className="AccountContainer">
            <div className="Account">
                <p> {name} </p>
                <SearchBar placeholder="Enter an Account Name..." starturl="/account/" data={["test", "test2", "test3", "test4", "test5", "test7", "test8", "test9"]} />
                {name !== "SearchUser" ? (<div>
                    <AccountInformation username={name}/>
                    <AccountPosts username={name}/>
                </div>) :
                    null}
                {Accestoken && name === Username ?  
                <div className="LogoutContainer"><Logout/></div> : 
                <div className="LogoutContainer"><Logout/></div>}    


            </div>
        </div>
    )
}

export default Account