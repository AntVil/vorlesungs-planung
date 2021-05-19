const constants = require("./constants");

const express = require("express");

// require filesystem access
const fs = require('fs');

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
    // get requested month and year
    let month = req.body.month;
    let year = req.body.year; 
    // load json data from file
    let calendardata = fs.readFileSync('./data/calendardata.json');
    // parse calendardata to object
    let calendar = JSON.parse(calendardata);
    // filter by month and year
    let returndata = calendar.data.filter(x => x.month == month && x.year == year);
    // return filtered data
    res.json({data:returndata});
});
// endpoint to retrieve classesdata
app.get("/getClasses", function (req, res){
    // load json data from file
    let classesdata = fs.readFileSync('./data/classes.json');
     // parse calendardata to object
    let classes = JSON.parse(classesdata);
    // return data
    res.json(classes);
});



// endpoint to retrieve lecturerdata
app.get("/getLecturers", function (req, res){
    // load json data from file
    let lecturerdata = fs.readFileSync('./data/lecturers.json');
    // parse calendardata to object
    let lecturer = JSON.parse(lecturerdata);
    // return data
    res.json(lecturer);
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
