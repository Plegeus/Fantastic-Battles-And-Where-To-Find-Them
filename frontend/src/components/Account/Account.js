import Post from "../Posts/Post"
import AccountInformation from "./AccountInformation"
import "./AccountInformationStyles.css"

const Account = () => {
    return (
        <div className="AccountContainer">
            <div className="Account">
                <AccountInformation />
                <Post/>
            </div>
        </div>
    )
}

export default Account