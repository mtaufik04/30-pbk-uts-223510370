<template>
  <div class="todos-container">
    <h4 class="title">FITUR TODO-LIST</h4>
    <div class="input-container">
      <div class="input-group">
        <input type="text" v-model.trim="newTask" @keyup.enter="addTask" placeholder="Tambahkan daftar kegiatan" class="task-input">
        <button @click="addTask" class="add-btn">Tambah</button>
      </div>
    </div>
    <div v-if="tasks.length > 0" class="task-table-container">
      <table class="task-table">
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
                <i v-if="!task.completed" class="fas fa-check"></i>
                <i v-else class="fas fa-times"></i>
              </button>
              <button @click="removeTask(task)" class="action-btn" title="Hapus">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="show-incompleted-btn" @click="toggleShowCompleted">
        {{ showCompleted ? 'Tampilkan Semua' : 'Tampilkan yang belum Selesai' }}
      </button>
    </div>
    <p v-else class="no-tasks">Silahkan masukan to do list anda.</p>
    
    <!-- Slot untuk menyisipkan konten tambahan dari komponen induk -->
    <slot>
      <button @click="clearAllTasks" class="clear-all-btn">Hapus Semua Tugas</button>
    </slot>
  </div>
</template>
<!--didalam Todos.vue inilah terdapat penerapan pinia sebagai state management dimana tugas akan dikelola oleh store Pinia dan komponen Vue Anda akan menggunakan store ini untuk mengakses dan mengubah state.-->
<script setup>
import { computed, onMounted } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();

const newTask = computed({
  get: () => todoStore.newTask,
  set: (value) => todoStore.newTask = value
});

const tasks = computed(() => todoStore.tasks);
const showCompleted = computed(() => todoStore.showCompleted);
const filteredTasks = computed(() => todoStore.filteredTasks);

const addTask = () => {
  todoStore.addTask();
};

const removeTask = (task) => {
  todoStore.removeTask(task);
};

const toggleTaskCompletion = (task) => {
  todoStore.toggleTaskCompletion(task);
};

const toggleShowCompleted = () => {
  todoStore.toggleShowCompleted();
};

const clearAllTasks = () => {
  todoStore.clearAllTasks();
};

onMounted(() => {
  todoStore.loadTasks();
  console.log('Tasks after load:', todoStore.tasks);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap');

.todos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background: #f0f2f5;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Nunito', sans-serif;
}

.title {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
}

.input-container {
  width: 100%;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.input-group {
  display: flex;
  align-items: center;
}

.task-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  margin-right: 10px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.task-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.task-table-container {
  width: 100%;
  margin-top: 20px;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.task-table th, .task-table td {
  border: 1px solid #e0e0e0;
  padding: 12px;
  text-align: left;
}

.task-table th {
  background-color: #f9f9f9;
}

.task-table td {
  background-color: #fff;
}

.completed-task .task-name {
  text-decoration: line-through;
  color: #999;
}

.add-btn, .show-incompleted-btn, .action-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
}

.add-btn:hover, .show-incompleted-btn:hover, .action-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
}

.show-incompleted-btn {
  margin-top: 10px;
  background-color: #6c757d;
}

.show-incompleted-btn:hover {
  background-color: #5a6268;
}

.clear-all-btn {
  margin-top: 20px;
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
}

.clear-all-btn:hover {
  background-color: #c82333;
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.2);
}

.no-tasks {
  margin-top: 20px;
  color: #666;
  font-style: italic;
}
</style>
