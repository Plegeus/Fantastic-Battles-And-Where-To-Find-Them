
import Video1 from './../../resources/videos/vid1.mp4'
import Video2 from './../../resources/videos/vid2.mp4'
import Video3 from './../../resources/videos/vid3.mp4'
import Video4 from './../../resources/videos/vid4.mp4'
import Video5 from './../../resources/videos/vid5.mp4'
import Video6 from './../../resources/videos/vid6.mp4'

import './style.css'

const WarVideo = () => {
  return(
    <video autoPlay loop muted style={{
      zIndex: "0",
      width: "100%",
      height: "100%",
    }}>
      <source src={Video1} type="video/mp4"></source>
    </video>
  )
}


export default WarVideo
