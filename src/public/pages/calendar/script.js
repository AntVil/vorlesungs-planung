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

// global variables
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

// fills in the calendar with the appointments
function fillCalendar(appointments){
    let calendar = document.getElementsByClassName("calendar_day");

    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();

    let monthName = CALENDAR_MONTH_NAMES[month];
    document.getElementById("calendar_month_display").innerText = `${monthName} ${year}`;

    let endDate = new Date(Date.UTC(year, month+1));
    let date = new Date(Date.UTC(year, month));
    let index = (date.getDay() + 6) % 7;
    
    // clear days outside range
    for(let i=0;i<index;i++){
        calendar[i].children[0].innerText = "";
        calendar[i].children[1].innerHTML = "";
        calendar[i].setAttribute("aria-disabled", "true");
    }

    // fill in days + apointments
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
    
    // clear days outside range
    for(let i=index;i<calendar.length;i++){
        calendar[i].children[0].innerText = "";
        calendar[i].children[1].innerHTML = "";
        calendar[i].setAttribute("aria-disabled", "true");
    }
}

// gets the data for the classes and puts it in the leftbar of the page
function updateClasses(){
    // get correct url for request
    let url = window.location.href.split("/pages")[0] + "/getClasses";

    // make request
    let classesRequest = new XMLHttpRequest();
    classesRequest.open("GET", url, true);
    classesRequest.setRequestHeader("Content-Type", "application/json");
     
    classesRequest.onload = function () { 
        console.log(classesRequest.responseText)
        let classes = JSON.parse(classesRequest.responseText).data;
        fillClasses(classes);
    };

    classesRequest.onerror = function () {
        alert("something went wrong");
    };

     classesRequest.send();
}

// fills in all classes in the leftbar of the page
function fillClasses(classes){
    let classes_list = document.getElementById("leftbar_classes");
    classes_list.innerHTML = "";
    for(let i=0;i<classes.length;i++){
        let lecturer = document.createElement("div");
        lecturer.innerText = classes[i];
        classes_list.appendChild(lecturer);
    }
}

// gets the data for the lecturers and puts it in the leftbar of the page
function updateLecturers(){
    let url = window.location.href.split("/pages")[0] + "/getLecturers";

    // make request
    let lecturersRequest = new XMLHttpRequest();
    lecturersRequest.open("GET", url, true);
    lecturersRequest.setRequestHeader("Content-Type", "application/json");
     
    lecturersRequest.onload = function () { 
        let lecturer = JSON.parse(lecturersRequest.responseText).data;
         
        fillLecturers(lecturer);
    };

    lecturersRequest.onerror = function () {
        alert("something went wrong");
    };

    lecturersRequest.send();
}

// fills in all lecturers in the leftbar of the page
function fillLecturers(lecturers){
    let lecturers_list = document.getElementById("leftbar_lecturers");
    for(let i=0;i<lecturers.length;i++){
        let lecturer = document.createElement("div");
        lecturer.innerText = lecturers[i];
        lecturers_list.appendChild(lecturer);
    }
}


function addClass(){
    let name = window.prompt("Enter the class you want to add:")
    let body = {"name": name};
    let url = window.location.href.split("/pages")[0] + "/addClass";


    // make request
    let addClassRequest = new XMLHttpRequest();
    addClassRequest.open("POST", url, true);
    addClassRequest.setRequestHeader("Content-Type", "application/json");
    
    addClassRequest.onload = function () { 
        updateClasses();
    };

    addClassRequest.onerror = function () {
        alert("something went wrong");
    };

    addClassRequest.send(JSON.stringify(body));
}
