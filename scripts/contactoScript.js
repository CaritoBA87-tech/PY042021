function start(){
    load_menu(); 
    get_aficions();
}

function get_aficions(){

    fetch("https://app-mandala.herokuapp.com/api/aficiones/", {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {

        var select = document.getElementById("aficiones");

        for (var i=0; i<data.length; i++){
            var option = document.createElement("option");
            option.text = data[i].nombre;
            option.value = data[i].id;
            select.add(option);
        }

        console.log("Data is ok", data);
    }).catch(function(ex) {
        console.log("parsing failed", ex);
    });
}

function saveDataUser(e){
    e.preventDefault();
    var elements = document.getElementById("myForm").elements;

    var object ={};

    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        object[item.name] = item.value;
    }

    var values = $('#aficiones').val();
    object['aficiones']= [];

    for (var i=0; i<values.length; i++){
        object['aficiones'].push("https://app-mandala.herokuapp.com/api/aficiones/" + values[i] + "/")
    }

    fetch("https://app-mandala.herokuapp.com/api/clientes/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log("Data is ok", data);
    }).catch(function(ex) {
        console.log("parsing failed", ex);
    }); 

    showSuccess();

    document.getElementById("myForm").reset();
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

//Muestra un mensaje de éxito
function showSuccess(){
    document.querySelector('.message').classList.add('show');

    setTimeout(function(){
        document.querySelector('.message').classList.remove("show");
    }, 2000); 
}