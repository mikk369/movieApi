<template>
  <div class="header">
    <nav>
      <h1 class="logo">WebShop</h1>
      <ul class="nav-links">
        <input id="input-field" type="text" placeholder="Search..." />

        <button class="submit-button" type="submit">Submit</button>

        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/addMovie">Add Movie</router-link></li>
        <li>
          <router-link to="/login"><button>Login</button></router-link>
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
};
</script>
