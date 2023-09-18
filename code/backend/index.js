const express = require("express")
const app = express()
const cors = require("cors")
const port = 5000

app.use(cors())
app.use(express.json())

const example = [
    {
        "day": "01",
        "hours": [
            {
                "time": "00:00",
                "celsius": 3
            },
        ]
    },
    {
        "day": "02",
        "hours": [
            {
                "time": "00:00",
                "celsius": 3
            },
        ]
    },
]

app.post("/weather", async (req, res) => {
    const lat = req.body["lat"] 
    const lon = req.body["lon"]

    const weather = await fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)

    const weatherJson = await weather.json()

    let Day = []
    let total_day = []
    for (let i = 0; i < weatherJson.timeSeries.length; i++) {
        let day = weatherJson.timeSeries[i].validTime.slice(8, 10);
        let time = weatherJson.timeSeries[i].validTime.slice(11, 16);
        let celsius = weatherJson.timeSeries[i].parameters[10].values[0];

        let o = i + 1
        let test = {"time": time, "celsius": celsius}
        Day.push(test)
        
        if (o >= weatherJson.timeSeries.length) {
            o -= 1
            const dayJSON = total_day
            // console.log("total day", total_day)
            // console.log("dayJSON", dayJSON)
            res.json(dayJSON)
        }

        if (Number(day) != Number(weatherJson.timeSeries[o].validTime.slice(8, 10))) {
            let insert_day = {"day": day, "hours": Day}
            total_day.push(insert_day)
            Day = []
        }
    }
})

app.listen(port, () => {
    console.log("server started on port:", port)
})