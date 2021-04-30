window.onload = function () {
    
}

function login(e){
    fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({
            name: "Deska",
            email: "deska@gmail.com",
            phone: "342234553"
        })
    }).then(function(response) {
        console.log("Completed with result:", response);
    });
}
