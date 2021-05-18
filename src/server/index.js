const constants = require("./constants")

const express = require("express");

const app = express();


const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

app.use(express.json());
app.use(express.static(constants.PUBLIC_FOLDER_PATH));


// unfinished
app.post("/login", function (req, res) {
    let dataKey = ""
    for(let i=0;i<10;i++){
        dataKey += chars[Math.floor(Math.random() * chars.length)]
    }

    res.send(dataKey);
});


// unfinished
app.post("/getCalendar", function (req, res) {
    console.log(req.body);

    res.send(
        JSON.stringify({
            data: [
                {
                    "id": 123,
                    "name": "Python",
                    "location": "xy",
                    "day": 4,
                    "start": 9,
                    "end": 12,
                    "status": "accepted",
                    "lecturer": "Mustermann1",
                    "type": "lecture"
                },
                {
                    "id": 124,
                    "name": "Prolog",
                    "location": "xy",
                    "day": 4,
                    "start": 13,
                    "end": 16,
                    "status": "pending",
                    "lecturer": "Mustermann2",
                    "type": "lecture"
                },
                {
                    "id": 124,
                    "name": "Prolog",
                    "location": "xy",
                    "day": 4,
                    "start": 13,
                    "end": 15,
                    "status": "pending",
                    "lecturer": "Mustermann2",
                    "type": "lecture"
                },
                {
                    "id": 126,
                    "name": "Mathematik",
                    "location": "xy",
                    "day": 6,
                    "start": 10,
                    "end": 12,
                    "status": "accepted",
                    "lecturer": "Mustermann1",
                    "type": "lecture"
                }
            ]
        })
    );
});


// unfinished
app.post("/setAppointment", function (req, res) {
    // returns dummy-data
    res.send(
        JSON.stringify({
            successful: true,
            id: 123456789
        })
    );
});


// unfinished
app.post("/setAppointmentStatus", function (req, res) {
    // returns dummy-data
    res.send(
        JSON.stringify({
            successful: true
        })
    );
});


app.listen(constants.PORT, constants.HOST_NAME, function(){
    console.log(`serving on port: ${constants.PORT}`);
});
