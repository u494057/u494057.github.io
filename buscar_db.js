var db = firebase.firestore();


//Lectura de datos de la db
var resultados = document.getElementById('resultados');


//Incompleto

function mostrar() {

  var x = document.getElementById("resultados");
  var y = document.getElementById("space");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }

  db.collection("films").get().then(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
        resultados = "";
        var element = document.createElement("div");
        element.onclick = function() {goTo(doc.id)};
        element.innerHTML = "";
        element.innerHTML += `
        <div class="buscador">
          <div class="row">
            <div class="col-lg-4">${doc.data().original_title}</div>
            <div class="col-lg-2"> ${doc.data().director} </div>  
            <div class="col-lg-5"> ${doc.data().genres} </div> 
            <div class="col-lg-1"> Ir a... </div>
          </div>
        </div>
        `;
        document.getElementById("resultados").appendChild(element);
      })
  });
}
function goTo(pel){
  console.log(pel);
  sessionStorage.setItem("pelicula_id", pel);
  //console.log(sessionStorage.getItem("pelicula_id"));
  window.location.href = 'fichatecnica.html';
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
load();






