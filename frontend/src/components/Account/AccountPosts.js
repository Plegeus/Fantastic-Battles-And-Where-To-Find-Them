import { useState } from 'react';
import useFetch from '../../Util/useFetch';
import Post from "../Posts/Post"
import "../Posts/PostsStyles.css"


//fetch all posts => filter by username
const AccountPosts = (props) => {

    //const fetchurl = "/user/account/" + props.username;
    const fetchurl = "/user/" + props.UsernameAccountPage + "/battles";
    const { FetchedData, IsLoading, Error } = useFetch(fetchurl, {
        "method": "GET"
    });

    return (
        <div>
            <ul className="AccountPostsList">
                <ul className="TitleList">
                    <p>Title</p>
                    <p>Victor</p>
                    <p>Vanquished</p>
                    <p>Victorious Commander</p>
                    <p>Vanquished Commander</p>
                    <p>Victorious Deaths</p>
                    <p>Vanquished Deaths</p>
                    <p>ID</p>
                </ul>
                { Error && <div>{ Error }</div>}
                { IsLoading && <div>Loading Data...</div>}
                {FetchedData && console.log(FetchedData) && FetchedData}
                {/*FetchedData && FetchedData.battles.map((battlename) => (
                    <li key={battlename}><Post Battlename={battlename} /></li>
                ))*/}

            </ul>
        </div>
    )
}

export default AccountPosts