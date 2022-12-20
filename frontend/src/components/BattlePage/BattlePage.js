import React, { useContext, useState } from 'react'
import "./BattlePage.css"
import EpicBattle from './../../resources/pictures/epicBattle.png'
import { useParams } from 'react-router-dom'
import useFetch from '../../Util/useFetch'
import UserContext from '../User.context'
import "./EditBattlePage.css";


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
    const { id } = useParams()
    const { FetchedData, IsLoading, Error } = useFetch(`/api/battles/id/${id}`, {
        "method": "GET"
    })

    const { Accestoken,Username } = useContext(UserContext);
    const [CurrentConditions, setCurrentConditions] = useState(null)
    const [IsEditingBattle, setIsEditingBattle] = useState(false)

    const [BattleName, setBattleName] = useState(" ")

    const [Victor, setVictor] = useState(" ")
    const [VictCommander, setVictCommander] = useState(" ")
    const [VictDeaths, setVictDeaths] = useState(" ")

    const [Vanquished, setVanquished] = useState(" ")
    const [VanqCommander, setVanqCommander] = useState(" ")
    const [VanqDeaths, setVanqDeaths] = useState(" ")

    const [BattleDescription, setBattleDescription] = useState(" ")

    const EditBattle = () => {
        setIsEditingBattle(true)
        setBattleName(FetchedData.battlename)
        setVictor(FetchedData.winning_faction)
        setVictCommander(FetchedData.winning_commander)
        setVictDeaths(FetchedData.winning_deaths)
        setVanquished(FetchedData.losing_faction)
        setVanqCommander(FetchedData.losing_commander)
        setVanqDeaths(FetchedData.losing_deaths)
        setBattleDescription(FetchedData.description)
    }

    const CancelChanges = () => {
        setIsEditingBattle(false)
    }

    const SaveChanges = () => {
        const BattleName = document.getElementById('BattleNameInput').value;
        if (BattleName) {
            setIsEditingBattle(false)
        }
        else (
            alert("Missing Value: Battlename")
        )
    }

    const [LikedBoolean, setLikedBoolean] = useState(false)
    const getLikedBoolean = () => {
        /*fetch("url", {
            method: "POST"
        }).then(async res => {
            const data = await res.json();
            console.log(data);
        });*/
        console.log("Verkrijg boolean of user de post heeft geliked of niet")
    }

    const likePost = () => {
        
        fetch(`/api/account/${Username}/battle/like`, {
            "method": "POST",
            "body": JSON.stringify({
                battlename: FetchedData.battlename
            })
        }).then(async res => {
            const data = await res.json();
            console.log(data);
        });
        setLikedBoolean(true)
        console.log("Like de post")
    }

    const unlikePost = () => {
        /*fetch("url", {
            method: "POST"
        }).then(async res => {
            const data = await res.json();
            console.log(data);
        });*/
        setLikedBoolean(false)
        console.log("Unlike de post")
    }

    const MakeLikeButton = ({ Boolean }) => {
        if (!Boolean) {
            return (
                <button id="likeButton" onClick={() => { likePost() }}>
                    Like
                </button>)
        }
        else {
            return (
                <button id="unlikeButton" onClick={() => { unlikePost() }}>
                    Unlike
                </button>)
        }

    }





    const getWeatherData = () => {
        if (!CurrentConditions && FetchedData) {
            const oldkey = "KLKMENPQKWMLJ7GBD3V479YHL";
            const newkey = "DL38D5GUASAXRR8C7DTMWRGSX"
            const fetchUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + FetchedData.location_y.toString() + "," + FetchedData.location_x.toString() + "?key=" + newkey;
            const data = fetch(fetchUrl)
            data.then(res => {
                if (!res.ok) {
                    console.log("not ok");
                }
                return res.json();
            }).then(data => {
                setCurrentConditions(data);
            })
                .catch(err => {
                    console.log("error");
                })
        }
    }



    if (IsEditingBattle) {
        return (
            <div id="Editbody">
                <form id="battleInfo">
                    <div id="topContainer">
                        <div id="battleSummary">
                            <div id="battleTitle">
                                <label>BattleName:</label>
                                <input type="text" id="BattleNameInput" value={BattleName}
                                    onChange={(e) => { setBattleName(e.target.value) }} required /><br></br>
                            </div>
                            <div id="combatants">
                                <div>
                                    <label>Victor:</label>
                                    <input type="text" id="fname" value={Victor}
                                        onChange={(e) => { setVictor(e.target.value) }} /><br></br>
                                    <label>Victorious Commander:</label>
                                    <input type="text" id="fname" value={VictCommander}
                                        onChange={(e) => { setVictCommander(e.target.value) }} /><br></br>
                                    <label>Victorious Deaths:</label>
                                    <input type="text" id="fname" value={VictDeaths}
                                        onChange={(e) => { setVictDeaths(e.target.value) }} /><br></br>
                                </div>
                                <div>
                                    <label>Vanquished:</label>
                                    <input type="text" id="fname" value={Vanquished}
                                        onChange={(e) => { setVanquished(e.target.value) }} /><br></br>
                                    <label>Vanquished Commander:</label>
                                    <input type="text" id="fname" value={VanqCommander}
                                        onChange={(e) => { setVanqCommander(e.target.value) }} /><br></br>
                                    <label>Vanquished Deaths:</label>
                                    <input type="text" id="fname" value={VanqDeaths}
                                        onChange={(e) => { setVanqDeaths(e.target.value) }} /><br></br>
                                </div>
                            </div>
                        </div>
                        <div id='likeDiv'>
                            {Accestoken &&
                                <div>
                                    <button type="button" id="cancelButton" onClick={CancelChanges}>
                                        Cancel
                                    </button>
                                    <button type="button" id="saveButton" onClick={SaveChanges}>
                                        Save
                                    </button>
                                </div>
                            }
                        </div>
                    </div>

                    <div id="bottomContainer">
                        <div id="battleDescription">
                            <label>Description:</label>
                            <input type="text" id="fname" value={BattleDescription}
                                onChange={(e) => { setBattleDescription(e.target.value) }} /><br></br>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div id="body">
            {FetchedData &&
                <div id="battleInfo">
                    <div id="topContainer">
                        <img id="battlePic" src={EpicBattle} alt="An Epic Image of a Battle"></img>
                        <div id="battleSummary">
                            <div id="battleTitle">
                                <h2>{FetchedData.battlename}</h2><br></br>
                            </div>
                            <div id="combatants">
                                <Faction isVictor={true} faction={FetchedData.winning_faction} leader={FetchedData.winning_commander} deaths={FetchedData.winning_deaths} />
                                <Faction isVictor={false} faction={FetchedData.losing_faction} leader={FetchedData.losing_commander} deaths={FetchedData.losing_deaths} />
                            </div>
                        </div>
                        <div id='likeDiv'>
                            {Accestoken &&
                                <div>
                                    <MakeLikeButton Boolean={LikedBoolean}/>
                                    {!IsEditingBattle &&
                                        <button id="editButton" onClick={EditBattle}>
                                            Edit
                                        </button>}
                                </div>
                            }
                            {!CurrentConditions && <button className="WeatherButton" onClick={() => { getWeatherData() }}>Weather</button>}
                        </div>
                    </div>

                    <div id="bottomContainer">
                        <div id="battleDescription">
                            <p>{FetchedData.description === null ? "No Description" : FetchedData.description}</p>
                        </div>
                        {CurrentConditions &&
                            <div id="theWeather">
                                <img id="battlePic" src={"/WeatherIcons/" + String(CurrentConditions.currentConditions.icon) + ".png"} alt="A weather icon" width="50rem"></img>
                                <p>Current Temperature: {Math.round((CurrentConditions.currentConditions.temp - 32) * 5 / 9)}° Celsius </p>
                                <p>Current Weather Condition: {CurrentConditions.currentConditions.conditions} </p>
                                <p>Current Weather Description {CurrentConditions.description} </p>
                            </div>
                        }
                    </div>
                </div>}
        </div>
    )
}

export default BattlePage