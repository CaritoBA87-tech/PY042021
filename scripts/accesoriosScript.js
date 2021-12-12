function start(){

    load_menu(); 

    var props=[];

    var cart =localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    var quantity = 0;

    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);

    document.getElementById("quantity").addEventListener("keyup", function(event){
        if (event.keyCode === 13)
            document.getElementById("addToCart").click();
    });

    document.querySelector(".close").addEventListener("click", function(){
        document.getElementById("modal").style.display = "none";
    })

    document.getElementById("addToCart").addEventListener("click", function(){
        quantity = parseInt(document.getElementById("quantity").value);
        addToCart();
    });

    var container = document.getElementById("container");

    var propSelected={};

    const query = 
        `query {
        allAccessories 
            {
                id
                nombre
                precio
                descripcion
                img
            }
        }`;

    fetch('https://app-mandala.herokuapp.com/graphql', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query}),       
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
       
        props = data["data"]["allAccessories"];

        for(var i=0; i<props.length; i++){
            var div = createNode("div", '', {className: "containerProp", myParam: props[i].id.toString() , onclick: showDetail });
            var img = createNode("img", '', {className: "imageProp"});
            img.src= props[i].img;
            div.appendChild(img);
            div.appendChild(createNode("span", props[i].nombre));
            var precio = numberFormat2.format(props[i].precio);
            div.appendChild(createNode("span",  precio, {className: "priceProp"}));
            container.appendChild(div);
        }

    }).catch(function(ex) {
        console.log("parsing failed", ex);
    }); 

    //Muestra el detalle del accesorio en un modal
    function showDetail(e){
        document.getElementById("quantity").value=1;
        var idSelected = e.target.nodeName == "DIV" ? e.target.myParam : e.target.parentNode.myParam;
        document.getElementById("modal").style.display = "block";
        propSelected = props.find( item =>  item.id == idSelected);
        document.getElementById("modal-image").src = propSelected.img;
        document.querySelector("#details p").innerHTML = propSelected.nombre;
        document.querySelector("#details span").innerHTML = propSelected.descripcion + "<br> <br> " + numberFormat2.format(propSelected.precio) ;
    }

    //Agrega accesorios al carrito de compras
    function addToCart(){
        var item = cart.find( item =>  item.id == propSelected.id);

        if (item != undefined) {
            item.quantity = item.quantity + quantity;
        }

        else{
            var prop = Object.assign({}, propSelected);
            prop.quantity = quantity;
            cart.push(prop);
        }

        document.querySelector(".close").click();
        showSuccess();

        refreshSessionData();
    }

    //Actualiza los datos en sessionStorage
    function refreshSessionData(){
        var quantity = cart.reduce((acumulador, item) => {return acumulador + item.quantity}, 0);
        localStorage.setItem("cartQuantity", quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById("cartQuantity").innerHTML=localStorage.getItem("cartQuantity");
    }
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

//Muestra un mensaje de éxito
function showSuccess(){
    document.querySelector('.message').classList.add('show');

    setTimeout(function(){
        document.querySelector('.message').classList.remove("show");
    }, 2000);  
}



    
    
