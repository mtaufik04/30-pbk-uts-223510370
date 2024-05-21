<template>
    <div>
        <!--pengunaan props-->
      <select v-model="selectedUser" @change="updateSelectedUserName">
        <option disabled value="">Pilih pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-if="selectedUser !== ''">
        <h2>di posting oleh: {{ selectedUserName }}</h2>
        <table class="post-table">
          <thead>
            <tr>
              <th>judul</th>
              <th>isi postingan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in filteredPosts" :key="index">
              <td>{{ post.title }}</td>
              <td>{{ post.body }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="filteredPosts.length === 0" class="no-posts">Tidak ada postingan untuk pengguna ini.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const selectedUser = ref('');
  const users = ref([]);
  const posts = ref([]);
  const selectedUserName = ref('');
  
  const loadUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await response.json();
  };
  
  const loadPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    posts.value = await response.json();
  };
  
  const filteredPosts = computed(() => {
    return posts.value.filter(post => post.userId === parseInt(selectedUser.value));
  });
  
  const updateSelectedUserName = () => {
    const user = users.value.find(user => user.id === parseInt(selectedUser.value));
    selectedUserName.value = user ? user.name : '';
  };
  
  onMounted(() => {
    loadUsers();
    loadPosts();
  });
  
  updateSelectedUserName();
  </script>
  