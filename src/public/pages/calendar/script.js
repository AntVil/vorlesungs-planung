let selectedDate = new Date();

window.onload = function(){
    updateCalendar();
}

// show sidebar
function show_day(day){
    console.log(day);
    document.getElementById("rightbar_checkbox").checked = true;
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
        startDate: selectedDate,
        endDate: "234"
    }

    // make request
    let loginRequest = new XMLHttpRequest();
    loginRequest.open("POST", url, true);
    loginRequest.setRequestHeader("Content-Type", "application/json");
    
    loginRequest.onload = function () { 
        let appointments = JSON.parse(loginRequest.responseText);
        fillCalendar(appointments);
    };

    loginRequest.onerror = function () {
        alert("something went wrong");
    };

    loginRequest.send(JSON.stringify(body));
}

function fillCalendar(appointments){
    let calendar = document.getElementsByClassName("calendar_day");

    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();

    let monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ][month];
    document.getElementById("calendar_month_display").innerText = `${monthName} ${year}`;

    let endDate = new Date(Date.UTC(year, month+1));

    let date = new Date(Date.UTC(year, month));
    let index = (date.getDay() + 6) % 7;
    
    for(let i=0;i<index;i++){
        calendar[i].children[0].innerText = "";
    }

    while (date < new Date(endDate)) {
        calendar[index].children[0].innerText = date.getDate() + ".";

        index += 1;
        date.setUTCDate(date.getUTCDate() + 1);
    }
    
    for(let i=index;i<calendar.length;i++){
        calendar[i].children[0].innerText = "";
    }
}
