// internal imports
const constants = require("./constants");

// external imports
const express = require("express");
const fs = require('fs');

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const app = express();

app.use(express.json());
app.use(express.static(constants.PUBLIC_FOLDER_PATH));


// entry point for logging in as a admin, lecturer or student
app.post("/login", function (req, res) {
    let token = null;
    try{
        let type = req.body.type;
        let username = req.body.username;
        let password = req.body.password;

        // hashing password (just a dummy hash)
        let hash = 0;
        for(let i=0;i<password.length;i++){
            hash = (Math.imul(31, hash) + password.charCodeAt(i)) | 0;
        }
        hash = String(hash);

        if(type == "admin"){
            let admins = JSON.parse(fs.readFileSync("./data/users/admins.json")).users;
            for(let i=0;i<admins.length;i++){
                if(admins[i].username == username){
                    if(admins[i].hash == hash){
                        token = admins[i].token;
                    }
                    break;
                }
            }
        }else if(type == "lecturer"){
            let lecturers = JSON.parse(fs.readFileSync("./data/users/lecturers.json")).users;
            for(let i=0;i<lecturers.length;i++){
                if(lecturers[i].username == username){
                    if(lecturers[i].hash == hash){
                        token = lecturers[i].token;
                    }
                    break;
                }
            }
        }else if(type == "student"){
            let students = JSON.parse(fs.readFileSync("./data/users/students.json")).users;
            for(let i=0;i<students.length;i++){
                if(students[i].id == username){
                    token = students[i].token;
                    break;
                }
            }
        }else{
            token = null;
        }
    }catch{
        token = null;
    }

    if(token != null){
        res.json({
            "status": "successful",
            "token": token
        });
    }else{
        res.json({
            "status": "failed",
            "token": ""
        });
    }
});


// unfinished
app.post("/getCalendar", function (req, res) {
    try{
        // get requested month and year
        let month = parseInt(req.body.month);
        let year = parseInt(req.body.year);
        // load json data from file
        let calendarData = fs.readFileSync(`./data/calendar/year_${year}/month_${month}.json`);
        // parse String to object
        let calendar = JSON.parse(calendarData);
        res.json(calendar);
    }catch{
        res.json({"data": []});
    }
});

// endpoint to retrieve classesdata
app.get("/getClasses", function (req, res){
    try{
        // load json data from file
        let classesData = fs.readFileSync("./data/classes.json");
        // parse String to object
        let classes = JSON.parse(classesData);
        res.json({"data": Object.keys(classes.classes)});
    }catch{
        res.json({"data": []});
    }
});

// endpoint to add class
app.post("/addClass", function (req, res){
    let name = req.body.name;

    let classes = JSON.parse(fs.readFileSync("./data/classes.json"));

    let token = "";
    for(let i=0;i<12;i++){
        token += chars[Math.floor(Math.random() * chars.length)];
    }

    classes.classes[name] = token;

    fs.writeFileSync("./data/classes.json", JSON.stringify(classes, null, 4) + "\n");

    res.status(201).json(classes);
});

// endpoint to retrieve lecturerdata
app.get("/getLecturers", function (req, res){
    try{
        // load json data from file
        let lecturersData = fs.readFileSync("./data/users/lecturers.json");
        // parse String to object
        let lecturers = JSON.parse(lecturersData).users;
        for(let i=0;i<lecturers.length;i++){
            lecturers[i] = lecturers[i].username;
        }
        res.json({"data": lecturers});
    }catch{
        res.json({"data": []});
    }
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
