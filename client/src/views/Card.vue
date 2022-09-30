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

<template>
  <v-container>
    <v-row>
      <v-col sm="2" class="pa-3" v-for="post in posts" :key="post._id">
        <v-card
          height="450px"
          class="pa-1"
          :to="{ name: 'post', params: { id: post._id } }"
        >
          <v-img height="250" :src="`/${post.image}`"></v-img>
          <v-btn class="ml-4 mt-3" cmall outlined color="indigo">{{
            post.category
          }}</v-btn>
          <v-card-title class="headline"> {{ post.title }} </v-card-title>
          <v-card-text class="py-0">
            <p>{{ post.content.substring(0, 100) + '...' }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.v-btn {
  /* content description button margins */
  margin-left: 5px;
  margin-top: 5px;
}
.row {
  align-items: center;
  justify-content: center;
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
    };
  },
  async created() {
    this.posts = await API.getAllPosts();
  },
  components: { Header, Card },
};
</script>
