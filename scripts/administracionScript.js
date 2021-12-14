function start(){
    load_menu();
    
    var token = localStorage.getItem('token')
    
    if (token == null || token == "undefined")
        window.location.href = "login.html"
    
    else
        get_clients();
}

function get_clients(){

    fetch("https://app-mandala.herokuapp.com/api/clientes/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
    }).then(function(response) {

        if(response.statusText == "Forbidden"){
            localStorage.removeItem('token');
            window.location.href = "login.html"
            }

        return response.json();

    }).then(function(data) {

        var section = document.getElementById("containerClients");

        span =  createNode("span", '', {className: "header"});
        span.innerText = "Nombre";
        section.appendChild(span);

        span =  createNode("span", '', {className: "header"});
        span.innerText = "Correo";
        section.appendChild(span);

        for (var i=0; i<data.length; i++){
            span =  createNode("span", '', {className: "data dataNombre"});
            span.innerText = data[i].nombre + " " + data[i].apellido;
            section.appendChild(span);

            span =  createNode("span", '', {className: "data dataCorreo"});
            span.innerText = data[i].correo;
            section.appendChild(span);
        }


    }).catch(function(ex) {
        console.log("parsing failed", ex);
    }); 

} 

//Crea un nodo (type), con un hijo (child) y atributos (attr)
function createNode(type, child, attr) { 
    var element = document.createElement(type);
 
    if(attr) {
        Object.keys(attr).map( at =>{ 
            element[at] = attr[at]; 
        });
    }

    if(typeof child === "string") { 
        var texto = document.createTextNode(child); 
        element.appendChild(texto);
    }

    else 
        element.appendChild(child); 

        return element;               
}
