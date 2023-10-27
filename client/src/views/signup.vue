<template>
  <html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Lexend+Deca:wght@300;400&family=Montserrat:ital,wght@1,900&family=Poppins:wght@300;400;600;700;800&family=Roboto:wght@500;900&display=swap"
        rel="stylesheet"
    />

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
        integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
    />
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta
        password="viewport"
        content="width=device-width, initial-scale=1.0"
    />
  </head>
  <Header></Header>

  <form class="sign-up-form" @submit.prevent="submitSignUp">
    <h1>Sign Up</h1>
    <div class="input-group">
      <input type="email" placeholder="Email" v-model="email" required @input="clearError"/>
    </div>

    <div class="input-group">
      <input type="password" placeholder="Password" v-model="password" required @input="clearError"/>
    </div>

    <div class="input-group">
      <input type="password" placeholder="Confirm Password" v-model="passwordConfirm" required @input="clearError"/>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <v-btn class="submit-btn" v-on:click.prevent="submitSignUp">Submit</v-btn>
  </form>
  </html>
</template>

<style>
.sign-up-form {
  max-width: 400px;
  margin: 150px auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 20px;
}

.error-message {
  color: red;
  margin-bottom: 20px;
}

.submit-btn {
  width: 100%;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: '',
    };
  },
  methods: {
    clearError() {
      this.errorMessage = '';
    },
    async submitSignUp() {
      try {
        await axios.post('http://localhost:8000/api/users/signup', {
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        });
        this.$router.push('/login');
      } catch (err) {
        this.errorMessage = err.response.data.error;
      }
    },
  },
};
</script>
