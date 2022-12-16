import { useContext } from "react"
import SearchBar from "../SearchBar/SearchBar"
import UserContext from "../User.context"
import AccountInformation from "./AccountInformation"
import "./AccountInformationStyles.css"
import AccountPosts from "./AccountPosts"

const Account = () => {
    const {
        Accestoken,
        Username
    } = useContext(UserContext);

    return (
        <div className="AccountContainer">
            <div className="Account">
                <SearchBar placeholder="Enter an Account Name..." starturl="/account/" data={["test", "test2", "test3", "test4", "test5", "test7", "test8", "test9"]} />
                {true ? (<div> {/*Accestoken */}
                    <AccountInformation />
                    <AccountPosts />
                </div>) :
                    null}


            </div>
        </div>
    )
}

export default Account