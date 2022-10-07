import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import addMovie from '../views/addMovie.vue';
import Post from '../views/Post.vue';
import signup from '../views/signup.vue';
import Login from '../views/Login.vue';
import Header from '../views/Header.vue';
import EditPost from '../views/EditPost.vue';
Vue.use(VueRouter);

Vue.component('Header', Header);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/addMovie',
    name: 'addMovie',
    component: addMovie,
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/edit-post/:id',
    name: 'edit-post',
    component: EditPost,
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
