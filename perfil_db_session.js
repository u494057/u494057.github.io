var displayName;

function registrar(){

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    var nombre = document.getElementById('nombre').value;

    if(email==null || password==null || password2==null || nombre==null){
        console.log("Falta de rellenar algún campo para el registro");
        window.alert("Falta de rellenar algún campo para el registro");
    }
    else if(password == password2){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result){
            console.log("Registro: " + email + " - " + password);
            window.alert("Registro correcto");
            return result.user.updateProfile({
                displayName: nombre
              })
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + " - " + errorMessage);
            window.alert("El correo introducido no es correcto");
        })
        window.location.href = 'index.html';
    }
    else{
        console.log("Registro erroneo: las contraseñas introducidas no son idénticas");
        window.alert("Registro erroneo: las contraseñas introducidas no son idénticas");
    }
}

function acceder(){

    var email = document.getElementById('emailA').value
    var password = document.getElementById('passwordA').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
        console.log("Acceso: " + email);
        window.location.href = 'index.html';
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " - " + errorMessage);
        window.alert("Usuario o contraseña incorrecto");
      });
}

var pantallacrear = true;

function cambiopantalla(){
    if(pantallacrear){
        console.log("Pantalla de crear");
        var contenido = document.getElementById('crear-login');
        contenido.innerHTML = 
        `
        <div class="row">
            &emsp;<h4 class="mt-4 mb-3">Crear Cuenta | <a 
                style="color:black;" 
                onclick="cambiopantalla()" 
                href="#"
            >Iniciar Sesión</a></h4>
        </div>
        <br>
        <input id="nombre" type="nombre" placeholder="Nombre"><br><p><p>
        <input id="email" type="email" placeholder="Email"><br><p><p>
        <input id="password" type="password" placeholder="Contraseña"><br><p><p>
        <input id="password2" type="password" placeholder="Repetir Contraseña"><br><p><p>
        <button onclick="registrar()">Registrarse</button>
        `;
        pantallacrear = false;
    }else{
        console.log("Pantalla de logear");
        var contenido = document.getElementById('crear-login');
        contenido.innerHTML = 
        `
        <div class="row">
            &emsp;<h4 class="mt-4 mb-3"><a 
                style="color:black;" 
                onclick="cambiopantalla()" 
                href="#"
            >Crear Cuenta</a> | Iniciar Sesión</h4>
        </div>
        <br>
        <input id="emailA" type="email" placeholder="Email"><br><p><p>
        <input id="passwordA" type="password" placeholder="Contraseña"><br><p><p>
        <button onclick="acceder()">Acceder</button>
        `;
        pantallacrear = true;
    }
}

function logging(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        //return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}

cambiopantalla();