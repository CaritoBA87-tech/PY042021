function start(){
    load_menu(); 
    get_clases();
}

function get_clases(){
    fetch('https://app-mandala.herokuapp.com/api/clases', {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                var button = createNode("button", "", {className: "list-group-item list-group-item-action", myParam: data[i].id.toString(), onclick: showDetail})
                button.innerHTML = data[i].nombre;
                document.getElementById("instructorList").appendChild(button);
            }

            var element = document.getElementsByClassName("list-group-item");
            element[0].click();
        });
}

function showDetail(e){
    var idSelected = e.target.myParam;

    var elements = document.getElementsByClassName("list-group-item");
    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor = "white";
        elements[i].style.color = "black";
    }

    e.target.style.backgroundColor = "#21a0b9";
    e.target.style.color = "white";

    fetch('https://app-mandala.herokuapp.com/claseDetail/' + idSelected + '/', {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            var claseName = document.getElementById("instructorName");
            claseName.innerText = data["clase"].nombre;
            
            var span = document.getElementById("instructorDescription");
            span.innerHTML = data["clase"].descripcion;

            var img = document.getElementById("instructorImg");
            img.src=data["clase"].img;

            var h5 = document.getElementsByTagName("h5")[0];
            h5.innerText = "Instructor:";
            
            var ul = document.getElementById("classesList");
            ul.innerHTML = '';

            var li = createNode("li", "");
            li.innerText = data["clase"].instructor;
            ul.appendChild(li);
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