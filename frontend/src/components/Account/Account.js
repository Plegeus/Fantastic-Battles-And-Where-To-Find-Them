import AccountInformation from "./AccountInformation"
import "./AccountInformationStyles.css"
import AccountPosts from "./AccountPosts"

const Account = () => {
    return (
        <div className="AccountContainer">
            <div className="Account">
                <AccountInformation />
                <AccountPosts/>
            </div>
        </div>
    )
}

export default Account