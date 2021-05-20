// constants
const CALENDAR_MONTH_NAMES = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
];

//global variables
let selectedDate = new Date();


window.onload = function(){
    updateCalendar();
    updateClasses();
    updateLecturers();
}

// show sidebar + fill with appointments
function show_day(day){
    if(day.getAttribute("aria-disabled") == "false"){
        document.getElementById("rightbar_checkbox").checked = true;
        let s = `${day.children[0].innerText} ${document.getElementById("calendar_month_display").innerText}`;
        document.getElementById("rightbar_date").innerText = s;

        let day_appointments = document.getElementById("rightbar_day_appointments");
        day_appointments.innerHTML = "";

        let appointments = day.children[1].children;

        for(let i=0;i<appointments.length;i++){
            appointment = appointments[i].cloneNode(true)
            
            appointment.style.gridRowStart = parseInt(appointment.getAttribute("aria-start")) - 7;
            appointment.style.gridRowEnd = parseInt(appointment.getAttribute("aria-end")) - 7;
            console.log(appointment.style.gridRowStart)

            day_appointments.appendChild(appointment);
        }
    }
}

// calendar control
function previousMonth(){
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();
    selectedDate = new Date(year - (month == 0), (month + 11) % 12);
    updateCalendar();
}
function nextMonth(){
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();
    selectedDate = new Date(year + (month == 11), (month + 1) % 12);
    updateCalendar();
}

// request appointments from server
function updateCalendar(){
    // get correct url for request
    let url = window.location.href.split("/pages")[0] + "/getCalendar";

    let body = {
        "year": selectedDate.getFullYear(),
        "month": selectedDate.getMonth(),
    }

    // make request
    let loginRequest = new XMLHttpRequest();
    loginRequest.open("POST", url, true);
    loginRequest.setRequestHeader("Content-Type", "application/json");
    
    loginRequest.onload = function () { 
        let appointments = JSON.parse(loginRequest.responseText).data;
        
        fillCalendar(appointments);
    };

    loginRequest.onerror = function () {
        alert("something went wrong");
    };

    loginRequest.send(JSON.stringify(body));
}

//fills in the calendar with the appointments
function fillCalendar(appointments){
    let calendar = document.getElementsByClassName("calendar_day");

    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();

    let monthName = CALENDAR_MONTH_NAMES[month];
    document.getElementById("calendar_month_display").innerText = `${monthName} ${year}`;

    let endDate = new Date(Date.UTC(year, month+1));
    let date = new Date(Date.UTC(year, month));
    let index = (date.getDay() + 6) % 7;
    
    //clear days outside range
    for(let i=0;i<index;i++){
        calendar[i].children[0].innerText = "";
        calendar[i].children[1].innerHTML = "";
        calendar[i].setAttribute("aria-disabled", "true");
    }

    //fill in days + apointments
    while (date < endDate) {
        calendar[index].children[0].innerText = date.getDate() + ".";
        calendar[index].children[1].innerHTML = "";

        for(let i=0;i<appointments.length;i++){
            if(date.getUTCDate() == appointments[i].day){
                let appointment = document.createElement("div");
                appointment.innerText = `${appointments[i].lecturer}: ${appointments[i].name}`;
                appointment.setAttribute("aria-id", appointments[i].id);
                appointment.setAttribute("aria-name", appointments[i].name);
                appointment.setAttribute("aria-location", appointments[i].location);
                appointment.setAttribute("aria-start", appointments[i].start);
                appointment.setAttribute("aria-end", appointments[i].end);
                appointment.setAttribute("aria-status", appointments[i].status);
                appointment.setAttribute("aria-lecturer", appointments[i].lecturer);
                appointment.setAttribute("aria-type", appointments[i].type);

                calendar[index].children[1].appendChild(appointment);
            }
        }

        calendar[index].setAttribute("aria-disabled", "false");

        index += 1;
        date.setUTCDate(date.getUTCDate() + 1);
    }
    
    //clear days outside range
    for(let i=index;i<calendar.length;i++){
        calendar[i].children[0].innerText = "";
        calendar[i].children[1].innerHTML = "";
        calendar[i].setAttribute("aria-disabled", "true");
    }
}

