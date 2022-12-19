import React, { useState } from 'react'
import "./BattlePage.css"
import EpicBattle from './../../resources/pictures/epicBattle.png'
import { useParams } from 'react-router-dom'
import useFetch from '../../Util/useFetch'


const Undefined = ({text}) => {
    return <p style={{color: "gray"}}>{text}</p>
}
const Faction = ({isVictor, faction, leader, deaths}) => {
    return(
        <div id={isVictor ? "battleVictors" : "battleVanquished" }>
            <h3>{isVictor ? "The Victors:" : "The Vanquished:"}</h3>
            {faction ? <p>{faction}</p> : <Undefined text="faction unknown"/>}
            {leader ? <p>led by {leader}</p> : <Undefined text="leader unknown"/>}
            {deaths || deaths === 0 ? <p>taking {deaths} losses</p> : <Undefined text="deaths unknown"/>}
        </div>
    )
}


const BattlePage = () => {
  
    const { name } = useParams()

    const { FetchedData, IsLoading, Error } = useFetch(`/api/battles/name/${name}`, {
        "method": "GET"
    })

    console.log("FOOOO")
    console.log(FetchedData)

    const [CurrentConditions, setCurrentConditions] = useState(null)


    function getWeatherData(Latitude,Longitude) {
        const fetchUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + Latitude.toString() + "," + Longitude.toString() + "?key=KLKMENPQKWMLJ7GBD3V479YHL";
        const data = fetch(fetchUrl)
        data.then(res => res.json())
            .then(dat => {
                if (dat) {
                    setCurrentConditions(dat.currentConditions);
                    console.log(CurrentConditions);
                } else {

                }
            })
    }


    return (
        <div id="body">
            <div id="battleInfo">
                <div id="topContainer">

                    <img id="battlePic" src={EpicBattle} alt="An Epic Image of a Battle"></img>
                    <div id="battleSummary">
                        <div id="battleTitle">
                            <h2>{FetchedData.battlename}</h2><br></br>
                        </div>
                        <div id="combatants">
                            <Faction isVictor={true} faction={FetchedData.winning_faction} leader={FetchedData.winning_commander} deaths={FetchedData.winning_deaths}/>
                            <Faction isVictor={false} faction={FetchedData.losing_faction} leader={FetchedData.losing_commander} deaths={FetchedData.losing_deaths}/>
                        </div>
                    </div>
                    <div id='likeDiv'>
                        <button id="likeButton">
                        </button>
                    </div>
                </div>

                <div id="bottomContainer">
                    <div id="battleDescription">
                        { FetchedData.description ? <p>{FetchedData.description}</p> : <Undefined text="description"/> }
                    </div>
                    <div id="theFuckingWeather">
                        <p>Current weather on this position: </p>
                        <p>very hot</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BattlePage