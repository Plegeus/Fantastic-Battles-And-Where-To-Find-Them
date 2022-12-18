
import Video from './../../resources/videos/016708093-world-war-ii-color-footage-b24.mp4'
import './style.css'

const WarVideo = () => {
  return(
    <video autoPlay loop muted style={{
      zIndex: "0",
      width: "100%",
      height: "100%",
    }}>
      <source src={Video} type="video/mp4"></source>
    </video>
  )
}


export default WarVideo
