<template>
  <div :class="{'blur-background': isPhotoModalOpen}">
    <q-btn flat icon="arrow_back" label="Kembali pilih penguna lainya" @click="goBack" class="back-button" style="color:white" />
    <h4 class="album-title">FOTO-FOTO ALBUM {{ albumId }}</h4>
    <q-separator spaced />

    <div v-if="photos.length > 0" class="photo-grid">
      <q-card
        v-for="photo in photos"
        :key="photo.id"
        class="photo-card"
        @click="enlargePhoto(photo)"
      >
        <q-img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-image" />
        <q-card-section class="photo-title">
          <p>{{ photo.title }}</p>
        </q-card-section>
      </q-card>
    </div>

    <p v-else class="no-photos">Loading...</p>

    <q-dialog v-model="isPhotoModalOpen" class="photo-modal">
      <q-card class="modal-card">
        <div class="modal-container">
          <q-img :src="selectedPhoto?.url" :alt="selectedPhoto?.title" class="modal-photo" />
          <div class="modal-nav modal-nav-left" @click="prevPhoto" v-if="currentPhotoIndex > 0">
            <q-icon name="arrow_back" />
          </div>
          <div class="modal-nav modal-nav-right" @click="nextPhoto" v-if="currentPhotoIndex < photos.length - 1">
            <q-icon name="arrow_forward" />
          </div>
          <q-card-section class="modal-title">
            <p>{{ selectedPhoto?.title }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <div class="close-button" @click="closePhotoModal">Close</div>
          </q-card-actions>
        </div>
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
const albumId = ref(route.params.id);
const photos = ref([]);
let currentPage = 1;
let currentPhotoIndex = ref(0);

const isPhotoModalOpen = ref(false);
const selectedPhoto = ref(null);

const loadPhotos = async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId.value}/photos?_page=${currentPage}&_limit=10`);
    photos.value = response.data.map(photo => ({
      ...photo,
      thumbnailUrl: photo.thumbnailUrl.replace('http://', 'https://'), 
    }));
  } catch (error) {
    console.error('Error loading photos:', error);
  }
};

const enlargePhoto = async (photo) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${photo.id}`);
    selectedPhoto.value = {
      url: response.data.url,
      title: response.data.title,
    };
    currentPhotoIndex.value = photos.value.findIndex(p => p.id === photo.id);
    isPhotoModalOpen.value = true;
  } catch (error) {
    console.error('Error loading full photo:', error);
  }
};

const closePhotoModal = () => {
  isPhotoModalOpen.value = false;
};

const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--;
    selectedPhoto.value = photos.value[currentPhotoIndex.value];
  }
};

const nextPhoto = () => {
  if (currentPhotoIndex.value < photos.value.length - 1) {
    currentPhotoIndex.value++;
    selectedPhoto.value = photos.value[currentPhotoIndex.value];
  }
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
  text-transform: uppercase;
  font-weight: bold;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  justify-items: center;
}

.photo-card {
  width: 150px; 
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.photo-card:hover .photo-image {
  transform: scale(1.1); 
}

.photo-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
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

.modal-card {
  text-align: center;
  overflow: hidden;
}

.modal-container {
  position: relative;
}

.modal-photo {
  width: 600px; 
  height: auto;
  border-radius: 10px;
  margin: 0 auto;
  display: block;
}

.modal-title {
  padding: 10px;
  text-align: center;
}

.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.modal-nav-left {
  left: 10px;
}

.modal-nav-right {
  right: 10px;
}

.modal-nav-left q-icon,
.modal-nav-right q-icon {
  font-size: 44px; /* Ukuran ikon panah */
  color: #333; 
}

.modal-nav:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.back-button {
  margin-bottom: 20px;
}

.blur-background {
  filter: blur(5px); 
  pointer-events: none; 
}
</style>
