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
    console.log(`Name: ${name}`)

    //const [CurrentConditions, setCurrentConditions] = useState(null)
    const { FetchedData, IsLoading, Error } = useFetch(`/api/battles/name/${name}`, {
        "method": "GET"
    })

   
   

   /* function getWeatherData(Latitude, Longitude) {
        const oldkey = "KLKMENPQKWMLJ7GBD3V479YHL";
        const newkey = "DL38D5GUASAXRR8C7DTMWRGSX"
        const fetchUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + Latitude.toString() + "," + Longitude.toString() + "?key=" + newkey;
        const data = fetch(fetchUrl)
        data.then(res => {
            if (!res.ok) {
                // no data
            }
            return res.json();
        }).then(data => {
            setCurrentConditions(data.currentConditions);
            console.log(CurrentConditions);
        })
            .catch(err => {
                //
            })
    }*/


    return (
        <div id="body">
           
            <div id="battleInfo">
                <div id="topContainer">
                    <img id="battlePic" src={EpicBattle} alt="An Epic Image of a Battle"></img>
                    <div id="battleSummary">
                        <div id="battleTitle">
                            <h2>"battlename"</h2><br></br>
                        </div>
                        <div id="combatants">
                            <Faction isVictor={true} faction="{FetchedData.winning_faction}" leader="{FetchedData.winning_commander}" deaths="{FetchedData.winning_deaths}"/>
                            <Faction isVictor={false} faction="{FetchedData.losing_faction}" leader="{FetchedData.losing_commander}" deaths="{FetchedData.losing_deaths}"/>
                        </div>
                    </div>
                    <div id='likeDiv'>
                        <button id="likeButton">
                        </button>
                    </div>
                </div>

                <div id="bottomContainer">
                    <div id="battleDescription">
                        {/* FetchedData.description ? <p>"{FetchedData.description}"</p> : <Undefined text="description"/> */}
                        <p>"description</p> 
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