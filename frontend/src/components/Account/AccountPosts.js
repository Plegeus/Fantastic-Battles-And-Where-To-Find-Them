import { useState } from 'react';
import useFetch from '../../Util/useFetch';
import Post from "../Posts/Post"
import "../Posts/PostsStyles.css"


//fetch all posts => filter by username
const AccountPosts = (props) => {

    //const fetchurl = "/user/account/" + props.username;
    const fetchurl = "/api/user/" + props.UsernameAccountPage + "/battles";
    const { FetchedData, IsLoading, Error } = useFetch(fetchurl, {
        "method": "GET"
    });

    return (
        <div>
            account
        </div>
    )
}

export default AccountPosts