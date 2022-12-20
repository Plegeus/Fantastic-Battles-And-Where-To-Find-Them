import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../Util/useFetch';
import Post from "../Posts/Post"
import "../Posts/PostsStyles.css"
import "./AccountPostsStyles.css"


//fetch all posts => filter by username
const AccountPosts = (props) => {

  //const fetchurl = "/user/account/" + props.username;
  const fetchurl = "/api/user/" + props.UlosernameAccountPage + "/battles";
  /*const { FetchedData, IsLoading, Error } = useFetch(fetchurl, {
    "method": "GET"
  });*/

  const { FetchedData, IsLoading, Error } = useFetch("/api/battles/filter", {
    "method": "POST",
    "Body": {}
  })

  return (
    <div id="accountPosts">
      <div id="listView">
        <table id="battle-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Victor</th>
              <th>Vanquished</th>
              <th>Victorious Commander</th>
              <th>Vanquished Commander</th>
              <th>Victorious deaths</th>
              <th>Vanquished deaths</th>
            </tr>
          </thead>
          <tbody>
            {FetchedData && FetchedData.map((battle) => (
              <tr>
                <td><Link to={`/BattlePage/${battle.id}`}>{battle.battlename}</Link></td>
                <td>{battle.winning_faction}</td>
                <td>{battle.losing_faction}</td>
                <td>{battle.winning_commander}</td>
                <td>{battle.losing_commander}</td>
                <td>{battle.winning_deaths}</td>
                <td>{battle.losing_deaths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="tileView" class="grid-container">
      {FetchedData && FetchedData.map((battle) => (
          <Link key={battle.id} to={`/BattlePage/${battle.id}`} className="grid-item">{battle.battlename}</Link>
        ))}
      </div>
    </div>
  )
}

export default AccountPosts