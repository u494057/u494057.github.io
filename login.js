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