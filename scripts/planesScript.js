function start(){
    load_menu();
    show_plans();
}

function show_plans(){

    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);

    fetch('http://127.0.0.1:8000/api/planes', {
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
                link.innerText = "Ver detalle  ";

                var icon = document.createElement("span");
                icon.className ="fa fa-plus-circle";
                link.appendChild(icon);

                div2.appendChild(link);

                div.appendChild(div2);
        
                span = createNode("span", '', {className: "planDescription"});
                span.innerText = data[i].descripcion;
                div.appendChild(span);

                document.getElementById("planesContainer").appendChild(div);
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

    fetch('http://127.0.0.1:8000/planDetail/' + idSelected + '/', {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
                let h1 = document.createElement("h1");
                h1.innerText = data["horario"][0].inicio;
                h1.innerText = data["plan"].nombre;
                document.getElementById("prueba").appendChild(h1);
    }); 
}
