// click sur image film
document.body.onclick = function(e) {   //when the document body is clicked
  e.preventDefault;
  e = e.target;                   //assign the element clicked to e

  if (e.className && e.className.indexOf('img-film') != -1) {
    //if the element has a class name, and that is 'someclass' then...
    // ouverture popup film
    var popup = document.getElementById("popup_film");
    if (popup.style.display === "block") {
      popup.style.display = "none";
    } else {
      popup.style.display = "block";
    }
    FillPopupFilm(e.getAttribute("id-film")); // le id du film est stocke dans attribute image
  } 
  
}

/*var elements = document.getElementsByClassName("img-film");
for (var i = 0; i < elements.length; i++) {
  //elements[i].addEventListener('click', myFunction, false);
  console.log("test");
  console.log(elements[i].getAttribute("id-film"));
}*/


// Remplir popup film
function FillPopupFilm(id_film){
  url_film_popup = 'http://localhost:8000/api/v1/titles/' + String(id_film);
  fetch(url_film_popup)
  .then(function(resp) {
    var myJSON_filmpopup_promise = resp.json();
    myJSON_filmpopup_promise.then(function(myJSON_filmpopup){
      document.getElementById("text_popup_film").innerHTML = '<img src="' + myJSON_filmpopup["image_url"] + '">'
                                                            +'<p> <span class="intitule"> Titre: </span>' + myJSON_filmpopup["title"] + '</p>'
                                                            +'<p> <span class="intitule"> Genres: </span>' + myJSON_filmpopup["genres"] + '</p>'
                                                            +'<p> <span class="intitule"> Date de sortie: </span>' + myJSON_filmpopup["date_published"] + '</p>' 
                                                            +'<p> <span class="intitule"> Rated: </span>' + myJSON_filmpopup["rated"] + '</p>'
                                                            +'<p> <span class="intitule"> Score Imdb: </span>' + myJSON_filmpopup["imdb_score"] + '</p>'  
                                                            +'<p> <span class="intitule"> Réalisateur: </span>' + myJSON_filmpopup["directors"] + '</p>'
                                                            +'<p> <span class="intitule"> Acteurs: </span>' + myJSON_filmpopup["actors"] + '</p>'
                                                            +'<p> <span class="intitule"> Durée: </span>' + myJSON_filmpopup["duration"] + '</p>'
                                                            +'<p> <span class="intitule"> Pays d\'origine: </span>' + myJSON_filmpopup["countries"] + '</p>'
                                                            +'<p> <span class="intitule"> Résultat au Box Office: </span>' + myJSON_filmpopup["reviews_from_critics"] + '</p>'
                                                            +'<p> <span class="intitule"> Résumé: </span>' + myJSON_filmpopup["description"] + '</p>'                                                            
                                                            ;  
    });
  });  
}

// close popup film
let close_popup_film = document.getElementById('close_popup_film');
close_popup_film.addEventListener('click', function(e) {
  var popup = document.getElementById("popup_film");
  popup.style.display = "none";
  e.preventDefault();                 
});


// THE BEST FILM
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
.then(function(response) {

  if(!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
  }
  // Get JSON Promise from response object:
  var myJSON_promise = response.json();

  // Work with Promise object:
  myJSON_promise.then(function(myJSON)  {
    id = myJSON.results[0]["id"]; // recupere id film meilleure note
    url_best_film = 'http://localhost:8000/api/v1/titles/' + String(id);
    fetch(url_best_film)
    .then(function(resp) {
      var myJSON_bestfilm_promise = resp.json();
      myJSON_bestfilm_promise.then(function(myJSON_bestfilm){
        document.getElementById("img-best-film").src=myJSON_bestfilm["image_url"]; // modif image best film
        document.getElementById("title-best-film").textContent = myJSON_bestfilm["title"]; // modif titre best film
        document.getElementById("description-best-film").textContent = myJSON_bestfilm["description"]; // modif description best film
        document.getElementById("btn-best-film").setAttribute("id-film", myJSON_bestfilm["id"]); // attribue id film au bouton play       
      });
    });
  });

});


// LIST BESTS FILMS

