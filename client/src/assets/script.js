'use strict';
//this listens for DOM content loaded just in case
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('pageshow', function (event) {
    if (event.persisted && window.location.pathname === '/') {
      window.location.reload();
    }
  });
  //apikey
  const apikey = '9f0ca0df';
  //search movies from API
  async function loadMovie(search) {
    try {
      let response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${search}`);
      //convert response
      let data = await response.json();
      //clear old search
      document.getElementsByClassName('row')[0].innerHTML = '';

      //loop over response and display new results
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
                <div class="liked-button-wrapper">
                <button class="like-button-heart" data-movie="${JSON.stringify(movie.imdbID)}"><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="like-button-heart">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg></button>
                  </div>
              </div>
            </div> `;
        const likeButton = movieContainer.querySelector('.like-button-heart');
        // Get the JWT token from localStorage
        const jwtToken = localStorage.getItem('token');

        // Find the like button element by its class or ID

        if (jwtToken) {
          // Token exists in localStorage, display the like button
          likeButton.style.display = 'block'; // or 'inline-block', 'inline', etc., depending on your styling
        } else {
          // Token does not exist in localStorage, hide the like button
          likeButton.style.display = 'none';
        }
        // Retrieve apiLikedMovies from local storage or initialize as an empty array
        let apiLikedMovies = JSON.parse(localStorage.getItem('apiLikedMovies')) || [];

        // Check if the movie is already in the apiLikedMovies
        const isAlreadyLiked = apiLikedMovies.includes(movie.imdbID);

        if (isAlreadyLiked) {
          // Add the "liked" class to change the button color to red
          likeButton.classList.add('liked');
        }
        likeButton.addEventListener('click', () => {
          const movieDataString = likeButton.getAttribute('data-movie');
          const movieData = movieDataString;
          console.log(movieData);
          // Get existing apiLikedMovies from local storage or initialize as an empty array
          let apiLikedMovies = JSON.parse(localStorage.getItem('apiLikedMovies')) || [];
          // Check if the movie is already in the apiLikedMovies
          const isAlreadyLiked = apiLikedMovies.includes(movieData);

          if (!isAlreadyLiked) {
            // Add the movie to the liked movies array
            apiLikedMovies.push(movieData);

            // Update the liked movies in local storage
            localStorage.setItem('apiLikedMovies', JSON.stringify(apiLikedMovies));

            // Handle the Like action here (e.g., update the UI)
            console.log('Liked:', movieData);

            // Add a class to change the button color to red
            likeButton.classList.add('liked');
          } else {
            // Remove the movie from the array by IMDb ID
            apiLikedMovies = apiLikedMovies.filter((likedMovie) => likedMovie !== movieData);

            // Update the liked movies in local storage
            localStorage.setItem('apiLikedMovies', JSON.stringify(apiLikedMovies));

            // Handle the Unlike action here (e.g., update the UI)
            console.log('Unliked:', movie.Title);

            // Remove the 'liked' class to change the button color back to normal
            likeButton.classList.remove('liked');
          }
        });

        //add movieContainer to movie-div
        const rowElement = document.getElementsByClassName('row');
        rowElement[0].appendChild(movieContainer);
        //saves movie to localstorage and converts to string
        localStorage.setItem('movies', JSON.stringify(data.Search));
      });
    } catch (error) {
      console.log('Error', error);
    }
  }

  //  add listeners to search button
  const submitButton = document.getElementsByClassName('submit-button');
  let i = 0;
  for (i = 0; i < submitButton.length; i++) {
    submitButton[i].addEventListener('click', (e) => {
      e.preventDefault();
      //get search term from input
      const search = document.getElementById('input-field').value;
      //goto loadMovie function
      loadMovie(search);
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
});
