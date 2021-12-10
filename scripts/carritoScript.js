function start(){  
    load_menu();  
    resizeCart();
}

//Muestra los productos en el carrito de compras
function showCart(width){
    var cart =localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    
    document.getElementById("cartTable").innerHTML="";

    if(cart.length == 0) {
        var span = document.createElement("span");
        span.id= "empty";
        span.textContent = "No hay productos en el carrito de compras";
        document.getElementById("cartTable").appendChild(span);
        return;
    }

    var heads = ["Nombre", "Descripción", "Cantidad", "Precio", "",  "Total"];
    var properties = ["name", "description", "quantity",  "price"];
    var total = 0;

    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);

    if (width >= 768) {

        var length = (width > 1280) ? "large" : ((width >= 1025 && width<=1280) ? "regular" : "small");

        var table = document.createElement("table");
        table.style.fontSize = (length == "large") ? "17px" : ((length == "regular") ? "16px" : "16px");
        table.style.width = (length == "large") ? "90%" : ((length == "regular") ? "97%" : "94%");

        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        for(var i=0; i<heads.length; i++){

            if(width <= 1024 && heads[i] == "Descripción")
                continue; 

            var th  = document.createElement("th");
            th.textContent = heads[i];
            thead.appendChild(th);
        }

        table.appendChild(thead);

        for(var i=0; i<cart.length; i++){
            var tr  = document.createElement("tr");

            properties.forEach(function(item){
                var td  = document.createElement("td");

                if(width <= 1024 && item == "description")
                    return; 

                if(item=="quantity")
                {
                    var editQuantityButton = document.createElement("input");
                    editQuantityButton.type = "number";
                    editQuantityButton.min = 0;
                    editQuantityButton.value=cart[i][item];
                    editQuantityButton.id=cart[i].id;
                    editQuantityButton.classList.add("editQuantity");
                    editQuantityButton.style.fontSize = (length == "large") ? "17px" : ((length == "regular") ? "16px" : "15px");

                    editQuantityButton.addEventListener("change", function(e){
                        if (isNaN(e.target.value) || e.target.value < 0)
                            return;

                        var item = cart.find(item =>  item.id == e.target.id);
                        item.quantity = parseInt(e.target.value);
                        refreshSessionData(cart);
                        var width = window.outerWidth;
                        showCart(width);
                    });

                    td.appendChild(editQuantityButton);
                }

                else
                {
                    td.textContent = item == "price" ? numberFormat2.format(cart[i][item])  : cart[i][item];
                    td.style.textAlign = item == "price" ? "right" : "";    
                }

                tr.appendChild(td);
            });

            var td  = document.createElement("td");
            var removeButton = document.createElement("button");
            removeButton.innerHTML = "Eliminar";
            removeButton.id = cart[i].id;
            removeButton.classList = "remove";
            removeButton.style.fontSize = (length == "large") ? "16px" : ((length == "regular") ? "15px" : "14px");

            //Elimina un producto del carrito de compras
            removeButton.addEventListener("click", function(e){
                var index = cart.findIndex(prop => prop.id == e.target.id);
                cart.splice(index, 1);
                refreshSessionData(cart);
                showCart(); 
            });

            td.appendChild(removeButton);
            tr.appendChild(td);

            td  = document.createElement("td");
            td.classList = "partialPrice";
            var partialPrice = parseInt(cart[i].price) * cart[i].quantity
            td.textContent = numberFormat2.format(partialPrice);
            total += partialPrice;
            tr.appendChild(td);

            tbody.appendChild(tr);
        }

        var tr  = document.createElement("tr");
        var td = document.createElement("td");
        td.classList = "total";
        td.colSpan = "6";
        td.style.textAlign = "right";
        td.textContent = numberFormat2.format(total);
        tr.appendChild(td);
        tbody.appendChild(tr);

        table.appendChild(tbody);

        document.getElementById("cartTable").appendChild(table);
    }

    else{
        
        for(var i=0; i<cart.length; i++){

            var section = createNode("section", '', );

            var span = createNode("span", '', {className: "propName"});
            span.textContent = cart[i].name;
            section.appendChild(span);

            var div = createNode("div", '', {className: "sectionProp"});

            //var editQuantityButton = document.createElement("input");
            var editQuantityButton = createNode("input", '');
            editQuantityButton.type = "number";
            editQuantityButton.min = 0;
            editQuantityButton.value=cart[i].quantity; 
            editQuantityButton.id=cart[i].id;
            editQuantityButton.classList.add("editQuantity");

            editQuantityButton.addEventListener("change", function(e){
                if (isNaN(e.target.value) || e.target.value < 0)
                    return;

                var item = cart.find(item =>  item.id == e.target.id);
                item.quantity = parseInt(e.target.value);
                refreshSessionData(cart);
                var width = window.outerWidth;
                showCart(width);
            });
            
            div.appendChild(editQuantityButton);

            var spanPrice = createNode("span", '');
            spanPrice.textContent = numberFormat2.format(cart[i].price);
            div.appendChild(spanPrice);

            var removeButton = document.createElement("button");
            removeButton.id = cart[i].id;
            removeButton.classList = "remove";

            if(width>480)
                removeButton.innerHTML = "Eliminar";

            else {
                var icon = document.createElement("span");
                icon.className ="fa fa-trash";
                removeButton.appendChild(icon);
            }

            //Elimina un producto del carrito de compras
            removeButton.addEventListener("click", function(e){
                var index = cart.findIndex(prop => prop.id == e.target.id);
                cart.splice(index, 1);
                refreshSessionData(cart);
                showCart(); 
            });

            div.appendChild(removeButton);

            var spanPartial = document.createElement("span");
            spanPartial.classList = "partialPrice";
            var partialPrice = parseInt(cart[i].price) * cart[i].quantity;
            spanPartial.textContent = numberFormat2.format(partialPrice);
            total += partialPrice;
            div.appendChild(spanPartial);

            section.appendChild(div);

            document.getElementById("cartTable").appendChild(section);
        }

        div = document.createElement("div");
        div.classList = "total";
        div.style.textAlign = "right";
        div.textContent = numberFormat2.format(total);
        document.getElementById("cartTable").appendChild(div);
    }
}

//Actualiza los datos en sessionStorage
function refreshSessionData(cart){
    var quantity = cart.reduce((acumulador, item) => {return acumulador + item.quantity}, 0);
    localStorage.setItem("cartQuantity", quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cartQuantity").innerHTML=localStorage.getItem("cartQuantity");
}

function resizeCart(){
    var width = window.outerWidth;
    showCart(width);
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








