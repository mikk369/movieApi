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
    </head>

    <Header></Header>
    <v-container>
      <v-row no-gutters>
        <v-col sm="5" class="pa-4 mx-auto">
          <v-card class="pa-2">
            <v-img max-height="600px" max-width="900px" :src="`/${post.image}`"></v-img>
            <v-card-actions class="pb-0">
              <v-row class="mt-1 mx-1">
                <v-col class="d-flex justify-end">
                  <v-btn color="success" text :to="{ name: 'edit-post', params: { id: id } }"
                    >Edit</v-btn
                  >
                  <v-btn color="red" text @click="removePost(post._id)">Delete</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-card-subtitle class="headline">
              <h3>{{ post.title }}</h3>
            </v-card-subtitle>
            <v-card-text class="grey--text">
              <p>{{ post.content }}</p>
              <p>{{ post.created }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </html>
</template>

<script>
import API from '../api';
export default {
  data() {
    return {
      id: '',
      post: {},
    };
  },
  async created() {
    // Create a WebSocket connection to your server
    this.socket = new WebSocket('ws://localhost:8000'); // Replace with your server URL
    this.socket.addEventListener('open', () => {
      console.log('WebSocket connection established.');
    });
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
    this.id = response._id;
  },
  methods: {
    async removePost(id) {
      const response = await API.deletePost(id);
      this.socket.send(JSON.stringify({ type: 'deletePost', postId: id }));
      this.$router.push({
        name: 'Home',
        params: { message: response.message },
      });
    },
  },
};
</script>
