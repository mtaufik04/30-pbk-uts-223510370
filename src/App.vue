<template>
  <div class="centered-container">
    <div class="bordered-container">
      <h1>{{ pageTitle }}</h1>
      <div class="header-menu">
        <button v-if="showBackButton" @click="backToHome" class="back-btn">Kembali</button>
        <button @click="showTodos" class="todos-btn">Todos</button>
        <button @click="showPosts" class="posts-btn">Post</button>
      </div>
      <div v-if="currentView === 'todos'">
        <Todos />
      </div>
       <!-- penggunaan props: -->
      <div v-if="currentView === 'posts'">
        <Post :users="users" :posts="posts" />
      </div>
    </div>
    <div class="centered-container">
      <span class="created-by">Created by. M. Taufik Kurrahman</span>
    </div>  
  
    <div class="welcome-text">
      <h2>Selamat Datang di Aplikasi Todos dan Post</h2>
      <p>Di sini Anda dapat mengelola daftar tugas Anda dan melihat postingan dari berbagai pengguna<br>.Silahkan click salah satu button untuk menggunakan fitur kami.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Post from './components/Post.vue';
import Todos from './components/Todos.vue';

const currentView = ref(null);
const pageTitle = ref('');
const users = ref([]);
const posts = ref([]);
const showBackButton = ref(false);

const showTodos = () => {
  currentView.value = 'todos';
  pageTitle.value = '';
  showBackButton.value = true;
};

const showPosts = () => {
  currentView.value = 'posts';
  pageTitle.value = 'Silahkan pilih salah satu user';
  showBackButton.value = true;
};

const backToHome = () => {
  currentView.value = null;
  pageTitle.value = '';
  showBackButton.value = false;
};
</script>

<style>
.created-by {
  font-family: 'Forte', cursive; 
  font-size: 20px; 
  color: #a9740a; 
  position: absolute; 
  top: 20px; 
  right: 20px;
}

.centered-container {
  text-align: left; 
}

.bordered-container {
  border: 5px solid #1a73e8;
  border-radius: 10px;
  padding: 20px;
  animation: border-color-animation 3s infinite alternate;
}

@keyframes border-color-animation {
  0% {
    border-color: #1a73e8;
  }
  50% {
    border-color: #eb0a0a;
  }
  100% {
    border-color: #1a73e8;
  }
}

.welcome-text {
  margin-top: 40px;
  margin-right: auto; 
  margin-left: 30px;
  text-align: center;
}

.welcome-text h2 {
  font-size: 28px;
  color: #1a73e8;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px; 
}

.welcome-text p {
  font-size: 16px;
  color: #f5f1f1;
  margin-top: 10px;
  line-height: 1.6;
  border-top: 1px solid #1a73e8;
  padding-top: 20px;
  
}

</style>
