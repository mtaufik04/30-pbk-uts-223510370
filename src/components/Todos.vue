// todos.vue
<template>
    <h4>FITUR TODO-LIST</h4>
    <div>
      <div class="input-container">
        <div class="input-group">
          <input type="text" v-model.trim="newTask" @keyup.enter="addTask" placeholder="Tambahkan daftar kegiatan">
          <button @click="addTask" class="add-btn">Tambah</button>
        </div>
      </div>
      <button class="show-incompleted-btn" @click="toggleShowCompleted">
        {{ showCompleted ? 'Keluar ' : 'Tampilkan yang belum Selesai ' }}
      </button>
      <div v-if="tasks.length > 0" class="task-table">
        <thead>
          <tr>
            <th>NO.</th>
            <th>KEGIATAN</th>
            <th>KETERANGAN</th>
            <th>METODE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in filteredTasks" :key="index" :class="{ 'completed-task': task.completed }">
            <td>{{ index + 1 }}</td>
            <td class="task-name">{{ task.name }}</td>
            <td>{{ task.completed ? 'Selesai' : 'Belum Selesai' }}</td>
            <td>
              <button @click="toggleTaskCompletion(task)" class="action-btn" title="Selesai">
                <i v-if="!task.completed" class="fas fa-check">Selesaikan</i>
                <i v-else class="fas fa-times">Batalkan</i>
              </button>
              <button @click="removeTask(task)" class="action-btn" title="Hapus">
                <i class="fas fa-trash-alt">Hapus</i>
              </button>
            </td>
          </tr>
        </tbody>
      </div>
      <p v-else class="no-tasks">Silahkan masukan to do list anda.</p>
      
      <!-- Slot untuk menyisipkan konten tambahan dari komponen induk -->
      <slot>
        <button @click="clearAllTasks" class="clear-all-btn">Hapus Semua Tugas</button>
      </slot>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const newTask = ref('');
const tasks = ref([]);
const showCompleted = ref(false);

const addTask = () => {
  const trimmedTask = newTask.value.trim();
  if (trimmedTask !== '' && !tasks.value.find(task => task.name === trimmedTask)) {
    tasks.value.push({ name: trimmedTask, completed: false });
    newTask.value = '';
  }
};

const removeTask = (task) => {
  const index = tasks.value.findIndex(t => t.name === task.name);
  tasks.value.splice(index, 1);
};

const toggleTaskCompletion = (task) => {
  task.completed = !task.completed;
};

const toggleShowCompleted = () => {
  showCompleted.value = !showCompleted.value;
};

const filteredTasks = computed(() => {
  if (showCompleted.value) {
    return tasks.value.filter(task => !task.completed);
  } else {
    return tasks.value;
  }
});

const clearAllTasks = () => {
  const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus semua tugas?");
  if (confirmDelete) {
    tasks.value = [];
  }
};
</script>
