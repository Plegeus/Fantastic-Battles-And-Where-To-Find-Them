import { useState } from 'react';
import useFetch from '../../Util/useFetch';
import Post from "../Posts/Post"
import "../Posts/PostsStyles.css"

const AccountPosts = () => {

    const [posts, setPosts] = useState([
        { title: 'first blog', victor: "roman guy", vanquished: "some tribe", vicCommander: "caesar", vanCommander: "varus", vicDeaths: 20000, vanDeath: 46000, id: 1 },
        { title: 'second blog', victor: "roman guy", vanquished: "some tribe", vicCommander: "caesar", vanCommander: "varus", vicDeaths: 20000, vanDeath: 46000, id: 2 },
        { title: 'third blog', victor: "roman guy", vanquished: "some tribe", vicCommander: "caesar", vanCommander: "varus", vicDeaths: 20000, vanDeath: 46000, id: 3 }
    ]);

    const { FetchedData, IsLoading, Error } = useFetch("http://localhost:8000/account");

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
                {FetchedData && FetchedData.map((battle) => (
                    <li><Post battleInformation={battle} /></li>
                ))}
            </ul>
        </div>
    )
}

export default AccountPosts