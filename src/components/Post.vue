<template>
  <div class="container">
    <div class="marquee-wrapper">
      <div class="marquee">
        <div class="marquee-border"></div>
        <div v-if="selectedUser === ''" class="marquee-text">
          <span class="marquee-label">Pemberitahuan:</span>
          <span class="marquee-content">Silahkan pilih salah satu user yang ingin dilihat postingan</span>
        </div>
        <div v-else class="marquee-text">
          <span class="marquee-content">Saat ini Anda memilih user "{{ selectedUserName }}"</span>
        </div>
      </div>
    </div>
    <select v-model="selectedUser" @change="updateSelectedUserName" class="select-input">
      <option disabled value="">Pilih pengguna</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="selectedUser !== ''">
      <transition name="fade">
        <div v-if="loading" class="loading">Memuat data...</div>
      </transition>
      <transition name="fade">
        <div v-if="!loading" class="content">
          <h2 class="posted-by">di posting oleh: {{ selectedUserName }}</h2>
          <table class="post-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Isi Postingan</th>
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
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

const selectedUser = ref('')
const users = ref([])
const posts = ref([])
const selectedUserName = ref('')
const loading = ref(false)

const loadUsers = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  users.value = response.data
}

const loadPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  posts.value = response.data
}

const filteredPosts = computed(() => {
  return posts.value.filter(post => post.userId === parseInt(selectedUser.value))
})

const updateSelectedUserName = () => {
  const user = users.value.find(user => user.id === parseInt(selectedUser.value))
  selectedUserName.value = user ? user.name : ''
  if (selectedUser.value) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1500)
  }
}

onMounted(() => {
  loadUsers()
  loadPosts()
})

watch(selectedUser, () => {
  if (selectedUser.value) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1500)
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f0f0f5, #c0c0cf);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.marquee-wrapper {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.marquee {
  display: inline-block;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 1.2em;
  color: #4CAF50;
}

.marquee-border {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  pointer-events: none;
  box-sizing: border-box;
}

.marquee-text {
  display: inline-block;
  animation: marquee 10s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(calc(-100% + 20px));
  }
}

.marquee-label {
  font-weight: bold;
}

.marquee-content {
  position: relative;
  display: inline-block;
  margin-left: 10px;
}

.select-input {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  font-size: 1em;
  margin-bottom: 20px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.select-input:hover, .select-input:focus {
  border-color: #66BB6A;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.post-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-table th,
.post-table td {
  border: 1px solid #ddd;
  padding: 12px;
  color: #333;
}

.post-table th {
  background-color: #4CAF50;
  color: white;
  text-align: left;
}

.post-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.no-posts {
  font-size: 16px;
  color: #6b7280;
  margin-top: 10px;
  text-align: center;
}

.posted-by {
  font-size: 24px;
  margin-top: 20px;
  color: #1a73e8;
  text-align: center;
}

.loading {
  font-size: 20px;
  color: #1a73e8;
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
