// constants
const VIEW_CONTROL_CLASS_VIEW = true;
const VIEW_CONTROL_TEMPLATE_VIEW = false;

window.onload = function(){
    updateClasses();
    updateTemplates();
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
    let classes_list = document.getElementById("leftbar_classes_content");
    classes_list.innerHTML = "";
    for(let i=0;i<classes.length;i++){
        let lecturer = document.createElement("div");
        lecturer.innerText = classes[i];
        classes_list.appendChild(lecturer);
    }
}


// gets the data for the classes and puts it in the leftbar of the page
function updateTemplates(){
    // get correct url for request
    let url = window.location.href.split("/pages")[0] + "/getTemplates";

    // make request
    let templatesRequest = new XMLHttpRequest();
    templatesRequest.open("GET", url, true);
    templatesRequest.setRequestHeader("Content-Type", "application/json");
     
    templatesRequest.onload = function () {
        let templates = JSON.parse(templatesRequest.responseText).data;
        fillTemplates(templates);
    };

    templatesRequest.onerror = function () {
        alert("something went wrong");
    };

    templatesRequest.send();
}

// fills in all classes in the leftbar of the page
function fillTemplates(templates){
    let templates_list = document.getElementById("leftbar_templates_content");
    templates_list.innerHTML = "";
    for(let i=0;i<templates.length;i++){
        let lecturer = document.createElement("div");
        lecturer.innerText = templates[i];
        templates_list.appendChild(lecturer);
    }
}


function toClassView(){
    document.getElementById("view_control").checked = VIEW_CONTROL_CLASS_VIEW;

}

function toTemplateView(){
    document.getElementById("view_control").checked = VIEW_CONTROL_TEMPLATE_VIEW;

}
