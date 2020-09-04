var db = firebase.firestore();

//Lectura de datos de la db
var comentarios = document.getElementById('main');

var nombre;
var director;
var productor;
var escritor;
var presupuesto;
var ganancias;
var fecha_estreno;
var duracion;
var sinopsis;
var actores;
var generos;
var caratula;

var asd;

function loadDB() {
  db.collection("films").where(firebase.firestore.FieldPath.documentId(), '==', sessionStorage.getItem("pelicula_id"))
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          nombre = doc.data().original_title;
          director = doc.data().director;
          productor = doc.data().producer;
          escritor = doc.data().writter;
          presupuesto = doc.data().budget;
          ganancias = doc.data().box_office;
          fecha_estreno = doc.data().debut;
          duracion = doc.data().duration;
          sinopsis = doc.data().sinopsis;
          actores = doc.data().main_actors;
          generos = doc.data().genres;
          caratula = doc.data().image_main;
          //asd = doc.data().comments[0].user;  
          //console.log("pasando " + asd);


          // Pruebas para obtener la url de una imagen a partir de su nombre
          /*
          var storage = firebase.storage();
          storage.ref('FastFurious-HobbsShaw_img_main.jpg').getDownloadURL()
          .then((url) => {
            caratula = url;
          })
          */

          loadHTML();
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

}

function loadHTML(){
    console.log(nombre);

    comentarios.innerHTML = `
    <!-- Page Heading/Breadcrumbs -->
    <h1 class="mt-4 mb-3"> ${nombre} </h1>

    <ol class="breadcrumb">
      <li class="breadcrumb-item active">${nombre}</li>
			<li class="breadcrumb-item">
        <a href="fichatecnica.html"><b>Ficha Técnica</b></a>
      </li>
			<li class="breadcrumb-item">
        <a href="analisis.html">Análisis</a>
      </li>
			<li class="breadcrumb-item">
        <a href="comentarios.html">Comentarios</a>
      </li>
    </ol>

    <!-- Intro Content -->
    <div class="row">
      <div class="col">
        <img class="img-fluid rounded mb-4" src="${caratula}" alt="">
      </div>
      <div class="col-lg-6">
				<h2>Ficha Técnica</h2>
				<div class="row">
					<div class="col-lg-6">
					<p>
					<b>Título:</b> ${nombre}
					<br><b>Duración:</b> ${duracion}
					<br><b>Fecha de Estreno:</b> ${fecha_estreno}
					<br><b>Género:</b> ${generos}
					<br><b>Presupuesto:</b> ${presupuesto} millones USD
					<br><b>Recaudación:</b> ${ganancias} millones USD
					
					
					</p>
					</div>
					<div class="col-lg-6">
					<p>
					<b>Director:</b> ${director}
					<br><b>Productora:</b> ${productor}
					<br><b>Escritor:</b> ${escritor}
					<br><b>Actores:</b> ${actores}
					
					
					</p>
					</div>
				</div>
			</div>
    </div>
    <!-- /.row -->

    <!-- Team Members -->
    <h2>Sinopsis</h2>

    <div class="row">
      <div class="col">
				<p>
				${sinopsis}
				</p>

      </div>
    </div>
    <!-- /.row -->

    <!-- Our Customers -->
    <h2>Galería</h2>
    <div class="row">
      <div class="col-lg-2 col-sm-4 mb-4">
        <img class="img-fluid" src="images/ff1.jpg" alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img class="img-fluid" src="images/ff2.jpg" alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img class="img-fluid" src="images/ff3.jpg" alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img class="img-fluid" src="images/ff4.jpg" alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img class="img-fluid" src="images/ff5.jpg" alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img class="img-fluid" src="images/ff6.jpg" alt="">
      </div>
    </div>
    
    `;

}
loadDB();




