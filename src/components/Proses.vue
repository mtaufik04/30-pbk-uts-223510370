<template>
  <div class="centered-container">
    <div class="bordered-container">
      <div class="logo">M.TAUFIK KURRAHMAN</div>
      <h1>My To-Do List</h1>
      
      <div class="input-container">
        <div class="input-group">
          <input type="text" v-model.trim="newTask" @keyup.enter="addTask" placeholder="Tambahkan daftar kegiatan">
          <button @click="addTask" class="add-btn">Tambah</button>
        </div>
      </div>
      
      <button class="show-incompleted-btn" @click="toggleShowCompleted">
        {{ showCompleted ? 'keluar ' : 'Tampilkan yang belum Selesai ' }}
      </button>
            
      <table v-if="tasks.length > 0" class="task-table">
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
            <td>{{ index + 1 }}</td> <!-- Menampilkan nomor urut -->
            <td class="task-name">{{ task.name }}</td>
            <td>{{ task.completed ? 'Selesai' : 'Belum Selesai' }}</td>
            <td>
              <button @click="toggleTaskCompletion(task)" class="action-btn" title="Selesai">
                <i v-if="!task.completed" class="fas fa-check">selesaikan</i>
                <i v-else class="fas fa-times"> batalkan</i>
              </button>
              <button @click="removeTask(task)" class="action-btn" title="Hapus">
                <i class="fas fa-trash-alt">hapus</i>
              </button>
            </td>
          </tr>
                    
        </tbody>
      </table>
      
      <p v-else class="no-tasks">silahkan masukan to do list anda.</p>
      
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';

const newTask = ref('');
const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || []);
const showCompleted = ref(JSON.parse(localStorage.getItem('showCompleted')) || false);
let taskCounter = ref(tasks.value.length + 1);

const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

const saveShowCompletedToLocalStorage = () => {
  localStorage.setItem('showCompleted', JSON.stringify(showCompleted.value));
};

const addTask = () => {
  const trimmedTask = newTask.value.trim();
  if (trimmedTask !== '' && !tasks.value.find(task => task.name === trimmedTask)) {
    tasks.value.push({ name: trimmedTask, completed: false });
    newTask.value = '';
    taskCounter.value++;
    saveTasksToLocalStorage(); 
  }
};

const removeTask = (task) => {
  const index = tasks.value.findIndex(t => t.name === task.name);
  tasks.value.splice(index, 1);
  saveTasksToLocalStorage(); 
};

const toggleTaskCompletion = (task) => {
  task.completed = !task.completed;
  saveTasksToLocalStorage(); 
};

const toggleShowCompleted = () => {
  showCompleted.value = !showCompleted.value;
  saveShowCompletedToLocalStorage(); 
};

const filteredTasks = computed(() => {
  if (showCompleted.value) {
    return tasks.value.filter(task => !task.completed);
  } else {
    return tasks.value;
  }
});

onMounted(() => {
  saveTasksToLocalStorage();
  saveShowCompletedToLocalStorage();
});
</script>