async function asyncCall(IdList, IdHTML, indice_element) {
  await Promise.all(
    IdList.map(async (id) => {
      const response = await fetch(`http://localhost:8000/api/v1/titles/${id}`)
      const todo = await response.json()
      if (indice_element < 4)
      {
        var id_img_film = IdHTML + String(indice_element)
        document.getElementById(id_img_film).src=todo["image_url"]; // modif image film
        document.getElementById(id_img_film).alt=todo["title"]; // modif alt image film
        document.getElementById(id_img_film).setAttribute("id-film", todo["id"]);
      }
      else if (indice_element == 4)
      {
        var id_img_film = IdHTML + String(indice_element)
        document.getElementById(id_img_film).src=todo["image_url"]; // modif image film
        document.getElementById(id_img_film).alt=todo["title"]; // modif alt image film
        document.getElementById(id_img_film).setAttribute("id-film", todo["id"]);
        // recopie image film 4 sur image film 5
        id_img_film = IdHTML + "5";
        document.getElementById(id_img_film).src=todo["image_url"]; // modif image film
        document.getElementById(id_img_film).alt=todo["title"]; // modif alt image film
        document.getElementById(id_img_film).setAttribute("id-film", todo["id"]);
      }
      else 
      {
        var id_img_film = IdHTML + String(indice_element + 1)
        document.getElementById(id_img_film).src=todo["image_url"]; // modif image film
        document.getElementById(id_img_film).alt=todo["title"]; // modif alt image film
        document.getElementById(id_img_film).setAttribute("id-film", todo["id"]);      
      }

      indice_element += 1;
    })
  )
}

function makeRequestBestsFilms(){
  fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score') // 5 premiers meilleurs films
  .then(function(response) {
    var myJSON_promise = response.json();
    myJSON_promise.then(function(myJSON)  {
      var IdList = [myJSON.results[1]["id"], myJSON.results[2]["id"], myJSON.results[3]["id"], myJSON.results[4]["id"]]; // liste id films 1 a 4
      //asyncCall(IdList,'img-best-film-', 1);
      // recupere 5eme film
      fetch('http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score') // 5-10 meilleurs films
      .then(function(response) {
        var myJSON_promise = response.json();
        myJSON_promise.then(function(myJSON)  {
          IdList.push(myJSON.results[0]["id"], myJSON.results[1]["id"], myJSON.results[2]["id"]); // liste id films
          asyncCall(IdList,'img-best-film-', 1);          
        });  
      });
    });  
  })
}

makeRequestBestsFilms();


// CATEGORIES 1

function makeRequestCategorie1(){
  fetch('http://localhost:8000/api/v1/titles/?genre=Action&sort_by=-imdb_score') // 5 premiers meilleurs films Action
  .then(function(response) {
    var myJSON_promise = response.json();
    myJSON_promise.then(function(myJSON)  {
      var IdList = [myJSON.results[0]["id"], myJSON.results[1]["id"], myJSON.results[2]["id"], myJSON.results[3]["id"], myJSON.results[4]["id"]]; // liste id films 1 a 5
      // recupere 6 et 7eme film
      fetch('http://localhost:8000/api/v1/titles/?genre=Action&page=2&sort_by=-imdb_score') // 6-10 meilleurs films
      .then(function(response) {
        var myJSON_promise = response.json();
        myJSON_promise.then(function(myJSON)  {
          IdList.push(myJSON.results[0]["id"], myJSON.results[1]["id"]); // liste id films categorie 1
          asyncCallCategorie(IdList,'img-categorie1-', 1);          
        });  
      });
    });  
  })
}

//makeRequestCategorie1();

// CATEGORIES 2

function makeRequestCategorie2(){
  fetch('http://localhost:8000/api/v1/titles/?genre=Animation&sort_by=-imdb_score') // 5 premiers meilleurs films Animation
  .then(function(response) {
    var myJSON_promise = response.json();
    myJSON_promise.then(function(myJSON)  {

      var IdList = [myJSON.results[0]["id"], myJSON.results[1]["id"], myJSON.results[2]["id"], myJSON.results[3]["id"], myJSON.results[4]["id"]]; // liste id films 1 a 5

      // recupere 6 et 7eme film
      fetch('http://localhost:8000/api/v1/titles/?genre=Animation&page=2&sort_by=-imdb_score') // 6-10 meilleurs films
      .then(function(response) {
        var myJSON_promise = response.json();
        myJSON_promise.then(function(myJSON)  {
          IdList.push(myJSON.results[0]["id"], myJSON.results[1]["id"]); // liste id films categorie 1
          asyncCallCategorie(IdList,'img-categorie2-', 1);          
        });  
      });
    });  
  })
}

