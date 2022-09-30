<template>

    <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta password="viewport" content="width=device-width, initial-scale=1.0" />
    
        </head>
    
      
        <Header></Header>


          <form class="sign-up-form">
          <h1>Sign Up</h1>
            <div class="email">
              <input type="text" placeholder="Email" v-model="email">
            </div>

            <div class="pw1">
              <input type="password" placeholder="Password" v-model="password">
            </div>

            <div class="pw2">
              <input type="password" placeholder="Confirm Password" v-model="passwordConfirm">
            </div>


          <v-btn class="mr-4" v-on:click.prevent="submitForm" > submit </v-btn>

        </form>

      </html>
    </template>
    
    <style>
      h1{
        display: flex;
        align-items: center;
      justify-content: center;
      margin-bottom: 9px;
      }

      .sign-up-form{
        position: relative;
        height: 300px;
        margin-top: 150px;
      }
      .email{
        position: absolute;
        left: 42%;
      }
      .pw1{
        position: absolute;
        left: 42%;
        top:30%
      }
      .pw2{
        position: absolute;
        left: 42%;
        top:47%
      }
      
     .mr-4{
      position: absolute;
        left: 47%;
        top:75%
     }
      
    </style>
    
    <script>
    import axios from 'axios';
    // import userApi from "../../../server/controllers/userApi"
      export default {
        name: 'signup',
        data(){
          return{
            email: "",
            password: "",
            passwordConfirm: ""
          }
        },
        methods: {
              submitForm(){
                const data = {
                  email: this.email,
                  password: this.password,
                  passwordConfirm: this.passwordConfirm,
                };
                const header = {
        "Content-Type": "application/json",
        "Accept": "*/*"
    }
                axios.post("http://127.0.0.1:8000/api/users/signup",data,header)
                .then(
                    res => {
                      console.log(res)
                  }
                ).catch(
                  err => {
                    console.log(err)
                }
             )
           }
         }
      }

    </script>