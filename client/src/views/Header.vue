<template>
  <div class="header">
    <nav>
      <h1 class="logo">WebShop</h1>
    <h3>{{userEmail}}</h3>

      <ul class="nav-links">
        <input id="input-field" type="text" placeholder="Search..." />

        <button class="submit-button" type="submit">Submit</button>

        <li><router-link  to="/">Home</router-link></li>
        <li><router-link v-if="isLogged" to="/addMovie">Add Movie</router-link></li>
        <li>
          <router-link v-if="!isLogged" to="/login"><button>Login</button></router-link>
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
import axios from "axios"
import '../assets/script.js';
export default {
  name: 'Header',  
  data() {
    return {
      isLogged: this.checkIfAuthenticated()
    }
  },
  methods:{
    // isLoggedIn() {
    //   if(localStorage.getItem("token") === true){
    //     console.log("Authorized");
    //   }
    // },
    checkIfAuthenticated() {
      let token = localStorage.getItem("token")
      if(token) {
        return true
      }else {
        return false
      }      
    },
    loggedOut(){
      localStorage.removeItem("token");
      this.isLogged = this.checkIfAuthenticated()
      this.$router.push("/login");
      window.location.reload();
    },
  }
};
</script>
