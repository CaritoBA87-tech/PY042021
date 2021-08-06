function start(){

    load_menu(); 

    var props=[
        {id: 1, name:"Banda elástica" , price: 310 , description:"Material: Poliéster. Tamaño: 3.8x183cm/0.12x6ft. ", img: "assets/images/prop1.png"},
        {id: 2, name:"Bloques de yoga" , price: 520 , description:"Material: EVA. Tamaño: aproximadamente 23 x 15 x 8 cm (largo x ancho x alto).",  img: "assets/images/prop2.png" },
        {id: 3, name:"Kit de accesorios de elongación" , price: 1160 , description:"Material: NBR + algodón + EVA.",  img: "assets/images/prop3.png" },
        {id: 4, name:"Bloques de yoga" , price: 750 , description:"Antideslizante, evita deslizamientos y deslizamientos durante el uso.",  img: "assets/images/prop4.png" },
        {id: 5, name:"Tapete X-10" , price: 550 , description:"Material: Mezcla sintética. 173 cm x 61 cm x 0.6 cm aproximado.",  img: "assets/images/prop5.png" },
        {id: 6, name:"Pelota Wilson" , price: 430 , description:"65 cm de diámetro aproximado." ,  img: "assets/images/prop6.png"},
        {id: 7, name:"Accesorios Trx" , price: 320 , description:"Material: Nailon. Peso máximo soportado: 350 lb" ,  img: "assets/images/prop7.png"},
        {id: 8, name:"Mat de yoga" , price: 400 , description:"Material: PVC. Medidas: 173 cm x 61 cm x 6 cm aproximado." ,  img: "assets/images/prop8.png"},
        {id: 9, name:"Pelota Sunny Health & Fitness" , price: 550 , description:"Peso: 1.81 Kg. Incluye bomba para inflado." ,  img: "assets/images/prop9.png"},
        {id: 10, name:"Correa de estiramiento" , price: 330 , description:"Material: algodón y fibra de poliéster. Tamaño: 183 * 3.8 cm." ,  img: "assets/images/prop10.png"},
        {id: 11, name:"Kit de accesorios" , price: 2000 , description:"Incluye 2 bloques." ,  img: "assets/images/prop11.png"},
        {id: 12, name:"Toalla de yoga" , price: 500 , description:"Toalla antideslizante de microfibra absorbente suave." ,  img: "assets/images/prop12.png"},
    ];

    var cart =sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : [];
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

    var container = createNode("section", '', {id: "container"});
    document.body.appendChild(container);   

    var propSelected={};

    for(var i=0; i<props.length; i++){
        var div = createNode("div", '', {className: "containerProp", myParam: props[i].id.toString() , onclick: showDetail });
        var img = createNode("img", '', {className: "imageProp"});
        img.src= props[i].img;
        div.appendChild(img);
        div.appendChild(createNode("span", props[i].name));
        var precio = numberFormat2.format(props[i].price);
        div.appendChild(createNode("span", "$ " + precio, {className: "priceProp"}));
        container.appendChild(div);
    }

    //Muestra el detalle del accesorio en un modal
    function showDetail(e){
        document.getElementById("quantity").value=1;
        var idSelected = e.target.nodeName == "DIV" ? e.target.myParam : e.target.parentNode.myParam;
        document.getElementById("modal").style.display = "block";
        propSelected = props.find( item =>  item.id == idSelected);
        document.getElementById("modal-image").src = propSelected.img;
        document.querySelector("#details p").innerHTML = propSelected.name;
        document.querySelector("#details span").innerHTML = propSelected.description + "<br> <br> " + numberFormat2.format(propSelected.price) ;
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
        sessionStorage.setItem("cartQuantity", quantity);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById("cartQuantity").innerHTML=sessionStorage.getItem("cartQuantity");
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

    
    
