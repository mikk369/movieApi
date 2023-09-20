<template>
  <v-container>
    <v-row>
      <div class="card" v-for="post in posts" :key="post._id">
        <div class="card-box">
          <router-link :to="{ name: 'post', params: { id: post._id } }" class="link-container">
            <img class="poster" alt="Avatar" height="300" width="200" :src="`/${post.image}`" />
          </router-link>
          <div class="lower-card">
            <h4 class="movie-name">
              <b>{{ post.title }}</b>
            </h4>
            <p class="category">{{ post.category }}</p>
            <p class="content">{{ post.content.substring(0, 100) + '...' }}</p>
            <div class="liked-button-wrapper">
              <button
                v-if="isLoggedIn"
                class="like-button"
                :class="{ liked: isMovieLiked(post) }"
                @click="likeMovie(post)">
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
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Header from './Header.vue';
import Card from './Card.vue';
import API from '../api';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      likedMovies: [],
    };
  },
  async created() {
    this.posts = await API.getAllPosts();

    // Load the likedMovies array from localStorage if it exists
    const likedMoviesData = localStorage.getItem('likedMovies');
    if (likedMoviesData) {
      this.likedMovies = JSON.parse(likedMoviesData);
    }
  },
  methods: {
    likeMovie(movie) {
      // Check if the movie is already liked using _id
      const index = this.likedMovies.findIndex((likedMovie) => likedMovie._id === movie._id);

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
      return this.likedMovies.some((likedMovie) => likedMovie._id === movie._id);
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

<style>
.link-container {
  text-decoration: none;
}
.container {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 60px;
}
.card img {
  border-radius: 9px 9px 0px 0px;
  width: 100%;
}
.card {
  width: 220px;
  height: 400px;
  border: 1px solid rgb(148, 147, 147);
  border-radius: 9px;
  position: relative;
  background: rgb(16, 20, 20);
  background: linear-gradient(180deg, rgba(16, 20, 20, 1) 0%, rgba(53, 68, 66, 1) 99%);
  margin-right: 9px;
  margin-bottom: 30px;
}

.lower-card {
  border-radius: 0 0 5px 5px;
  width: 200px;
  font-size: 15px;
  color: white;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.liked-button-wrapper {
  display: flex;
  justify-content: end;
}
.like-button-heart {
  height: 20px;
}
.lower-card h4,
p {
  margin-left: 10px;
  align-self: normal;
}

.movie-rows {
  padding-left: 3px;
}
.liked {
  color: red;
}
</style>
