window.onload = function(){
    // for testing
    getCalendar();
    setAppointment();
    setAppointmentStatus();
}


// unfinished
function getCalendar(){
    let url = window.location.href.split("/pages")[0] + "/getCalendar";

    // make request
    let calendarRequest = new XMLHttpRequest();
    calendarRequest.open('POST', url, true);
    calendarRequest.setRequestHeader('Content-Type', 'application/json');
    
    calendarRequest.onload = function () { 
        let data = JSON.parse(calendarRequest.responseText);
        console.log(data);
    };

    calendarRequest.onerror = function () {
        // alert user login failed and clear fields
        alert("fail");
    };

    calendarRequest.send(JSON.stringify({}));
}


// unfinished
function setAppointment(){
    let url = window.location.href.split("/pages")[0] + "/setAppointment";

    // make request
    let appointmentRequest = new XMLHttpRequest();
    appointmentRequest.open('POST', url, true);
    appointmentRequest.setRequestHeader('Content-Type', 'application/json');
    
    appointmentRequest.onload = function () { 
        let data = JSON.parse(appointmentRequest.responseText);
        console.log(data);
    };

    appointmentRequest.onerror = function () {
        // alert user login failed and clear fields
        alert("fail");
    };

    appointmentRequest.send(JSON.stringify({}));
}


// unfinished
function setAppointmentStatus(){
    let url = window.location.href.split("/pages")[0] + "/setAppointmentStatus";

    // make request
    let appointmentStatusRequest = new XMLHttpRequest();
    appointmentStatusRequest.open('POST', url, true);
    appointmentStatusRequest.setRequestHeader('Content-Type', 'application/json');
    
    appointmentStatusRequest.onload = function () { 
        let data = JSON.parse(appointmentStatusRequest.responseText);
        console.log(data);
    };

    appointmentStatusRequest.onerror = function () {
        // alert user login failed and clear fields
        alert("fail");
    };

    appointmentStatusRequest.send(JSON.stringify({}));
}
