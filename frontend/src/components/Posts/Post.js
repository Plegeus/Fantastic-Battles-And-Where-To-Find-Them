import { useState } from 'react';
import "./PostsStyles.css"

const Post = (props) => {

  const battle = props.battleInformation

  return (
    <div className="postPreview" key={battle.id}>
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