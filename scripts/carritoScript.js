function start(){   
    load_menu();  
    showCart();
}

//Muestra los productos en el carrito de compras
function showCart(){
    document.getElementById("cartTable").innerHTML="";

    var cart =localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];  

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

    var table = document.createElement("table");
        
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
            td.textContent = item == "price" ? numberFormat2.format(cart[i][item])  : cart[i][item];
            tr.appendChild(td);
        });

        var td  = document.createElement("td");
        var removeButton = document.createElement("button");
        removeButton.innerHTML = "Eliminar";
        removeButton.id = cart[i].id;
        removeButton.classList = "remove";

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


