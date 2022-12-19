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
          <tr>
              <td>Name</td>
              <td>Victor</td>
              <td>Vanquished</td>
              <td>Victorious Commander</td>
              <td>Vanquished Commander</td>
              <td>Victorious deaths</td>
              <td>Vanquished deaths</td>
          </tr>
          <tr>
              <td>Name</td>
              <td>Victor</td>
              <td>Vanquished</td>
              <td>Victorious Commander</td>
              <td>Vanquished Commander</td>
              <td>Victorious deaths</td>
              <td>Vanquished deaths</td>
          </tr>
          <tr>
              <td>Name</td>
              <td>Victor</td>
              <td>Vanquished</td>
              <td>Victorious Commander</td>
              <td>Vanquished Commander</td>
              <td>Victorious deaths</td>
              <td>Vanquished deaths</td>
          </tr>
          <tr>
              <td>Name</td>
              <td>Victor</td>
              <td>Vanquished</td>
              <td>Victorious Commander</td>
              <td>Vanquished Commander</td>
              <td>Victorious deaths</td>
              <td>Vanquished deaths</td>
          </tr>
        </table>
      </div>
        </div>
    )
}

export default AccountPosts