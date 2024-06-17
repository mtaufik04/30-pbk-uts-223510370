<template>
  <q-layout view="hHh lpR fFf" class="background">
    <q-header elevated class="solid-header text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
        <div class="toolbar-buttons">
          <q-btn flat dense v-if="showPostButton" @click="navigateTo('/posts')" label="Post" class="menu-button post-button" />
          <q-btn flat dense v-if="showTodosButton" @click="navigateTo('/todos')" label="Todos" class="menu-button todos-button" />
          <q-btn flat dense @click="navigateTo('/contact')" label="Contact Me" class="menu-button contact-button" />
          <q-btn v-if="showBackButton" flat dense @click="backToHome" label="Kembali" class="menu-button back-button" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered class="solid-drawer">
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
      <div class="scrollable-content">
        <router-view />
      </div>
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
      pageTitle.value = 'Menu Home'
    } else if (newRoute.path === '/albums') {
      pageTitle.value = 'Menu Albums'
    } else if (newRoute.path === '/contact') {
      pageTitle.value = 'Menu Contact Me'
    } else if (newRoute.path === '/posts') {
      pageTitle.value = 'Menu post'
    } else if (newRoute.path === '/todos') {
      pageTitle.value = 'Menu Todo list'
    }
  } else {
    pageTitle.value = ''
    showBackButton.value = false
  }
},{ immediate: true })
</script>

<style scoped>
.background {
  background-image: url('./assets/g1.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.solid-header {
  background-color: #020f38 !important;
}

.solid-footer {
  background-color: #020f38 !important;
}

.solid-drawer {
  background-color: #1a3a91 !important;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1000;
  width: 250px; 
  overflow-y: auto; 
}

.scrollable-list {
  height: 100%;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
}

.menu-button {
  margin-left: auto;
  margin-right: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
  position: relative;
  color: #ffffff;
  text-decoration: none;
}

.menu-button::before {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  transition: width 0.3s ease;
}

.menu-button:hover::before {
  width: 100%;
}

.post-button {
  margin-left: auto;
}

.todos-button {
  margin-left: 10px;
}

.back-button {
  margin-left: 10px;
}

.contact-button {
  color: white;
  margin-left: auto;
  margin-right: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
  position: relative;
}

.contact-button::before {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  transition: width 0.3s ease;
}

.contact-button:hover::before {
  width: 100%;
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

  .scrollable-content {
    flex: 1;
  }

  .toolbar-buttons {
    display: flex;
    align-items: center;
  }

  .menu-button {
    margin-left: auto;
    margin-right: 10px;
    transition: color 0.3s ease, transform 0.3s ease;
    position: relative;
    color: #ffffff;
    text-decoration: none;
  }

  .menu-button::before {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    transition: width 0.3s ease;
  }

  .menu-button:hover::before {
    width: 100%;
  }

  .post-button {
    margin-left: auto;
  }

  .todos-button {
    margin-left: 10px;
  }

  .back-button {
    margin-left: 10px;
  }

  .contact-button {
    color: white;
    margin-left: auto;
    margin-right: 10px;
    transition: color 0.3s ease, transform 0.3s ease;
    position: relative;
  }

  .contact-button::before {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    transition: width 0.3s ease;
  }

  .contact-button:hover::before {
    width: 100%;
  }
}
</style>
