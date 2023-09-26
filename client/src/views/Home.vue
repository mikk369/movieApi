<template>
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Lexend+Deca:wght@300;400&family=Montserrat:ital,wght@1,900&family=Poppins:wght@300;400;600;700;800&family=Roboto:wght@500;900&display=swap"
        rel="stylesheet" />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
        integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer" />
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>

    <Header></Header>
    <div class="row">
      <div class="card" v-for="movie in movies" :key="movie.imdbID">
        <!-- Render movie data here using Vue data-binding -->
        <!-- For example: -->
        <img class="poster" :src="movie.Poster" alt="Avatar" height="300" width="200" />
        <h4 class="movie-name">
          <b>{{ movie.Title }}</b>
        </h4>
        <p class="year">{{ movie.Year }}</p>
        <button
          v-if="isLoggedIn"
          class="like-button"
          :class="{ liked: isMovieLiked(movie) }"
          @click="likeMovie(movie)">
          <svg
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
          </svg>
        </button>
      </div>
    </div>
    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      v-if="this.$route.params.message">
      {{ this.$route.params.message }}
    </v-alert>

    <Card :posts="posts"></Card>
  </html>
</template>

<style scoped>
.row {
  justify-content: center;
}
</style>

<script>
import Header from './Header.vue';
import Card from './Card.vue';
import API from '../api';
// import '../assets/script.js';
export default {
  name: 'Home',

  data() {
    return {
      posts: [],
      movies: [],
      likedMovies: [],
      socket: null,
    };
  },
  async created() {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (storedMovies && Array.isArray(storedMovies)) {
      // If movies exist in localStorage and are in the correct format
      this.movies = storedMovies; // Update the movies array in Vue's data
    }
    // Force a full component reload by using $forceUpdate
    this.posts = await API.getAllPosts();
  },
  methods: {
    likeMovie(movie) {
      // Check if the movie is already liked using _id
      const index = this.likedMovies.findIndex((likedMovie) => likedMovie.imdbID === movie.imdbID);

      if (index === -1) {
        // If not liked, add it to the likedMovies array
        this.likedMovies.push(movie);
      } else {
        // If already liked, remove it from the likedMovies array
        this.likedMovies.splice(index, 1);
      }

      // Store the updated likedMovies array in localStorage
      localStorage.setItem('likedMovies', JSON.stringify(this.likedMovies));

      // Update the like status of the movie
      movie.likeStatus = index === -1 ? 'liked' : '';
    },
    isMovieLiked(movie) {
      // Check if the movie is liked
      return this.likedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID);
    },
  },
  computed: {
    isLoggedIn() {
      // Check if a token exists in local storage
      const token = localStorage.getItem('token');
      return !!token; // Return true if the token exists, false otherwise
    },
  },
  components: { Header, Card },
};
</script>
