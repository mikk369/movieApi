<!-- <template>
<div class="card-container">
    <div class="cards">
  </hr>
  <div class="movie-info">
      <img src="../../../data/bollywood.jpg" alt="movie poster">
      <div class="movie-rows">
        <h3 class="movie-name">Title</h3>
        <p class="movie-genre">Genre</p>
        <p class="movie-year">Year</p>
        <p class="movie-price">Price <sup>€</sup></p>
      </div>
      <button class="add-to-cart">Add Cart</button>
    </div>
  </div>
</div>
</template> -->

<template v-for="post in posts" :key="_id">
  <v-container>
    <v-row>
      <div v-if="posts.length > 0">
        <div class="card">
          <div class="card-box">
            <router-link :to="{ name: 'post', params: { id: _id } }" class="link-container">
              <img class="poster" alt="Avatar" height="300" width="200" :src="`/${image}`" />
              <div class="lower-card">
                <h4 class="movie-name">
                  <b> {{ title }} </b>
                </h4>
                <!-- <p class="year">${movie.Year}</p> -->
                <p class="category">{{ category }}</p>
                <p class="content">{{ content.substring(0, 100) + '...' }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<style>
.link-container {
  text-decoration: none;
}
.card-container {
  margin-top: 30px;
  /* display: flex; */

  /* justify-content: space-around; */
  padding: 60px;
}
.card {
  width: 200px;
  height: 370px;
  border: 1px solid rgb(148, 147, 147);
  border-radius: 9px;
  position: relative;
  background: rgb(16, 20, 20);
  background: linear-gradient(180deg, rgba(16, 20, 20, 1) 0%, rgba(53, 68, 66, 1) 99%);
  margin-right: 9px;
  margin-bottom: 30px;
}

.card img {
  border-radius: 9px 9px 0px 0px;
  width: 100%;
}
.lower-card {
  border-radius: 0 0 5px 5px;
  width: 200px;
  font-size: 15px;
  color: white;
  height: 90px;
}

.lower-card h4,
p {
  margin-left: 10px;
  align-self: normal;
}

.movie-rows {
  padding-left: 3px;
}
</style>

<script>
import Header from './Header.vue';
import Card from './Card.vue';
import API from '../api';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      _id: '',
      image: '',
      title: '',
      category: '',
      content: '',
    };
  },
  async created() {
    const response = (this.posts = await API.getAllPosts());
    response.forEach((post) => {
      this._id = post._id;
      this.image = post.image;
      this.title = post.title;
      this.category = post.category;
      this.content = post.content;
    });
  },
  components: { Header, Card },
};
</script>
