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

<style scoped>

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.bordered-container {
  border: 5px solid #1a73e8; 
  border-radius: 10px;
  padding: 20px;
  animation: border-color-animation 3s infinite alternate; 
}

@keyframes border-color-animation {
  0% {
    border-color: #1a73e8;
  }
  50% {
    border-color: #eb0a0a; 
  }
  100% {
    border-color: #1a73e8;
  }
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #a9740a; 
  font-family: 'Russo One', sans-serif;
  position: absolute;
  top: 20px;
  left: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
}

.input-group {
  display: flex;
}

.input-group input[type="text"] {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px 0 0 5px;
  box-sizing: border-box;
  margin-right: 10px; 
}

.input-group button {
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  background-color: #1a73e8; 
  color: white;
  border-radius: 0 5px 5px 0;
}

.input-group button:hover {
  background-color: #125699; 
}

.show-incompleted-btn {
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  background-color: #1a73e8; 
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
}

.show-incompleted-btn:hover {
  background-color: #125699; 
}

.task-table {
  width: 100%;
  border-collapse: collapse;
}

.task-table th,
.task-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.task-table th {
  background-color: #141414;
}

.completed .task-name {
  text-decoration: line-through;
  color: #888;
}

.action-btn {
  background-color: transparent;
  color: #ddd;
  border: none;
  cursor: pointer;
  transition: color 0.3s; 
}

.action-btn:hover {
  color: #761a1a;
}

.no-tasks {
  text-align: center;
  font-style: italic;
}
.completed-task .task-name {
  text-decoration: line-through;
  color: #888;
}

.task-table th:nth-child(4) {
  text-align: center; 
}

</style>
