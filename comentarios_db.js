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

var addComentarioButton = document.getElementById('addComentario');
var displayName = "";

addComentarioButton.disabled = false;

function addComment(){
    var com_id;
    db.collection("comments").add({
        user: displayName,
        comment: document.getElementById("textarea").value,
        date: new Date()
    }).then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
        db.collection("films").doc(sessionStorage.getItem("pelicula_id")).update({
            comments: firebase.firestore.FieldValue.arrayUnion(docRef.id)
        });
    }).catch(function(error){
        console.error("Error adding content: ", error);
    });
};


/* No esta supported
function addComment() {
    db.collection("films").doc(sessionStorage.getItem("pelicula_id")).update({
        comments: db.FieldValue.arrayUnion(
            comments: {
                user: displayName,
                comment: document.getElementById("textarea").value,
                date: new Date()
            }
        )
    });
}
*/

//Lectura de datos de la db
var comentarios = document.getElementById('comentarios');
var titulo = document.getElementById('titulo');
var subtitulo = document.getElementById('subtitulo');


function loadDB() {
    db.collection("films").where(firebase.firestore.FieldPath.documentId(), '==', sessionStorage.getItem("pelicula_id"))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            titulo.innerHTML = doc.data().original_title;
            subtitulo.innerHTML = doc.data().original_title;
            var com_collection = doc.data().comments;
            com_collection.reverse();
            comentarios.innerHTML = '';
            com_collection.forEach((com_id) => {
                loadComment(com_id);    
            })
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}


function loadComment(id){
    console.log(id);
    db.collection("comments").where(firebase.firestore.FieldPath.documentId(), '==', id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(com) {
        comentarios.innerHTML += `
            <div class="card-body">
                <h4 class="card-header comen1">${com.data().user}</h4>
                ${com.data().comment}
            </div>
        `;
        });   
    });
}

function observer(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          displayName = user.displayName;
          addComentarioButton.disabled = false;
          console.log("Existe usuario activo");
          // ...
        } else {
          // User is signed out.
          displayName = "";
          addComentarioButton.disabled = true;
          console.log("No existe usuario activo");
          // ...
        }
      });
}
observer();
loadDB();





