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


let actores_input = ["actor1", "actor2", "actor3", "actor4", "actor5"];
let actores = [];
let generos_input = ["genres1", "genres2", "genres3", "genres4"];
let generos = [];
var image_main_file;

function addFilmBD(){
    if(image_main_file != null){
        var image_main_url;
        var uploader = document.getElementById('uploader');
        var storageRef = firebase.storage().ref('images_main/'+image_main_file.name);
        var task = storageRef.put(image_main_file);
        task.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        }, function error(err) {

        },function complete() {
            storageRef.getDownloadURL()
            .then((url) => {
                image_main_url = url;
                console.log(url);
                addFilmBD2(image_main_url);
            })
        });
    }else{
        addFilmBD2("");
    }
}

function addFilmBD2(image_main_url){
    db.collection("films").add({
        original_title: document.getElementById("original_title").value,
        director: document.getElementById("director").value,
        producer: document.getElementById("producer").value,
        writter: document.getElementById("writter").value,
        budget: parseInt(document.getElementById("budget").value),
        box_office: parseInt(document.getElementById("box_office").value),
        debut: document.getElementById("debut").value,
        duration: parseInt(document.getElementById("duration").value),
        sinopsis: document.getElementById("sinopsis").value,
        main_actors: actores,
        genres: generos,
        image_main: image_main_url
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

function updatePortada(){
    if(image_main_file != null){
        var image_main_url;
        var uploader = document.getElementById('uploader');
        var storageRef = firebase.storage().ref('images_main/'+image_main_file.name);
        var task = storageRef.put(image_main_file);
        task.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        }, function error(err) {

        },function complete() {
            storageRef.getDownloadURL()
            .then((url) => {
                image_main_url = url;
                console.log(url);
                updatePortada2(image_main_url);
            })
        });
    }
}

function updatePortada2(image_main_url){
    var film_id;
    db.collection("films").where("original_title", '==', document.getElementById("original_title").value)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            film_id = doc.id;
            updatePortada3(film_id, image_main_url);
        });
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });    
}

function updatePortada3(film_id, image_main_url){
    db.collection("films").doc(film_id).update({
        image_main: image_main_url
    }).then(function(docRef){
        console.log("Document main image edited");
    }).catch(function(error){
        console.error("Error adding content: ", error);
    });
}


function cambiopantalla(pantalla){
    if(pantalla == "add_film"){
        console.log("Pantalla para crear nueva película");
        var contenido = document.getElementById('main');
        contenido.innerHTML = 
        `
        <input id="original_title" placeholder="título"><br><p></p>
        <input id="director" placeholder="director"><br><p></p>
        <input id="producer" placeholder="productor"><br><p></p>
        <input id="writter" placeholder="escritor"><br><p></p>
        <input id="actor1" placeholder="actor"><br><p></p>
        <input id="actor2" placeholder="actor"><br><p></p>
        <input id="actor3" placeholder="actor"><br><p></p>
        <input id="actor4" placeholder="actor"><br><p></p>
        <input id="actor5" placeholder="actor"><br><p></p>
        <input id="budget" type="number" placeholder="presupuesto"><br><p></p>
        <input id="box_office" type="number" placeholder="ganancias"><br><p></p>
        <input id="debut" type="date" placeholder="fecha de estreno"><br><p></p>
        <input id="duration" type="number" placeholder="duración"><br><p></p>
        <input id="genres1" placeholder="género"><br><p></p>
        <input id="genres2" placeholder="género"><br><p></p>
        <input id="genres3" placeholder="género"><br><p></p>
        <input id="genres4" placeholder="género"><br><p></p>
        <input id="sinopsis" placeholder="sinopsis"><br><p></p>
        <input type="file" id="fileButton" value="upload"/><br><br>
        <input type="button" onclick="addFilm()" id="filmButton" value="Añadir Película"><br>
        <progress id="uploader" value="0" max="100">0%</progress><br><br>
        `;
        setupFileReader();

    }else if(pantalla = "update_portada"){
        console.log("Pantalla para actualizar portadas");
        var contenido = document.getElementById('main');
        contenido.innerHTML = 
        `
        <input id="original_title" placeholder="título"><br><p></p>
        <input type="file" id="fileButton" value="upload"/><br><br>
        <input type="button" onclick="updatePortada()" id="filmButton" value="Actualizar Portada"><br>
        <progress id="uploader" value="0" max="100">0%</progress><br><br>
        `;
        setupFileReader();
    }else{

    }
}

function setupFileReader(){
    image_main_file = null;
    var fileButton = document.getElementById('fileButton');
    fileButton.addEventListener('change', function(e){
        image_main_file = e.target.files[0];
    });
}

function loadPage(){
    var contenido = document.getElementById('all');
    contenido.innerHTML = 
    `
    <!-- Page Heading/Breadcrumbs -->
    <h1 class="mt-4 mb-3">Panel de Administración</h1>

        <div class="row">
        <h4 class="mt-4 mb-3">
            <a  
            style="color:black;" 
            onclick="cambiopantalla('add_film')" 
            href="#"
            >Añadir Película</a> | 

            <a  
            style="color:black;" 
            onclick="cambiopantalla('update_portada')" 
            href="#"
            >Actualizar Portada</a> | 
            
            </h4>
        </div>
        
        <div id="main"></div>
    </div>
    `
}

function observer(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          //displayName = user.displayName;
          //addFilmButton.disabled = false;
          console.log("Existe usuario activo");
          if(user.email == "adminiw@flahdkasl.com"){
            loadPage();
          }else{ 
              window.location.href = 'index.html';
          }
          // ...
        } else {
          // User is signed out.
          //displayName = "";
          //addFilmButton.disabled = true;
          console.log("No existe usuario activo");
          window.location.href = 'index.html';
          // ...
        }
      });
}
observer();

