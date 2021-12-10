function start(){
    load_menu();
    show_plans();
}

const options2 = { style: 'currency', currency: 'USD' };
const numberFormat2 = new Intl.NumberFormat('en-US', options2);

var dias = {
    "L": "Lunes",
    "M": "Martes",
    "N": "Miércoles",
    "J": "Jueves",
    "V": "Viernes",
    "S": "Sábado",
    "D": "Domingo"
};

function show_plans(){

    fetch('https://app-mandala.herokuapp.com/api/planes', {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                var div = createNode("div", '', {className: "planContainer"});
                var div2 = createNode("div", '', {className: "planTitleContainer"});

                var h1 = createNode("h1", '', {className: "planTitle"});
                h1.innerText = data[i].nombre;
                div2.appendChild(h1);

                var span = createNode("span", '', {className: "planPrice"});
                span.innerText = numberFormat2.format(data[i].costo) + "/mes";
                span.style.alignItems = "center";
                div2.appendChild(span);

                var link = createNode("div", '', {className: "planDetail", myParam: data[i].id.toString(), onclick: showDetail });              
                link.innerText = "Ver horario  ";

                var icon = document.createElement("span");
                icon.className ="fa fa-plus-circle";
                link.appendChild(icon);

                div2.appendChild(link);

                div.appendChild(div2);
        
                span = createNode("span", '', {className: "planDescription"});
                span.innerText = data[i].descripcion;
                div.appendChild(span);

                document.getElementById("plansContainer").appendChild(div);
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

function showDetail(e){
    var idSelected = e.target.myParam;

    document.getElementById("plansContainer").style.display="None";
    document.getElementById("planDetailContainer").style.display="Block";

    fetch('https://app-mandala.herokuapp.com/planDetail/' + idSelected + '/', {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            var container = document.getElementById("planDetailContainer");

            var h1 = createNode("h1", '', {className: "planTitle"});
            h1.innerText = data["plan"].nombre;
            container.appendChild(h1);

            var span = createNode("span", '', {className: "planPrice"});
            span.innerText = numberFormat2.format(data["plan"].costo) + "/mes";
            span.style.alignItems = "center";
            span.style.marginTop="8px";
            container.appendChild(span);
         
            span = createNode("span", '', {className: "planDescription"});
            span.innerText = data["plan"].descripcion;
            span.style.display = "Block";
            span.style.marginTop="15px";
            container.appendChild(span);

            var section = createNode("section", '', {className: "containerSchedule"});
            
            span =  createNode("span", '', {className: "header"});
            span.innerText = "Día";
            section.appendChild(span);

            span =  createNode("span", '', {className: "header"});
            span.innerText = "Hora";
            section.appendChild(span);

            span =  createNode("span", '', {className: "header"});
            span.innerText = "Clase";
            section.appendChild(span);

            span =  createNode("span", '');
            span.classList.add("header");
            span.classList.add("headerInstructor");
            span.innerText = "Instructor";
            section.appendChild(span);

            for (var key in dias){
                var result = (data["horario"]).filter(word => word.dia == key);

                for(var i=0; i<result.length; i++){
                    span =  createNode("span", '', {className: "day"});
                    span.innerText = dias[result[i].dia];
                    section.appendChild(span);

                    span =  createNode("span", '', {className: "hour"});
                    span.innerText = (result[i].inicio).substring(0, 5) + " - " + (result[i].fin).substring(0, 5);
                    section.appendChild(span);

                    span =  createNode("span", '', {className: "session"});
                    span.innerText = result[i].clase + " ";

                    section.appendChild(span);

                    span =  createNode("span", '', {className: "instructor"});
                    span.innerText = result[i].instructor + " ";
    
                    section.appendChild(span);
                }
            }

            container.appendChild(section);
    }); 
} 
