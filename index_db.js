// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBaNPkOlpvO96SdJa5NU6zA7OzKQqK-_m8",
    authDomain: "iweb-fcd20.firebaseapp.com",
    databaseURL: "https://iweb-fcd20.firebaseio.com",
    projectId: "iweb-fcd20",
    storageBucket: "iweb-fcd20.appspot.com",
    messagingSenderId: "368681543245",
    appId: "1:368681543245:web:842e09c367ae756b1ede04"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();


//Lectura de datos de la db
var mejor_valoradas = document.getElementById('mejor_valoradas');
var top_recaudaciones = document.getElementById('top_recaudaciones');

//citiesRef.orderBy("name").limit(3)

function load() {
  console.log("CARGANDO_PELICULAS");
  db.collection("films").orderBy("budget", "desc").limit(5).get().then(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
        mejor_valoradas = "";
        var element = document.createElement("a");
        element.onclick = function() {goTo(doc.id)};
        element.innerHTML = "";
        element.innerHTML += `
        <a href="fichatecnica.html" style="color:green"> ${doc.data().original_title}</a>
        <br>
        `;
        document.getElementById("mejor_valoradas").appendChild(element);
      })
  });

  db.collection("films").orderBy("box_office", "desc").limit(5).get().then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      top_recaudaciones = "";
      var element = document.createElement("a");
      element.onclick = function() {goTo(doc.id)};
      element.innerHTML = "";
      element.innerHTML += `
      <a href="fichatecnica.html" style="color:green">${doc.data().original_title}</a>
      <br>
      `;
      document.getElementById("top_recaudaciones").appendChild(element);
    })
});

}
function goTo(pel){
  //console.log(pel);
  sessionStorage.setItem("pelicula_id", pel);
  //console.log(sessionStorage.getItem("pelicula_id"));
  //window.location.href = 'fichatecnica.html';
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




