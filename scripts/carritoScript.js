function start(){  
    load_menu();  
    resizeCart();
    //showCart();
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

    var length = width >= 1025 && width<=1280 ? "regular" :  "large";

    var table = document.createElement("table");
    table.style.fontSize = length == "regular" ? "17px" : "18px";
    table.style.width = length == "regular" ? "97%" : "90%";

    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    for(var i=0; i<heads.length; i++){
        var th  = document.createElement("th");
        th.textContent = heads[i];
        thead.appendChild(th);
    }

    table.appendChild(thead);

    for(var i=0; i<cart.length; i++){
        var tr  = document.createElement("tr");

        properties.forEach(function(item){
            var td  = document.createElement("td");

            if(item=="quantity")
            {
                var editQuantityButton = document.createElement("input");
                editQuantityButton.type = "number";
                editQuantityButton.min = 0;
                editQuantityButton.value=cart[i][item];
                editQuantityButton.id=cart[i].id;
                editQuantityButton.classList.add("editQuantity");
                editQuantityButton.style.fontSize = length == "regular" ? "17px" : "18px";

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
        removeButton.style.fontSize = length == "regular" ? "15px" : "16px";

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

//Actualiza los datos en sessionStorage
function refreshSessionData(cart){
    var quantity = cart.reduce((acumulador, item) => {return acumulador + item.quantity}, 0);
    localStorage.setItem("cartQuantity", quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cartQuantity").innerHTML=localStorage.getItem("cartQuantity");
}

function resizeCart(){
    var width = window.outerWidth;

    if (width>1280){
        showCart(width);
        document.body.style.backgroundColor = "gainsboro";
    }

    else if(width>=1025 && width<=1280){
        showCart(width);
        document.body.style.backgroundColor = "red";
    }

    else if(width>=768 && width<=1024) {
        document.body.style.backgroundColor = "green";
    }

    else if(width>=481 && width<=767){
        document.body.style.backgroundColor = "yellow";
    }

    else if(width>=320 && width<=480) {
        document.body.style.backgroundColor = "orange";
    }
}








