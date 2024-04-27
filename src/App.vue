<template>
  <div>
    <Proses />
    <Footer msg="Vite + Vue" />
  </div>
</template>

<script setup>
import Proses from './components/Proses.vue'
import Footer from './components/Footer.vue'

</script>

<style scoped>

.logo {
  border-radius: 100px;
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 3em #bd0a28aa);
}
</style>
