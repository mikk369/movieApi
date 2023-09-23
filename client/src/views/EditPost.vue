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
      <row class="edit-row">
        <v-col class="mx-auto d-flex justify-center">
          <v-card class="pa-5">
            <v-card-title>Edit Post</v-card-title>
            <v-divider></v-divider>
            <v-form
              @submit.prevent="updateForm"
              ref="form"
              class="pa-5"
              enctype="multipart/form-data">
              <v-text-field
                label="Title"
                v-model="post.title"
                prepend-icon="mdi-note"></v-text-field>

              <v-text-field
                label="Category"
                v-model="post.category"
                prepend-icon="mdi-view-list"></v-text-field>

              <v-textarea
                label="Content"
                v-model="post.content"
                prepend-icon="mdi-note-plus"></v-textarea>

              <v-file-input
                @change="selectFile"
                show-size
                counter
                multiple
                label="Select Image"></v-file-input>
              <v-img width="210px" :src="`/${post.image}`"></v-img>
              <v-btn type="submit" class="btn-edit" color="success">Update Post</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </row>
    </v-container>
  </html>
</template>

<style>
.theme--light.v-btn.v-btn--has-bg {
  background-color: rgb(6, 148, 18);
  margin-bottom: 4px;
}
.container {
  padding: 0;
  display: flex;
  justify-content: center;
  margin: 0;
}
.edit-row {
  display: flex;
  justify-content: center;
}
.btn-edit {
  margin-top: 3px;
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
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async updateForm() {
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('title', this.post.title);
      formData.append('category', this.post.category);
      formData.append('content', this.post.content);
      formData.append('old_image', this.post.image);
      //TODO: HERE
      if (this.$refs.form.validate()) {
        const response = await API.updatePost(this.$route.params.id, formData);
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
