import { useState } from 'react';

const Post = () => {

  const [posts, setPosts] = useState([
    { title: 'first blog', victor: "roman guy", vanquished: "some tribe", vicCommander: "caesar", vanCommander: "varus", vicDeaths: 20000, vanDeath: 46000, id: 1 },
    { title: 'second blog', victor: "roman guy", vanquished: "some tribe", vicCommander: "caesar", vanCommander: "varus", vicDeaths: 20000, vanDeath: 46000, id: 2 },
    { title: 'third blog', victor: "roman guy", vanquished: "some tribe", vicCommander: "caesar", vanCommander: "varus", vicDeaths: 20000, vanDeath: 46000, id: 3 }
  ]);

  return (
    <div className="AccountPosts">
      {posts.map((battle) => (
        <div className="postPreview" key={battle.id}>
          <ul className='postList'>
            <li>{battle.title}</li>
            <li>{battle.victor}</li>
            <li>{battle.vanquished}</li>
            <li>{battle.vicCommander}</li>
            <li>{battle.vanCommander}</li>
            <li>{battle.vicDeaths}</li>
            <li>{battle.vanDeath}</li>
            <li>{battle.id}</li>
          </ul>

        </div>
      ))}
    </div>
  )
}

export default Post