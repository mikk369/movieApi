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

      <title>WebShop</title>
    </head>

    <Header></Header>

    <form id="form">
      <h3 class="loginTag">Login</h3>
      <div class="emailInput">
        <input id="email" type="text" v-model="email" placeholder="Email" />
      </div>

      <div class="passwordInput">
        <input id="password" type="password" v-model="password" placeholder="password" />
      </div>

      <button class="inputSubmitButton btn btn-primary btn-block" v-on:click.prevent="submitLogin">
        login
      </button>
    </form>
  </html>
</template>

<style>
input {
  padding: 5px;
}
.loginTag {
  top: 25%;
  position: absolute;
  right: 47%;
}
.emailInput {
  top: 35%;
  position: absolute;
  right: 50%;
  padding: 5px;
  border-bottom: 1px solid white;
}
.passwordInput {
  top: 35%;
  position: absolute;
  right: 32%;
  padding: 5px;
  border-bottom: 1px solid white;
}
.inputSubmitButton {
  position: absolute;
  right: 24%;
  top: 34%;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submitLogin() {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        email: this.email,
        password: this.password,
      });
      localStorage.setItem('token', response.data.token);
      this.$router.push('/');
    },
  },
};
</script>