makeRequestCategorie2();

// CATEGORIES 3

function makeRequestCategorie3(){
  fetch('http://localhost:8000/api/v1/titles/?genre=Adventure&sort_by=-imdb_score') // 5 premiers meilleurs films Adventure
  .then(function(response) {
    var myJSON_promise = response.json();
    myJSON_promise.then(function(myJSON)  {

      var IdList = [myJSON.results[0]["id"], myJSON.results[1]["id"], myJSON.results[2]["id"], myJSON.results[3]["id"], myJSON.results[4]["id"]]; // liste id films 1 a 5

      // recupere 6 et 7eme film
      fetch('http://localhost:8000/api/v1/titles/?genre=Adventure&page=2&sort_by=-imdb_score') // 6-10 meilleurs films
      .then(function(response) {
        var myJSON_promise = response.json();
        myJSON_promise.then(function(myJSON)  {
          IdList.push(myJSON.results[0]["id"], myJSON.results[1]["id"]); // liste id films categorie 1
          asyncCallCategorie(IdList,'img-categorie3-', 1);          
        });  
      });
    });  
  })
}

makeRequestCategorie3();

// async call categorie

async function asyncCallCategorie(IdList, IdHTML, indice_element) {
  await Promise.all(
    IdList.map(async (id) => {
      const response = await fetch(`http://localhost:8000/api/v1/titles/${id}`)
      const todo = await response.json()
      if (indice_element < 4)
      {
        var id_img_film = IdHTML + String(indice_element)
        document.getElementById(id_img_film).src=todo["image_url"]; // modif image film
        document.getElementById(id_img_film).alt=todo["title"]; // modif alt image film
        document.getElementById(id_img_film).setAttribute("id-film", todo["id"]);
      }
      else if (indice_element == 4)
      {
        var id_img_film = IdHTML + String(indice_element)
        document.getElementById(id_img_film).src=todo["image_url"]; // modif image film
        document.getElementById(id_img_film).alt=todo["title"]; // modif alt image film
        document.getElementById(id_img_film).setAttribute("id-film", todo["id"]);
        // recopie image film 4 sur image film 5
        id_img_film = IdHTML + "5";
        document.getElementById(id_img_film).src=todo["image_url"]; // modif image film
        document.getElementById(id_img_film).alt=todo["title"]; // modif alt image film
        document.getElementById(id_img_film).setAttribute("id-film", todo["id"]);
      }
      else 
      {
        var id_img_film = IdHTML + String(indice_element + 1)
        document.getElementById(id_img_film).src=todo["image_url"]; // modif image film
        document.getElementById(id_img_film).alt=todo["title"]; // modif alt image film
        document.getElementById(id_img_film).setAttribute("id-film", todo["id"]);      
      }     

      indice_element += 1;
    })
  )
}

function makeRequestCategorie(nom_categorie, numero_categorie){
  fetch('http://localhost:8000/api/v1/titles/?genre='+nom_categorie+'&sort_by=-imdb_score') // 5 premiers meilleurs films Action
  .then(function(response) {
    var myJSON_promise = response.json();
    myJSON_promise.then(function(myJSON)  {
      var IdList = [myJSON.results[0]["id"], myJSON.results[1]["id"], myJSON.results[2]["id"], myJSON.results[3]["id"], myJSON.results[4]["id"]]; // liste id films 1 a 5
      // recupere 6 et 7eme film
      fetch('http://localhost:8000/api/v1/titles/?genre='+nom_categorie+'&page=2&sort_by=-imdb_score') // 6-10 meilleurs films
      .then(function(response) {
        var myJSON_promise = response.json();
        myJSON_promise.then(function(myJSON)  {
          IdList.push(myJSON.results[0]["id"], myJSON.results[1]["id"]); // liste id films categorie 1
          asyncCallCategorie(IdList,'img-categorie1-', 1);          
        });  
      });
    });  
  })
}

makeRequestCategorie("Action");