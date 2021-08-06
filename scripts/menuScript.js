//Muestra el menú
function load_menu(){
    qr=new XMLHttpRequest();
    qr.open('get','menu.html');
    qr.send();
    qr.onload=function(){
        document.getElementById("menu").innerHTML=qr.responseText;

        //Carrito de compras
        var cartQ = localStorage.getItem("cartQuantity");
        document.getElementById("cartQuantity").innerHTML = cartQ ? cartQ : "0"; 
    }
};