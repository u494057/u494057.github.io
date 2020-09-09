var db = firebase.firestore();

//var resultados = document.getElementById('resultados');

var resultados_activos = new Array();

//Incompleto

function mostrar() {

  var x = document.getElementById("resultados");
  var y = document.getElementById("space");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }

  var option = document.getElementById("opciones");

  var text = document.getElementById("value");

  if(resultados_activos!=null){
    resultados_activos.forEach(element => element.remove());
  }

  db.collection("films")
  .get().then(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
        if(checkOption(option, text, doc)){
          var element = document.createElement("div");
          resultados_activos.push(element);
          element.onclick = function() {goTo(doc.id)};
          element.innerHTML = "";
          element.innerHTML += `
          <div class="buscador">
            <div class="row">
              <a class="col-lg-4">${doc.data().original_title}</a>
              <a class="col-lg-2"> ${doc.data().director} </a>  
              <a class="col-lg-5"> ${doc.data().genres} </a> 
              <a href="fichatecnica.html" class="col-lg-1"> Ir a... </a>
            </div>
          </div>
          `;
          document.getElementById("resultados").appendChild(element);
        }
      })
  });
}

function checkOption(option, text, doc){
  switch (option.value) {
    case "Película":
      return doc.data().original_title.toLowerCase().includes(text.value.toLowerCase());
    case "Autor":
      return doc.data().director.toLowerCase().includes(text.value.toLowerCase());
    case "Productor":
      return doc.data().producer.toLowerCase().includes(text.value.toLowerCase());
    case "Fecha":
      return doc.data().debut.toLowerCase().includes(text.value.toLowerCase());
    default:
      return doc.data().original_title.toLowerCase().includes(text.value.toLowerCase());
  }
}

function goTo(pel){
  sessionStorage.setItem("pelicula_id", pel);
}

function observer(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("Existe usuario activo");
          // ...
        } else {
          // User is signed out.
          displayName = "";
          console.log("No existe usuario activo");
          // ...
        }
      });
}
observer();





