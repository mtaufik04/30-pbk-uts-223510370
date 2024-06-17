<template>
  <div class="welcome-container">
    <div class="welcome-text">
      <h2>Selamat Datang di Aplikasi Kami</h2>
      <p>
        Kami menyediakan fitur todo-list untuk mengatur kegiatan Anda agar Anda dapat mengelola daftar tugas Anda. Kami juga menyediakan fitur Post untuk melihat postingan dari berbagai pengguna dan fitur Album untuk Anda bisa melihat postingan album dari berbagai pengguna.
        <br><br>
        Silakan klik icon di pojok kiri untuk menggunakan fitur lainya .
      </p>
    </div>
    <div class="features-container">
      <div class="feature-card" @click="navigateTo('/todos')">
        <q-icon name="check_circle" class="feature-icon" />
        <h3>Todo List</h3>
        <p>Atur kegiatan Anda sehari-hari dengan mudah.</p>
      </div>
      <div class="feature-card" @click="navigateTo('/posts')">
        <q-icon name="forum" class="feature-icon" />
        <h3>Post</h3>
        <p>Lihat dan buat postingan menarik dari berbagai pengguna.</p>
      </div>
      <div class="feature-card" @click="navigateTo('/albums')">
        <q-icon name="photo_album" class="feature-icon" />
        <h3>Album</h3>
        <p>Lihat album foto dari berbagai pengguna.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { QIcon } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.welcome-container {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
}

.welcome-text {
  margin: 40px 20px;
  max-width: 800px;
}

.welcome-text h2 {
  font-style:forte;
  font-size: 36px;
  background: linear-gradient(to right, #76531c 0%, #ec9c09 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.welcome-text p {
  font-size: 18px;
  line-height: 1.8;
}

.features-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 250px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  margin-top: -50px;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 10px;
  color: #30cfd0;
}

.feature-card h3 {
  font-size: 24px;
  margin: 10px 0;
}

.feature-card p {
  font-size: 16px;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .welcome-container {
    padding-top: 80px;
  }

  .welcome-text h2 {
    font-size: 28px;
  }

  .welcome-text p {
    font-size: 16px;
  }

  .features-container {
    flex-direction: column;
  }

  .feature-card {
    width: 90%;
    margin: 10px auto;
  }
}
</style>
