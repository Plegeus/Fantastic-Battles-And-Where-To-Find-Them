import { useContext } from "react"
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

    const { FetchedData, IsLoading, Error } = useFetch("insert juiste url");

    return (
        <div className="AccountContainer">
            <div className="Account">
                {/*IsLoading && <div>Loading...</div>}
                {Error && <div>{Error}</div> */}
                {FetchedData && console.log(FetchedData)}
                <SearchBar placeholder="Enter Account Name" starturl="/account/" data={["test", "test2", "test3", "test4", "test5", "test7", "test8", "test9"]} />
                {name !== "SearchUser" ?
                    (<div>
                        <AccountInformation username={name} />
                        <AccountPosts username={name} />
                    </div>) :
                    ""}
                {Accestoken && name === Username ?
                    <div className="LogoutContainer"><Logout /></div> :
                    null}
            </div>
        </div>
    )
}

export default Account