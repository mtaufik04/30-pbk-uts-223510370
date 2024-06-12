<template>
  <div class="container">
    <select v-model="selectedUser" @change="updateSelectedUserName" class="select-user">
      <option disabled value="">Pilih pengguna</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="selectedUser !== ''">
      <h2 class="posted-by">di posting oleh: {{ selectedUserName }}</h2>
      <table class="album-table">
        <thead>
          <tr>
            <th>Nama Album</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(album, index) in filteredAlbums" :key="index">
            <td>{{ album.title }}</td>
            <td><router-link :to="'/albums/' + album.id" class="action-link">Lihat Foto</router-link></td>
          </tr>
        </tbody>
      </table>
      <p v-if="filteredAlbums.length === 0" class="no-albums">Tidak ada album untuk pengguna yang dipilih.</p>
    </div>
    <p v-else class="select-user-message">Silahkan pilih pengguna untuk melihat album.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const selectedUser = ref('');
const users = ref([]);
const albums = ref([]);
const selectedUserName = ref('');

const filteredAlbums = computed(() => {
  return albums.value.filter(album => album.userId === parseInt(selectedUser.value));
});

const updateSelectedUserName = () => {
  const user = users.value.find(user => user.id === parseInt(selectedUser.value));
  selectedUserName.value = user ? user.name : '';
};

onMounted(async () => {
  try {
    const [usersResponse, albumsResponse] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/albums')
    ]);
    users.value = usersResponse.data;
    albums.value = albumsResponse.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.select-user {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.posted-by {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.album-table {
  width: 100%;
  border-collapse: collapse;
}

.album-table th,
.album-table td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: left;
}

.album-table th {
  background-color: #4CAF50;
  color: white;
}

.album-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.album-table tr:hover {
  background-color: #f1f1f1;
}

.action-link {
  color: #1a73e8;
  text-decoration: none;
}

.action-link:hover {
  text-decoration: underline;
}

.no-albums {
  margin-top: 20px;
  color: #777;
  font-size: 16px;
}

.select-user-message {
  color: #777;
  font-size: 16px;
  text-align: center;
  margin-top: 40px;
}
</style>
