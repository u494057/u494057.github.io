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


var addFilmButton = document.getElementById('filmButton');

addFilmButton.disabled = false;


let actores_input = ["actor1", "actor2", "actor3", "actor4", "actor5"]
let actores = []
let generos_input = ["genres1", "genres2", "genres3", "genres4"]
let generos = []

function addFilmBD(){
    db.collection("films").add({
        original_title: document.getElementById("original_title").value,
        director: document.getElementById("director").value,
        producer: document.getElementById("producer").value,
        writter: document.getElementById("writter").value,
        budget: document.getElementById("budget").value,
        box_office: document.getElementById("box_office").value,
        debut: document.getElementById("debut").value,
        duration: document.getElementById("duration").value,
        sinopsis: document.getElementById("sinopsis").value,
        main_actors: actores,
        genres: generos

    }).then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error){
        console.error("Error adding content: ", error);
    });
};


function addFilm(){
    actores_input.forEach(function(elemento, indice, array) {
        console.log(elemento, indice);
        if(document.getElementById(elemento).value.length != 0){
            actores.push(document.getElementById(elemento).value);
        }
    })

    generos_input.forEach(function(elemento, indice, array) {
        console.log(elemento, indice);
        if(document.getElementById(elemento).value.length != 0){
            generos.push(document.getElementById(elemento).value);
        }
    })

    addFilmBD();
    
}

function observer(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          //displayName = user.displayName;
          //addFilmButton.disabled = false;
          console.log("Existe usuario activo");
          // ...
        } else {
          // User is signed out.
          //displayName = "";
          //addFilmButton.disabled = true;
          console.log("No existe usuario activo");
          // ...
        }
      });
}
observer();

