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

    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>Add New Movie</v-card-title>
            <v-divider></v-divider>
            <v-form
              @submit.prevent="submitForm"
              ref="form"
              class="pa-5"
              enctype="multipart/form-data">
              <v-text-field
                label="Title"
                v-model="post.title"
                prepend-icon="mdi-note"
                :rules="rules"></v-text-field>

              <v-text-field
                label="Category"
                v-model="post.category"
                prepend-icon="mdi-view-list"
                :rules="rules"></v-text-field>

              <v-textarea
                label="Content"
                v-model="post.content"
                prepend-icon="mdi-note-plus"
                :rules="rules"></v-textarea>

              <v-file-input
                @change="selectFile"
                :rules="rules"
                show-size
                counter
                multiple
                label="Select Image"></v-file-input>

              <v-btn type="submit" class="mt-3" color="primary">Add Post</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </html>
</template>

<style>
.theme--light.v-btn.v-btn--has-bg {
  background-color: rgb(6, 52, 138);
  margin-bottom: 4px;
}

.pa-5 {
  width: 500px;
  justify-content: center;
}
</style>

<script>
import API from '../api';
import Header from './Header.vue';
export default {
  name: 'addMovie',
  components: { Header },
  data() {
    return {
      rules: [(value) => !!value || 'This field is required!'],
      post: {
        title: '',
        category: '',
        content: '',
        image: '',
      },
      image: '',
    };
  },
  created() {
    // Create a WebSocket connection to your server
    this.socket = new WebSocket('ws://localhost:8000'); // Replace with your server URL
    this.socket.addEventListener('open', () => {
      console.log('WebSocket connection established.');
    });
  },

  methods: {
    selectFile(file) {
      this.post.image = file[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('image', this.post.image);
      formData.append('title', this.post.title);
      formData.append('category', this.post.category);
      formData.append('content', this.post.content);
      if (this.$refs.form.validate()) {
        // Send a WebSocket message to notify the server and other clients
        this.socket.send(JSON.stringify({ type: 'newMovie', movie: this.post }));
        const response = await API.addPost(formData);
        this.$router.push({
          name: 'Home',
          params: { message: response.message },
        });
        window.location.reload();
      }
    },
  },
};
</script>
