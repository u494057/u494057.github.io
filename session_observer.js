//Funciones para cerrar la sesión del usuario
function sesioncerrada(){
    console.log("Sesion Cerrada");
    var contenido = document.getElementById('contenido');
    contenido.innerHTML = ``;
}

function cerrarsesion(){
    firebase.auth().signOut().
    then(function(){
        console.log('Cerrando sesion');
        sesioncerrada();
    })
    .catch(function(error){
        console.log(error);
    })
    location.reload();
}

//Observer para ver cambios en la sesión
function observer(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log("Existe usuario activo " + user.displayName);
            //displayName = user.displayName;
            document.getElementById('perfil').innerHTML = `
            <a class="nav-link" onclick="cerrarsesion()" href="index.html">Cerrar Sesión</a>
            `;
            // ...
        } else {
            // User is signed out.
            console.log("No existe usuario activo");
            var perfil_button = document.getElementById('perfil').innerHTML = `
            <a class="nav-link" href="perfil.html">Iniciar Sesión</a>
            `;
        }
    });
}
observer();