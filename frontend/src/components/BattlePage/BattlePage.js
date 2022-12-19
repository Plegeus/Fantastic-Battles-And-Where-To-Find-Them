import React, { useState } from 'react'
import "./BattlePage.css"
import EpicBattle from './../../resources/pictures/epicBattle.png'


const BattlePage = () => {

    const [CurrentConditions, setCurrentConditions] = useState(null)


    function getWeatherData(Latitude, Longitude) {
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
    }


    return (
        <div id="body">
            <div id="battleInfo">
                <div id="topContainer">
                    <img id="battlePic" src={EpicBattle} alt="An Epic Image of a Battle"></img>
                    <div id="battleSummary">
                        <div id="battleTitle">
                            <h2>The Epic Battle of Britain</h2><br></br>
                        </div>
                        <div id="combatants">
                            <div id="battleVictors">
                                <h3>The Victors:</h3>
                                <p>The British Empire</p>
                                <p>Led by sir Falcon, the Fifty-fourth</p>
                                <p>taking 12,000 losses</p><br></br>
                            </div>
                            <div id="battleVanquished">
                                <h3>The Vanquished:</h3>
                                <p>The German Reich</p>
                                <p>led by Reichsmarshall Erwin Rommel</p>
                                <p>taking 473,051 losses</p><br></br>
                            </div>
                        </div>
                    </div>
                    <div id='likeDiv'>
                        <button id="likeButton">
                        </button>
                    </div>
                </div>

                <div id="bottomContainer">
                    <div id="battleDescription">
                        <p>From near and far they arrived, joined the force, ready to serve the allied command. Sent into training, though they already earned their wings. They were ready to fly. They were fit for the fight. Once in the air, the battle begins. They have proven their worth, now they fly for revenge.</p><br></br>
                    </div>

                    {CurrentConditions && <div id="theFuckingWeather">
                        <p>Current weather on this position: </p>
                        <p>very hot</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default BattlePage