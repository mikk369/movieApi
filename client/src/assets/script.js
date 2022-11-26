'use strict';
//this listens for DOM content loaded just in case
export const socket = new WebSocket("ws://localhost:6060/");
document.addEventListener('DOMContentLoaded', () => {

//WS setup
socket.onopen = function () {
  console.log("WS Connection established at client side");
  // socket.send("Client says: hello");
};

socket.onmessage = function (event) {
  console.log(`WS Data received from server: ${event.data}`);
};

socket.onclose = function (event) {

  if (event.wasClean) {

    console.log(`WS Connection closed cleanly, code=${event.code} reason=${event.reason}`

    );

  } else {

    // e.g. server process killed or network down

    // event.code is usually 1006 in this case

    console.log("WS Connection died");

  }

};

socket.onerror = function (error) {

  console.log(`WS error: ${error.message}`);

};

  //apikey
  const apikey = '9f0ca0df';
  //search movies from API
  async function loadMovie(search) {
    try {
      let response = await fetch(
        `https://www.omdbapi.com/?apikey=${apikey}&s=${search}`
      );

      //convert response
      let data = await response.json();

      //clear old
      // document.getElementsByClassName('row').innerHTML = '';

      //loop over response

      data.Search?.forEach((movie) => {
        //create a div
        const movieContainer = document.createElement('div');
        //give it a classname
        movieContainer.classList.add('card');

        //create innerHtml for div
        movieContainer.innerHTML = `
        <div class="card-box">
              <img
                class="poster"
                src="${movie.Poster}"
                alt="Avatar"
                height="300" width="200"
              />
              <div class="lower-card">
              <h4 class="movie-name"><b>${movie.Title}</b></h4>
                <p class="year">${movie.Year}</p>
              </div>
            </div> `;

        //add movieContainer to movie-div
        const rowElement = document.getElementsByClassName('row');
        rowElement[0].appendChild(movieContainer);
        //saves movie to localstorage and converts to string
        localStorage.setItem("movies", JSON.stringify(data.Search));
        
      });
    } catch (error) {
      console.log('Error', error);
    }
  }

  //movies array from localstorage
  const movieArr = [];
  //gets items from localstorage and parses back to JSON 
  let movies = JSON.parse(localStorage.getItem("movies"));
  //loops over the items from localstorage and pushes to array
  for(let i = 0 ; i< movies.length; i++){
    movieArr.push(movies[i])
  }
  // console.log(movieArr)
  movieArr.forEach((localMovies)=> {

    // rendering movies from localstorage 
    const movieContainer = document.createElement('div');
            //give it a classname
            movieContainer.classList.add('card');
    
            //create innerHtml for div
            movieContainer.innerHTML = `
            <div class="card-box">
                  <img
                    class="poster"
                    src="${localMovies.Poster}"
                    alt="Avatar"
                    height="300" width="200"
                  />
                  <div class="lower-card">
                  <h4 class="movie-name"><b>${localMovies.Title}</b></h4>
                    <p class="year">${localMovies.Year}</p>
                  </div>
                </div> `;
    
            //add movieContainer to movie-div
            const rowElement = document.getElementsByClassName('row');
            rowElement[0].appendChild(movieContainer)
  })

  //  add listeners to search button
  const submitButton = document.getElementsByClassName('submit-button');
  let i = 0;
  for (i = 0; i < submitButton.length; i++) {
    submitButton[i].addEventListener('click', (response) => {
      response.preventDefault();
      //get search term from input
      const search = document.getElementById('input-field').value;
      //goto loadMovie function
      loadMovie(search);
      const object = {
        user: localStorage.getItem("user"),
        search: search
      }
      
      socket.send(JSON.stringify(object));

      //console log search term
      console.log('search', search);
    });
  }
  
  //add search by ENTER key
  document.addEventListener('keydown', function (e) {
    // console.log(e.key);
    if (e.key === 'Enter') {
      document.getElementsByClassName('submit-button').click();
    }
  });
  socket.onmessage = function (event) {
     const data = JSON.parse(event.data);
     if(data.user === localStorage.getItem("user")){
       console.log("JSON Message received: ", data);
       loadMovie(data.search)
     }
     };
});