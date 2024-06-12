<template>
  <div>
    <q-btn flat icon="arrow_back" label="Kembali Pilih kePengguna lainya" @click="goBack" class="back-button" style="color:white" />
    <h4 class="album-title">FOTO-FOTO ALBUM {{ albumId }}</h4>
    <q-separator spaced />
    <div v-if="photos.length > 0" class="photo-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo">
        <q-card class="photo-card" @click="enlargePhoto(photo)">
          <q-img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-image" />
          <q-card-section class="photo-title">
            <p>{{ photo.title }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <p v-else class="no-photos">Loading...</p>

    <q-dialog v-model="isPhotoModalOpen" class="photo-modal">
      <q-card>
        <q-img :src="selectedPhoto?.url" :alt="selectedPhoto?.title" class="modal-photo" />
        <q-card-section class="modal-title">
          <p>{{ selectedPhoto?.title }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" @click="isPhotoModalOpen = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const albumId = route.params.id;
const photos = ref([]);
let currentPage = 1;

const isPhotoModalOpen = ref(false);
const selectedPhoto = ref(null);

const loadPhotos = async () => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_page=${currentPage}&_limit=10`);
  photos.value = [...photos.value, ...response.data];
};

const enlargePhoto = (photo) => {
  selectedPhoto.value = photo;
  isPhotoModalOpen.value = true;
};

const goBack = () => {
  router.push('/albums');
};

onMounted(() => {
  loadPhotos();
});
</script>

<style scoped>
.album-title {
  font-size: 24px;
  color: #aa860f; 
  text-align: center;
  margin-bottom: 20px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.photo {
  cursor: pointer;
}

.photo-card {
  width: 100%;
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: scale(1.05);
}

.photo-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.photo-title {
  padding: 10px;
  text-align: center;
}

.no-photos {
  text-align: center;
  color: white;
}

.photo-modal {
  max-width: 80%;
}

.modal-photo {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.modal-title {
  padding: 10px;
  text-align: center;
}

.back-button {
  margin-bottom: 20px;
}
</style>
