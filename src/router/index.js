import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Home from '../components/Home.vue'
import Post from '../components/Post.vue';
import Album from '../components/Album.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue';

const routes = [
  { path: '/', redirect: '/Home' },
  { path: '/Home', component: Home },
  { path: '/todos', component: Todos },
  { path: '/posts', component: Post },
  { path: '/albums', component: Album },
  { path: '/albums/:id', component: AlbumPhotos, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
