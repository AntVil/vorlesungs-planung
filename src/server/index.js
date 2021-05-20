const constants = require("./constants");

const express = require("express");

// require filesystem access
const fs = require('fs');

const app = express();

let lecturer = [];
let classes = [];
let calendar = {data:[]};
/*
loadJsondata();
*/
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
    try{
        // get requested month and year
        let month = parseInt(req.body.month);
        let year = parseInt(req.body.year);
        // load json data from file
        let calendarData = fs.readFileSync(`./data/calendar/year_${year}/month_${month}.json`);
        // parse calendardata to object
        let calendar = JSON.parse(calendarData);
        res.json(calendar);
    }catch{
        res.json({data: []});
    }
});

// endpoint to retrieve classesdata
app.get("/getClasses", function (req, res){
    try{
        // load json data from file
        let classesData = fs.readFileSync("./data/classes.json");
        // parse calendardata to object
        let classes = JSON.parse(classesData);
        res.json(classes);
    }catch{
        res.json({data: []});
    }
});

app.post("/addClasses", function (req, res){
    console.log(req.body);
    classes.push(req.body.name);
    fs.writeFile('./data/classes.json', JSON.stringify(classes,null,2), (err)=>{
        if(err){
            console.log(err);
        }
    });
    
    res.status(201).json(classes);
});

// endpoint to retrieve lecturerdata
app.get("/getLecturers", function (req, res){
    try{
        // load json data from file
        let lecturersData = fs.readFileSync("./data/lecturers.json");
        // parse calendardata to object
        let lecturers = JSON.parse(lecturersData);
        res.json(lecturers);
    }catch{
        res.json({data: []});
    }
});

/*
function loadJsondata(){
    // load data from files
    let classesdata = fs.readFileSync('./data/classes.json');
    let calendardata = fs.readFileSync('./data/calendardata.json');
    let lecturerdata = fs.readFileSync('./data/lecturers.json');

    // parse data to objects
     lecturer = JSON.parse(lecturerdata);
     classes = JSON.parse(classesdata);
     calendar = JSON.parse(calendardata);

}
*/

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
