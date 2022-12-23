import { Link } from 'react-router-dom';
import useFetch from '../../Util/useFetch';
import "./AccountPostsStyles.css"



const AccountPosts = (props) => {

  // Fetch every battle that the user has made
  const fetchurl = "/api/battles/filter/" + props.UsernameAccountPage;
  const { FetchedData, IsLoading, Error } = useFetch(fetchurl, {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify({
      username: props.UsernameAccountPage
    })
  })

  return (
    <div id="accountPosts">
      <div id="listView">
        <table id="account-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Victor</th>
              <th>Vanquished</th>
              <th>Victorious Commander</th>
              <th>Vanquished Commander</th>
            </tr>
          </thead>
          <tbody>
            {/* Insert every battle that the user made in the table */}
            {FetchedData && FetchedData.map((battle) => (
              <tr key={battle.id}>
                <td><Link to={`/BattlePage/${battle.id}`}>{battle.battlename}</Link></td>
                <td>{battle.winning_faction}</td>
                <td>{battle.losing_faction}</td>
                <td>{battle.winning_commander}</td>
                <td>{battle.losing_commander}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="tileView" className="grid-container">
        {/* Make an a tag for every battle the user made */}
        {FetchedData && FetchedData.map((battle) => (
          <Link key={battle.id} to={`/BattlePage/${battle.id}`} className="grid-item">{battle.battlename}</Link>
        ))}
      </div>
    </div>
  )
}

export default AccountPosts