<template>
  <div class="header">
    <nav>
      <h1 class="logo">WebShop</h1>
      <h3>Hello, {{ getUserName() }}</h3>
      <ul class="nav-links">
        <input id="input-field" type="text" placeholder="Search..." />

        <button class="submit-button" type="submit">Submit</button>

        <li><router-link to="/">Home</router-link></li>
        <li>
          <router-link v-if="isLogged" to="/addMovie">Add Movie</router-link>
        </li>
        <li>
          <router-link v-if="!isLogged" to="/login"
            ><button>Login</button></router-link
          >
        </li>

        <li>
          <router-link v-if="!isLogged" to="signUp"
            ><button class="btn">Sign up</button></router-link
          >
        </li>
        <li>
          <button v-if="isLogged" @click="loggedOut">Logout</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import '../assets/script.js';
export default {
  name: 'Header',

  data() {
    return {
      isLogged: this.checkIfAuthenticated(),
    };
  },
  methods: {
    checkIfAuthenticated() {
      let token = localStorage.getItem('token');
      if (token) {
        return true;
      } else {
        return false;
      }
    },
    loggedOut() {
      try {
        let keysToRemove = ['token', 'user'];
        keysToRemove.forEach((key) => {
          localStorage.removeItem(key);
        });
        this.isLogged = this.checkIfAuthenticated();
        this.$router.push('/login');
        setTimeout(() => {
          alert('You are logged out ');
        }, 500);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        alert(err.response.data.message);
      }
    },
    getUserName() {
      let user = localStorage.getItem('user');
      return user;
      // console.log(user);
    },
  },
};
</script>