// kopiert
function updateClasses(){
     // get correct url for request
     let url = window.location.href.split("/pages")[0] + "/getClasses";

 
     // make request
     let loginRequest = new XMLHttpRequest();
     loginRequest.open("GET", url, true);
     loginRequest.setRequestHeader("Content-Type", "application/json");
     
     loginRequest.onload = function () { 
         let classes = JSON.parse(loginRequest.responseText);
         
         fillClasses(classes);
     };
 
     loginRequest.onerror = function () {
         alert("something went wrong");
     };
 
     loginRequest.send();
    

   
}

function fillClasses(classes){
    document.getElementById("KursListe").innerHTML = "" ;
    courseList = document.createElement("ul");
    courseList.className = "courseList";
    document.getElementById("KursListe").appendChild(courseList);
    
    classes.forEach(function (classItem) {
    let course = document.createElement("li");
    course.tabIndex = -1;
    course.className = "classListItem";
    course.addEventListener("click",function(e) {
        
    });
    courseList.appendChild(course);
    
    course.innerHTML += classItem;
    });
}

function updateLecturers(){
    let url = window.location.href.split("/pages")[0] + "/getLecturers";

 
     // make request
     let loginRequest = new XMLHttpRequest();
     loginRequest.open("GET", url, true);
     loginRequest.setRequestHeader("Content-Type", "application/json");
     
     loginRequest.onload = function () { 
         let lecturer = JSON.parse(loginRequest.responseText);
         
         fillLecturers(lecturer);
     };
 
     loginRequest.onerror = function () {
         alert("something went wrong");
     };
 
     loginRequest.send();

}
//
function fillLecturers(lecturers){
    
    
    lecturerList  = document.createElement("ul");
    
    lecturerList.className = "lecturerList";
    
    document.getElementById("lecturerList").appendChild(lecturerList);
    
    lecturers.forEach(function (lecturerItem) {
    let lecturer = document.createElement("li");
    lecturer.tabIndex = -1;
    lecturer.className = "lecturerListItem";
    lecturer.addEventListener("click",function(e) {
        
    });
    lecturer.addEventListener("contextmenu", e => {
      e.preventDefault();
    });
    lecturerList.appendChild(lecturer);
    
    lecturer.innerHTML += lecturerItem;
    });
}


function addClass(){
    let classToAdd = window.prompt("Enter the class you want to add!")
    let newClass = {name: classToAdd};
    let url = window.location.href.split("/pages")[0] + "/addClasses";


    // make request
    let loginRequest = new XMLHttpRequest();
    loginRequest.open("POST", url, true);
    loginRequest.setRequestHeader("Content-Type", "application/json");
    
    loginRequest.onload = function () { 
        updateClasses();
    };

    loginRequest.onerror = function () {
        alert("something went wrong");
    };

    loginRequest.send(JSON.stringify(newClass));
}

function addLecturer(){
    let lecturerToAdd = window.prompt("Enter the lecturer you want to add!")
    lecturers.push(lecturerToAdd);
    //location.reload();
    alert(lecturers); //Testfunktion
}

// let addLecturerBtn = document.getElementById("addLecturerBtn");

// addLecturerBtn.addEventListener("click", function(e){
// let lecturerToAdd = window.prompt("Enter the lecturer you want to add!")
// lecturers.push(lecturerToAdd);
// //location.reload();
// alert(lecturers); //Testfunktion
// });

// let addClassBtn = document.getElementById("addClassBtn");

// addClassBtn.addEventListener("click", function(e){
// let classToAdd = window.prompt("Enter the class you want to add!")
// classes.push(classToAdd);
// //location.reload();
// alert(classes); //Testfunktion
// });
