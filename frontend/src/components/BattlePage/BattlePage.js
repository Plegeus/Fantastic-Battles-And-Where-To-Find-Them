import React, { useState } from 'react'
import "./BattlePage.css"
import EpicBattle from './../../resources/pictures/epicBattle.png'
import { useParams } from 'react-router-dom'
import useFetch from '../../Util/useFetch'


const Undefined = ({ text }) => {
    return <p style={{ color: "gray" }}>{text}</p>
}
const Faction = ({ isVictor, faction, leader, deaths }) => {
    return (
        <div id={isVictor ? "battleVictors" : "battleVanquished"}>
            <h3>{isVictor ? "The Victors:" : "The Vanquished:"}</h3>
            {faction ? <p>{faction}</p> : <Undefined text="faction unknown" />}
            {leader ? <p>led by {leader}</p> : <Undefined text="leader unknown" />}
            {deaths || deaths === 0 ? <p>taking {deaths} losses</p> : <Undefined text="deaths unknown" />}
        </div>
    )
}


const BattlePage = () => {
    const { name } = useParams()
    console.log(`Name: ${name}`)

    const [CurrentConditions, setCurrentConditions] = useState(null)

    const { FetchedData, IsLoading, Error } = useFetch(`/api/battles/name/${name}`, {
        "method": "GET"
    })




    const getWeatherData = () => {
        console.log("enter get weather data function")
        if (!CurrentConditions && FetchedData) {
            const oldkey = "KLKMENPQKWMLJ7GBD3V479YHL";
            const newkey = "DL38D5GUASAXRR8C7DTMWRGSX"
            const fetchUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + FetchedData.location_x.toString() + "," + FetchedData.location_y.toString() + "?key=" + newkey;
            const data = fetch(fetchUrl)
            data.then(res => {
                if (!res.ok) {
                    console.log("not ok");
                    // no data
                }
                return res.json();
            }).then(data => {
                setCurrentConditions(data);
                console.log(CurrentConditions);
            })
                .catch(err => {
                    console.log("error");
                    
                })
        }
    }


    return (
        <div id="body">
            {FetchedData &&
                <div id="battleInfo">
                    <div id="topContainer">
                        <img id="battlePic" src={EpicBattle} alt="An Epic Image of a Battle"></img>
                        <div id="battleSummary">
                            <div id="battleTitle">
<<<<<<< HEAD
                                <h2>{FetchedData.battlename}</h2><br></br>
=======
                                <h2>{name}</h2><br></br>
>>>>>>> refs/remotes/origin/main
                            </div>
                            <div id="combatants">
                                <Faction isVictor={true} faction={FetchedData.winning_faction} leader={FetchedData.winning_commander} deaths={FetchedData.winning_deaths} />
                                <Faction isVictor={false} faction={FetchedData.losing_faction} leader={FetchedData.losing_commander} deaths={FetchedData.losing_deaths} />
                            </div>
                        </div>
                        <div id='likeDiv'>
                            <button id="likeButton">
                                Like
                            </button>
                            <button id="editButton">
                                Edit
                            </button>
                            <button id="saveButton">
                                Save
                            </button>
                            {!CurrentConditions &&<button className="WeatherButton" onClick={getWeatherData}>Weather</button>}
                        </div>
                    </div>

                    <div id="bottomContainer">
                        <div id="battleDescription">
                            <p>{FetchedData.description}</p>
                        </div>
                        {CurrentConditions &&
                            <div id="theWeather">
                                <img id="battlePic" src={"/WeatherIcons/" + String(CurrentConditions.currentConditions.icon) + ".png"} alt="A weather icon" width="50rem"></img>
                                <p>Current Temperature: { Math.round((CurrentConditions.currentConditions.temp - 32) * 5/9)}° Celsius </p>
                                <p>Current Weather Condition: { CurrentConditions.currentConditions.conditions } </p>
                                <p>Current Weather Description { CurrentConditions.description } </p>
                            </div>
                        }
                    </div>
                </div>}
        </div>
    )
}

export default BattlePage