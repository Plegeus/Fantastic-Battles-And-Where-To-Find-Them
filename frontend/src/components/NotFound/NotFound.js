import "./NotFound.css"
import { Link } from 'react-router-dom'


// This will only get rendered if the user entered a non existing url
const NotFound = () => {
    return (
        <div className='not-found'>
            <h1>404 error</h1>
            <p>This page doesn't exist.</p>
            <Link to='/'>Back to the HomePage</Link>
        </div>
    )
}

export default NotFound