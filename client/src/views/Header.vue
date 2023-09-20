<template>
  <div class="header">
    <nav>
      <h1 class="logo">WebShop</h1>
      <ul class="nav-links">
        <input id="input-field" type="text" placeholder="Search..." />

        <button class="submit-button" type="submit">Submit</button>

        <li><router-link :to="{ name: 'Home' }" @click="refreshPage">Home</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/addMovie">Add Movie</router-link></li>

        <li v-if="!isLoggedIn">
          <router-link to="/login"><button>Login</button></router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="#" class="nav-link text-danger">
            <button @click="loggedOut">Logout</button></router-link
          >
        </li>

        <li>
          <router-link to="signUp"><button class="btn">Sign up</button></router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import '../assets/script.js';
export default {
  name: 'Header',
  computed: {
    isLoggedIn() {
      // Check if the token is present in localStorage to determine if the user is logged in
      return localStorage.getItem('token') !== null;
    },
  },
  methods: {
    loggedOut() {
      // Remove the token from localStorage and perform any other necessary actions
      localStorage.removeItem('token');
      console.log('logged out');
      // Redirect the user to the login page or any other appropriate page
      this.$router.go(0);
    },
    refreshPage() {
      // Use window.location.reload() to refresh the page
      this.$router.go(0);
    },
  },
};
</script>
