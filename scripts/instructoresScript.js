function start(){
    load_menu();
    get_instructors();
}

function get_instructors(){
    fetch('https://app-mandala.herokuapp.com/api/instructores', {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            var ul = document.getElementsByClassName("navbar-nav")[0];

            for (let i = 0; i < data.length; i++) {

                var li = createNode("li", "", {className: "nav-item"})
                var div = createNode("div", "", {className: "nav-link", myParam: data[i].id.toString(), onclick: showDetail})
                div.innerText = data[i].nombre + " " + data[i].apellido;
                li.appendChild(div);               
                ul.appendChild(li);
            }

            var element = document.querySelectorAll("#navbarNav2 div"); //document.getElementsByClassName("nav-link");
            var abc = element[0].click();
        });
} 

function showDetail(e){
    var idSelected = e.target.myParam;

    var elements = document.querySelectorAll("#instructorList .nav-link")

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor = "white";
        elements[i].style.color = "black";
    }

    e.target.style.backgroundColor = "#21a0b9";
    e.target.style.color = "white";

    fetch('https://app-mandala.herokuapp.com/instructorDetail/' + idSelected + '/', {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            var instructorName = document.getElementById("instructorName");
            instructorName.innerText = data["instructor"].nombre + " " + data["instructor"].apellido;
            
            var span = document.getElementById("instructorDescription");
            span.innerHTML = data["instructor"].descripcion;

            var img = document.getElementById("instructorImg");
            img.src=data["instructor"].img;

            var h5 = document.getElementsByTagName("h5")[0];
            h5.innerText = "Clases que imparte:";
            
            var ul = document.getElementById("classesList");
            ul.innerHTML = '';

            for(var i=0; i<data["clases"].length; i++){
                var li = createNode("li", "");
                li.innerText = data["clases"][i].clase;
                ul.appendChild(li);
            }
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

