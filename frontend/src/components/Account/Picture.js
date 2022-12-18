import { useEffect, useState } from "react"
import Map from "../Map/Map"

import Image1 from './../../resources/pictures/images-1.jpeg'
import Image2 from './../../resources/pictures/images-2.jpeg'
import Image3 from './../../resources/pictures/images-3.jpeg'
import Image4 from './../../resources/pictures/images-4.jpeg'
import Image5 from './../../resources/pictures/images-5.jpeg'
import Image6 from './../../resources/pictures/images-6.jpeg'
import Image7 from './../../resources/pictures/images-7.jpeg'

const Images = [
  Image1, Image2, Image3, Image4, Image5, Image6, Image7
]


const Picture = ({username}) => {

  // from stackoverflow:
  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  function hash(str) {
    var hash = 0,
    i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  return(
    <img src={Images[hash(username) % Images.length]}>
    </img>
  )
}


export default Picture

