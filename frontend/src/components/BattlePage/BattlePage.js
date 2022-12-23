import React, { useContext, useEffect, useState } from 'react'
import "./BattlePage.css"
import EpicBattle from './../../resources/pictures/epicBattle.jpg'
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

    const { Accestoken, Username } = useContext(UserContext);
    const [CurrentConditions, setCurrentConditions] = useState(null)
    const [IsEditingBattle, setIsEditingBattle] = useState(false)

    const [BattleName, setBattleName] = useState(null)
    const [BattleDate, setBattleDate] = useState(null)

    const [Victor, setVictor] = useState(null)
    const [VictCommander, setVictCommander] = useState(null)
    const [VictDeaths, setVictDeaths] = useState(null)

    const [Vanquished, setVanquished] = useState(null)
    const [VanqCommander, setVanqCommander] = useState(null)
    const [VanqDeaths, setVanqDeaths] = useState(null)

    const [BattleDescription, setBattleDescription] = useState(null)
    const [BattleLikes, setBattleLikes] = useState(null)

    const EditBattle = () => {
        setIsEditingBattle(true)
        if (!BattleName) {
            setBattleName(FetchedData.battlename)
        }
        if (!Victor) {
            setVictor(FetchedData.winning_faction)
        }
        if (!VictCommander) {
            setVictCommander(FetchedData.winning_commander)
        }
        if (!VictDeaths) {
            setVictDeaths(FetchedData.winning_deaths)
        }
        if (!Vanquished) {
            setVanquished(FetchedData.losing_faction)

        }
        if (!VanqCommander) {
            setVanqCommander(FetchedData.losing_commander)
        }
        if (!VanqDeaths) {
            setVanqDeaths(FetchedData.losing_deaths)
        }
        if (!BattleDescription) {
            setBattleDescription(FetchedData.description)
        }

    }

    const CancelChanges = () => {
        setIsEditingBattle(false)
    }

    const SaveChanges = () => {
        const BattleName = document.getElementById('BattleNameInput').value;
        if (BattleName) {
            setIsEditingBattle(false)
            console.log(BattleDate)
            let body = {
                battlename: BattleName,
                winning_faction: Victor,
                winning_commander: VictCommander,
                winning_deaths: VictDeaths,
                losing_faction: Vanquished,
                losing_commander: VanqCommander,
                losing_deaths: VanqDeaths,
                description: BattleDescription,

            }
            fetch(`/api/account/${Username}/battle/${FetchedData.battlename}/edit`, {
                'method': 'PUT',
                'headers': {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${Accestoken}`,
                },
                'body': JSON.stringify(body),
            })
        }
        else (
            alert("Missing Value: Battlename")
        )
    }

    const [LikedBoolean, setLikedBoolean] = useState(false)
    useEffect(() => {
        if (Username) {
            const fetchurlLked = "/api/battles/liked/" + id + "/" + Username;
            fetch(fetchurlLked, {
                "method": "GET"
            }).then(res => {
                if (!res.ok) {
                    setLikedBoolean(false)
                    //return false
                }
                else if (res.ok) {
                    setLikedBoolean(true)
                    //return true
                }
            })
        }
    }, [LikedBoolean])

    const likePost = () => {
        fetch(`/api/account/${Username}/battle/${FetchedData.battlename}/like`, {
            "method": "POST",
            "headers": {
                "Authorization": `Bearer ${Accestoken}`,
            },
        }).then(async res => {
            setLikedBoolean(true)
            setBattleLikes(BattleLikes + 1)
        });

        console.log("Like de post")
    }

    const unlikePost = () => {
        fetch(`/api/account/${Username}/battle/${FetchedData.battlename}/unlike`, {
            "method": "POST",
            "headers": {
                "Authorization": `Bearer ${Accestoken}`,
            },
        }).then(async res => {
            setLikedBoolean(false)
            setBattleLikes(BattleLikes + 2)
        });

        console.log("Unlike de post")
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
            {FetchedData && console.log(FetchedData.date)}
            {FetchedData &&
                <div id="battleInfo">
                    <div id="topContainer">
                        <img id="battlePic" src={EpicBattle} alt="An Epic Image of a Battle"></img>
                        <div id="battleSummary">
                            <div id="battleTitle">

                                <h2>{BattleName ? BattleName : FetchedData.battlename}</h2><br></br>
<h3>{/*BattleDate ? BattleDate.slice(0, 4) : FetchedData.date*/}</h3>
                                {/*BattleLikes ? <h4>{"rating: " + BattleLikes}</h4> : */<h4>{"rating: " + FetchedData.rating}</h4>}

                            </div>
                            <div id="combatants">
                                <Faction isVictor={true} faction={Victor ? Victor : FetchedData.winning_faction} leader={VictCommander ? VictCommander : FetchedData.winning_commander} deaths={VictDeaths ? VictDeaths : FetchedData.winning_deaths} />
                                <Faction isVictor={false} faction={Vanquished ? Vanquished : FetchedData.losing_faction} leader={VanqCommander ? VanqCommander : FetchedData.losing_commander} deaths={VanqDeaths ? VanqDeaths : FetchedData.losing_deaths} />
                            </div>
                        </div>
                        <div id='likeDiv'>
                            {Accestoken &&
                                <div>
                                    {LikedBoolean ?
                                        <button id="unlikeButton" onClick={() => { unlikePost() }}>
                                            Unlike
                                        </button>
                                        :
                                        <button id="likeButton" onClick={() => { likePost() }}>
                                            Like
                                        </button>
                                    }
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
                            <p>{BattleDescription && BattleDescription !== "" ? BattleDescription : FetchedData.description === null ? "No Description" : FetchedData.description}</p>
                        </div>
                        {CurrentConditions &&
                            <div id="theWeather">
                                <img src={"/WeatherIcons/" + String(CurrentConditions.currentConditions.icon) + ".png"} alt="A weather icon" width="50rem"></img>
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