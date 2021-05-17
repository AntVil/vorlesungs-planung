const constants = require("./constants")

const express = require("express");

const app = express();

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


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
    // returns dummy-data
    res.send(
        JSON.stringify({
            data: [
                {
                    id: 123456789,
                    type: "lecture",
                    lecturer: "Herr Behrends",
                    start: new Date(
                        2021,
                        5,
                        13,
                        9,
                        0
                    ).toUTCString(),
                    end: new Date(
                        2021,
                        5,
                        12,
                        12,
                        0
                    ).toUTCString(),
                    location: "",
                    accepted: false
                },
                {
                    id: 987654321,
                    type: "lecture",
                    lecturer: "Herr Behrends",
                    start: new Date(
                        2021,
                        5,
                        13,
                        9,
                        0
                    ).toUTCString(),
                    end: new Date(
                        2021,
                        5,
                        12,
                        12,
                        0
                    ).toUTCString(),
                    location: "",
                    accepted: false
                },
                {
                    id: 918273645,
                    type: "test",
                    lecturer: "Herr Behrends",
                    start: new Date(
                        2021,
                        5,
                        12,
                        9,
                        0
                    ).toUTCString(),
                    end: new Date(
                        2021,
                        5,
                        12,
                        12,
                        0
                    ).toUTCString(),
                    location: "",
                    accepted: true
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
