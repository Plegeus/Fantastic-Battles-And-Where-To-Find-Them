import { useState } from 'react';
import useFetch from '../../Util/useFetch';
import Post from "../Posts/Post"
import "../Posts/PostsStyles.css"


//fetch all posts => filter by username
const AccountPosts = (props) => {

    const [posts, setPosts] = useState([
        { title: 'first blog', victor: "roman guy", vanquished: "some tribe", vicCommander: "caesar", vanCommander: "varus", vicDeaths: 20000, vanDeath: 46000, id: 1 },
        { title: 'second blog', victor: "roman guy", vanquished: "some tribe", vicCommander: "caesar", vanCommander: "varus", vicDeaths: 20000, vanDeath: 46000, id: 2 },
        { title: 'third blog', victor: "roman guy", vanquished: "some tribe", vicCommander: "caesar", vanCommander: "varus", vicDeaths: 20000, vanDeath: 46000, id: 3 }
    ]);

    //const fetchurl = "/user/account/" + props.username;
    const fetchurl = "/account/user/" + props.username;
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
                {FetchedData && console.log(FetchedData)}
                {FetchedData && FetchedData.battles.map((battlename) => (
                    <li key={battlename}><Post Battlename={battlename} /></li>
                ))}

            </ul>
        </div>
    )
}

export default AccountPosts