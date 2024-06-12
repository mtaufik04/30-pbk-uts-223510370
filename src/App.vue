<template>
  <q-layout view="hHh lpR fFf" class="background">
    <q-header elevated class="solid-header text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
        <div class="toolbar-buttons">
          <q-btn flat dense v-if="showPostButton" @click="navigateTo('/posts')" label="Post" class="menu-button post-button" />
          <q-btn flat dense v-if="showTodosButton" @click="navigateTo('/todos')" label="Todos" class="menu-button todos-button" />
          <q-btn v-if="showBackButton" flat dense @click="backToHome" label="Back" class="menu-button back-button" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered class="solid-drawer fixed-drawer">
      <q-list class="scrollable-list">
        <q-item clickable v-ripple @click="navigateTo('/')">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/albums')">
          <q-item-section avatar>
            <q-icon name="photo_album" />
          </q-item-section>
          <q-item-section>Albums</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="solid-footer text-white text-center q-pa-sm">
      <div>Copyright @M. Taufik Kurrahman 2024</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const pageTitle = ref('')
const showBackButton = ref(false)
const showPostButton = ref(true)
const showTodosButton = ref(true)
const leftDrawerOpen = ref(false)
const route = useRoute()
const router = useRouter()

const backToHome = () => {
  router.push('/')
}

const navigateTo = (path) => {
  router.push(path)
  leftDrawerOpen.value = false
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

watch(route, (newRoute) => {
  if (newRoute.path !== '/') {
    showBackButton.value = true
    if (newRoute.path === '/Home') {
      pageTitle.value = 'Home'
    } else if (newRoute.path === '/albums') {
      pageTitle.value = 'Albums'
    }
  } else {
    pageTitle.value = ''
    showBackButton.value = false
  }
}, { immediate: true })
</script>

<style scoped>
.background {
  background-image: url('./assets/g1.jpg');
  background-size: cover;
  background-position: center;
}

.solid-header {
  background-color: #020f38   !important;
}

.solid-footer {
  background-color: #020f38   !important;
}

.solid-drawer {
  background-color: #1a3a91 !important;
}

.fixed-drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 1000;
  width: 250px; 
}


.scrollable-list {
  overflow-y: auto;
  height: calc(100vh - 50px); 
}

.created-by {
  font-family: 'Forte', cursive;
  font-size: 20px;
  color: #191918;
}

.welcome-text {
  margin: 40px 20px;
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
  color: #6b7280;
  margin-top: 10px;
  line-height: 1.6;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
}

.menu-button {
  margin-left: auto;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 5px 10px;
}

.menu-button:hover {
  background-color: transparent;
  border-color: #6b7280;
}

.post-button:hover {
  background-color: transparent;
  border-color: #6b7280;
}

.todos-button:hover {
  background-color: transparent;
  border-color: #6b7280;
}

.back-button:hover {
  background-color: transparent;
  border-color: #6b7280;
}

/* Media Queries for Mobile */
@media (max-width: 600px) {
  .solid-header,
  .solid-footer,
  .solid-drawer {
    background-color: #605b5b !important;
  }

  .q-toolbar-title {
    font-size: 18px; 
  }

  .scrollable-list {
    height: calc(100vh - 60px); 
  }

  .welcome-text h2 {
    font-size: 24px; 
  }

  .welcome-text p {
    font-size: 14px; 
  }
  .toolbar-buttons {
    display: flex;
    align-items: center;
  }

  .menu-button {
    margin-left: auto;
    margin-right: 10px;
    transition: background-color 0.3s ease;
    border-radius: 5px;
    border: 1px solid transparent;
    padding: 5px 10px;
    color: white;
  }

  .menu-button:hover {
    background-color: #6b7280;
    border-color: #6b7280;
  }

  .post-button:hover {
    background-color: #6b7280;
    border-color: #6b7280;
  }

  .todos-button:hover {
    background-color: #6b7280;
    border-color: #6b7280;
  }

  .back-button:hover {
    background-color: #6b7280;
    border-color: #6b7280;
  }
}
</style>
