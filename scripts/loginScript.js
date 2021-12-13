function start(){
    load_menu();

    var token = localStorage.getItem('token');
    
    if (token != null && token != "undefined")
        window.location.href = "https://app-mandala.herokuapp.com/administracion.html" 
}

function loginUser(e){
    e.preventDefault();

    document.getElementById("error").innerHTML = "";
    
    const object = JSON.stringify({
        username: document.getElementById("username").value,
        password :document.getElementById("password").value
    });

    fetch("https://app-mandala.herokuapp.com/api/token/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: object
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        
        if(data["access"]){
            var token =data["access"];
            localStorage.setItem('token', token);
            window.location.href = "https://app-mandala.herokuapp.com/administracion.html"
        }

        else{
            document.getElementById("error").innerHTML = "¡Error!: " + data["detail"];
            document.getElementById("myForm").reset();
        }

    }).catch(function(ex) {
        document.getElementById("error").innerHTML = ex;
        document.getElementById("myForm").reset();
        console.log("parsing failed", ex);
    });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}