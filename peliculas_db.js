var db = firebase.firestore();


//Lectura de datos de la db
var comentarios = document.getElementById('peliculas');

function load() {
  db.collection("films").get().then(function(querySnapshot) {
      comentarios.innerHTML = '';
      querySnapshot.forEach((doc) => {
        var element = document.createElement("a");
        element.onclick = function() {goTo(doc.id)};
        element.innerHTML = "";
        element.innerHTML += `
          <a href="fichatecnica.html" style="color:black"> ${doc.data().original_title} </a>
          <br>
        `;
        comentarios.appendChild(element);
      })
  });
}

function goTo(pel){
  console.log(pel);
  sessionStorage.setItem("pelicula_id", pel);
  //console.log(sessionStorage.getItem("pelicula_id"));
  //window.location.href = 'fichatecnica.html';
}

load();




