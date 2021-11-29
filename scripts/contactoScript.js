function start(){
    load_menu(); 
}

function saveDataUser(){

    var elements = document.getElementById("myForm").elements;

    var object ={};

    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        object[item.name] = item.value;
    }
    
    fetch('https://app-mandala.herokuapp.com/newClient/' + object["nombre"] + '/' + object["apellido"] + '/' + object["correo"] + '/' + object["telefono"] + '/', {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST"
    })
    .then((resp) => {return resp.json()})
      .then(function(data) {
          console.log(data);
      })
      .catch(function(error) {
          console.log(error)
      });
  }