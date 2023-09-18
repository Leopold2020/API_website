import React, { Fragment, useEffect, useState } from "react";

const Manager = () => {
    const [Lat, setLat] = useState();
    const [Lon, setLon] = useState();
    const [weather, setWeather] = useState([]);
    
    const example = [
        {
            "day": "example day",
            "hours": [
                {  
                    "time": "example time",
                    "celsius": "example celsius"
                },
            ]
        }
    ]

    const getWeather = async() => {
        // event.preventDefault()

        const data = await fetch("http://localhost:5000/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lat: Lat,
                lon: Lon
            })
        })
        const dataJson = await data.json()
        setWeather(dataJson)
    }

    useEffect(() => {
        // setLat(59.3293)
        // setLon(18.0686)
        // getWeather();
        const exampleJSON = example
        setWeather(exampleJSON)
    }, [])

    return(
        <Fragment>
        <button onClick={getWeather}>test</button>

        <textarea onChange={event => setLat(event.target.value)}></textarea>
        <textarea onChange={event => setLon(event.target.value)}></textarea>

        
        <div>
        {Object.keys(weather).map(day => {
            return (
                <div>
                <div>
                    <div>day: {day}</div>
                </div>
                {weather[day].hours.map(hour => {
                    return (
                        <div>
                            <div>time: {hour.time} temp: {hour.celsius}</div>
                        </div>
                    )
                })}
                </div>
                )
                })
            }
            {/* {weather.map(day => {
            
                    <div>
                    <div>
                        <div>{day.day}</div>
                    </div>
                    {day.hours.map(hour => {
                            <div>
                                <div>{hour.time}</div>
                                <div>{hour.celsius}</div>
                            </div>
                    })}
                    </div>
                    
                    })

            } */}


            

        </div>

        </Fragment>
    )
}

export default Manager