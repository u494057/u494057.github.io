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

addComentarioButton.disabled = true;

function addComment(){
    db.collection("comments").add({
        user: displayName,
        comment: document.getElementById("textarea").value,
        date: new Date()
    }).then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error){
        console.error("Error adding content: ", error);
    });
};

//Lectura de datos de la db
var comentarios = document.getElementById('comentarios');

db.collection("comments").orderBy("date", "desc").onSnapshot((querySnapshot) => {
    comentarios.innerHTML = '';
    querySnapshot.forEach((doc) => {
        comentarios.innerHTML += `
            <div class="card-body">
                <h4 class="card-header comen1">${doc.data().user}</h4>
                ${doc.data().comment}
            </div>
        `
    })

});

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





