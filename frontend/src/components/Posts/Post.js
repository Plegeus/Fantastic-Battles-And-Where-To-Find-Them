import { useState } from 'react';
import useFetch from '../../Util/useFetch';
import "./PostsStyles.css"

const Post = (props) => {

  const battle = props.Battlename

  const fetchurl = "/battles/name/" + props.Battlename;
  const { FetchedData, IsLoading, Error } = useFetch(fetchurl, {
    "method": "GET"
  });



  return (
    <div className="postPreview" key={battle.id}>
      {Error && <div>{Error}</div>}
      {IsLoading && <div>Loading Data...</div>}
      {!Error && !IsLoading && console.log('should be working')}
      {FetchedData && console.log(FetchedData)}
      <ul className='postList'>
        <p>{battle.title}</p>
        <p>{battle.victor}</p>
        <p>{battle.vanquished}</p>
        <p>{battle.vicCommander}</p>
        <p>{battle.vanCommander}</p>
        <p>{battle.vicDeaths}</p>
        <p>{battle.vanDeath}</p>
        <p>{battle.id}</p>
      </ul>
    </div>
  )
}

export default Post