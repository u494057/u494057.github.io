var db = firebase.firestore();

var mejor_valoradas = document.getElementById('mejor_valoradas');
var top_recaudaciones = document.getElementById('top_recaudaciones');
var image_top = document.getElementById('image_top');

var new_1 = document.getElementById('new_1');
var new_2 = document.getElementById('new_2');
var image_bot = document.getElementById('image_bot');

function load() {
  db.collection("films").orderBy("budget", "desc").limit(6).get().then(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        mejor_valoradas = "";
        var element = document.createElement("a");
        element.onclick = function() {setFilm(doc.id)};
        element.onmouseover = function() {showImage(image_top, doc.id)};
        element.innerHTML = "";
        element.innerHTML += `
        <a href="fichatecnica.html"> ${doc.data().original_title}</a>
        <br>
        `;
        document.getElementById("mejor_valoradas").appendChild(element);
      })
  });

  db.collection("films").orderBy("box_office", "desc").limit(6).get().then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      top_recaudaciones = "";
      var element = document.createElement("a");
      element.onclick = function() {setFilm(doc.id)};
      element.onmouseover = function() {showImage(image_top, doc.id)};
      element.innerHTML = "";
      element.innerHTML += `
      <a href="fichatecnica.html"> ${doc.data().original_title}</a>
      <br>
      `;
      document.getElementById("top_recaudaciones").appendChild(element);
    })
  });

  
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  var mounth_cap = yyyy + '-' + String(today.getMonth() + 2).padStart(2, '0') + '-' + dd; 
  var year_cap = (today.getFullYear() + 1) + '-' + mm + '-' + dd;
  today = yyyy + '-' + mm + '-' + dd;

  db.collection("films").where("debut", ">=", today).where("debut", "<=", mounth_cap)
  .limit(6).get().then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      top_recaudaciones = "";
      var element = document.createElement("a");
      element.onclick = function() {setFilm(doc.id)};
      element.onmouseover = function() {showImage(image_bot, doc.id)};
      element.innerHTML = "";
      element.innerHTML += `
      <a href="fichatecnica.html">${doc.data().original_title}</a>
      <br>
      `;
      document.getElementById("new_1").appendChild(element);
    })
  });

  db.collection("films").where("debut", ">=", today).where("debut", "<=", year_cap)
  .limit(6).get().then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      top_recaudaciones = "";
      var element = document.createElement("a");
      element.onclick = function() {setFilm(doc.id)};
      element.onmouseover = function() {showImage(image_bot, doc.id)};
      element.innerHTML = "";
      element.innerHTML += `
      <a href="fichatecnica.html">${doc.data().original_title}</a>
      <br>
      `;
      document.getElementById("new_2").appendChild(element);
    })
  });

}


function setFilm(pel){
  sessionStorage.setItem("pelicula_id", pel);
}

function showImage(place, film_id){
  db.collection("films").where(firebase.firestore.FieldPath.documentId(), '==', film_id)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          caratula = doc.data().image_main;
          if (caratula != null){
            place.innerHTML =`<img class="img-fluid rounded mb-4" src="${caratula}" style="width: 500px; height: 180px;" alt=""></img>`
          }else{
            place.innerHTML =`<img class="img-fluid rounded mb-4" style="width: 500px; height: 180px;" alt=""></img>`
          }
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}

load();




