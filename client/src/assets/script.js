'use strict';

//this listens for DOM content loaded just in case
document.addEventListener('DOMContentLoaded', () => {
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
                <button class="like-button" data-movie="${JSON.stringify(movie)}">Like</button>
              </div>
            </div> `;

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

  //movies array from localstorage
  let movieArr = [];
  //gets items from localstorage and parses back to JSON
  let movies = JSON.parse(localStorage.getItem('movies'));
  // check if moveArr has data
  if (movies !== null) {
    //loops over the items from localstorage and pushes to array
    for (let i = 0; i < movies.length; i++) {
      movieArr.push(movies[i]);
    }
  }
  let reverseArr = movieArr.reverse();
  // console.log(movieArr)
  reverseArr.forEach((localMovies) => {
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
    rowElement[0].appendChild(movieContainer);
  });
});
