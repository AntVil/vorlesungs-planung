const constants = require("./constants")

const express = require("express");

const app = express();

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


app.use(express.static(constants.PUBLIC_FOLDER_PATH));


app.post("/login", function (req, res) {
    let token = ""
    for(let i=0;i<10;i++){
        token += chars[Math.floor(Math.random() * chars.length)]
    }
  
    res.send(token);
});


app.listen(constants.PORT, constants.HOST_NAME, function(){
    console.log(`serving on port: ${constants.PORT}`);
});
