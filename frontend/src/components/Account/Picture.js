import { useEffect, useState } from "react"
import Map from "../Map/Map"

import Image1 from './../../resources/pictures/images-1.jpeg'
import Image2 from './../../resources/pictures/images-2.jpeg'
import Image3 from './../../resources/pictures/images-3.jpeg'
import Image4 from './../../resources/pictures/images-4.jpeg'
import Image5 from './../../resources/pictures/images-5.jpeg'
import Image6 from './../../resources/pictures/images-6.jpeg'
import Image7 from './../../resources/pictures/images-7.jpeg'
import Image8 from './../../resources/pictures/ambiorix.png'
import Image9 from './../../resources/pictures/chasseurs_ardenais.jpg'
import Image10 from './../../resources/pictures/De-Bono.jpg'
import Image11 from './../../resources/pictures/degaulle.jpg'
import Image12 from './../../resources/pictures/Dumitrescu.jpg'
import Image13 from './../../resources/pictures/eisenhower.jpg'
import Image14 from './../../resources/pictures/Guderian.jpg'
import Image15 from './../../resources/pictures/Jodl.jpg'
import Image16 from './../../resources/pictures/Kai-Shek.jpg'
import Image17 from './../../resources/pictures/Keitl.jpg'
import Image18 from './../../resources/pictures/macarthur.jpg'
import Image19 from './../../resources/pictures/Mannerheim.png'
import Image20 from './../../resources/pictures/marshall.jpg'
import Image21 from './../../resources/pictures/monty.jpg'
import Image22 from './../../resources/pictures/patton.jpg'
import Image23 from './../../resources/pictures/pilecki.jpg'
import Image24 from './../../resources/pictures/Raginis.jpg'
import Image25 from './../../resources/pictures/Richthofen1.jpg'
import Image26 from './../../resources/pictures/RIchthofen2.jpg'
import Image27 from './../../resources/pictures/rommel.jpg'
import Image28 from './../../resources/pictures/rundstedt.jpg'
import Image29 from './../../resources/pictures/San.jpg'
import Image30 from './../../resources/pictures/SHukhveysch.jpg'
import Image31 from './../../resources/pictures/Tito.jpg'
import Image32 from './../../resources/pictures/Tojo.jpg'
import Image33 from './../../resources/pictures/Trenchard.jpg'
import Image34 from './../../resources/pictures/Winkelman.jpg'
import Image35 from './../../resources/pictures/Yamamoto.jpg'
import Image36 from './../../resources/pictures/zhukov.jpg'
import Image37 from './../../resources/pictures/panzer.jpg'

const Images = [
  Image8, Image9, Image10, Image11, Image12, Image13, Image14, Image15, Image16, Image17, Image18, Image19, Image20, Image21, Image22, Image23, Image24, Image25, Image26, Image27, Image28, Image29, Image30, Image31, Image32, Image33, Image34, Image35, Image36, Image37
]


const Picture = ({username}) => {

  // from stackoverflow:
  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

  function hash(str) {
    var hash = 0,
    i, chr;
    if (str == "FalconKnight54"){
      hash = 45
    }
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  return(
    <img src={Images[hash(username) % Images.length]}>
    </img>
  )
}


export default Picture

