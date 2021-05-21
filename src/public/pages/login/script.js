// login action
function login(){
    // get correct url for request
    let url = window.location.href.split("/pages")[0] + "/login";

    // get user selection (admin/lecturer/student)
    user_selection_elements = document.getElementsByName("user_selection");
    let user_selection;
    for(let i=0;i<user_selection_elements.length;i++){
        if (user_selection_elements[i].checked) {
            user_selection = user_selection_elements[i].value;
            break;
        }
    }

    // fill in form
    let body;
    if (user_selection == "admin"){
        body = {
            "type": user_selection,
            "username": document.getElementById("admin_username").value,
            "password": document.getElementById("admin_password").value
        }
    }else if(user_selection == "lecturer"){
        body = {
            "type": user_selection,
            "username": document.getElementById("lecturer_username").value,
            "password": document.getElementById("lecturer_password").value
        }
    }else if(user_selection == "student"){
        body = {
            "type": user_selection,
            "username": document.getElementById("student_username").value,
            "password": ""
        }
    }

    // make request
    let loginRequest = new XMLHttpRequest();
    loginRequest.open("POST", url, true);
    loginRequest.setRequestHeader("Content-Type", "application/json");
    
    loginRequest.onload = function () { 
        // save dataKey (used for retrieving data from server)
        
        let response = JSON.parse(loginRequest.responseText);
        if(response.status == "successful"){
            let dataKey = response.token;
            localStorage.setItem("dataKey", dataKey);
            // redirect to next page
            window.location.href = window.location.href.split("/login")[0] + "/calendar";
        }else{
            // alert user login failed and clear fields
            alert("zugriff verweigert");
            document.getElementById("admin_username").value = "";
            document.getElementById("admin_password").value = "";
            document.getElementById("lecturer_username").value = "";
            document.getElementById("lecturer_password").value = "";
            document.getElementById("student_username").value = "";
        }
    };

    loginRequest.onerror = function () {
        // alert user login failed and clear fields
        alert("zugriff verweigert");
        document.getElementById("admin_username").value = "";
        document.getElementById("admin_password").value = "";
        document.getElementById("lecturer_username").value = "";
        document.getElementById("lecturer_password").value = "";
        document.getElementById("student_username").value = "";
    };

    loginRequest.send(JSON.stringify(body));
}

// background animation
let can;
let c;
let shapes;
let shapeColors = ["#FF0000", "#7e8a91"]

window.onload = function () {
    can = document.getElementById("background_animation");
    can.width = 1000;
    can.height = 1000;
    c = can.getContext("2d");

    shapes = [];

    loop();
}

function loop(){
    c.clearRect(0, 0, can.width, can.height);

    for(let i=shapes.length-1;i>=0;i--){
        shapes[i].render(c);
        shapes[i].update();
        if(shapes[i].age > shapes[i].lifetime){
            // delete old elements
            shapes.splice(i, 1);
        }
    }

    // add new Shape randomly
    if(Math.random() < 0.02){
        shapes.push(new RandomShape(
            Math.random() * can.width/2 + can.width/2,
            can.height,
            Math.random() * can.height / 10 + can.height / 20,
            shapeColors[Math.floor(Math.random() * shapeColors.length)],
        ));
    }

    requestAnimationFrame(loop);
}


class RandomShape{
    constructor(x, y, size, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = Math.floor(Math.random() * 3);
        this.color = color;
        this.age = 0;
        this.lifetime = Math.random() * 100 + 100;
    }

    update(){
        this.y -= 200 / this.size;
        this.age += 1;
    }

    render(c){
        c.strokeStyle = "#000000";
        c.fillStyle = this.color;
        c.globalAlpha = (this.lifetime - this.age) / this.lifetime;
        if(this.type == 0){
            //circle
            c.beginPath();
            c.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            c.fill();
            c.stroke();
        }else if(this.type == 1){
            //square
            c.fillRect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);
            c.strokeRect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);
        }else if(this.type == 2){
            //diamond
            c.beginPath();
            c.moveTo(this.x, this.y-this.size/2);
            c.lineTo(this.x+this.size/2, this.y);
            c.lineTo(this.x, this.y+this.size/2);
            c.lineTo(this.x-this.size/2, this.y);
            c.lineTo(this.x, this.y-this.size/2);
            c.fill();
            c.stroke();
        }
    }
}
