import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
    newTask: '',
    showCompleted: false
  }),
  getters: {
    filteredTasks: (state) => {
      return state.showCompleted ? state.tasks.filter(task => !task.completed) : state.tasks;
    }
  },
  actions: {
    loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      } else {
        this.tasks = [
          { name: 'Mengerjakan tugas akhir PBK', completed: true },
          { name: 'Belajar untuk ujian', completed: true },
          { name: 'menerapkan quasar', completed: true },
          { name: 'lulus kuliah usia 22', completed: false }
        ];
        this.saveTasks();
      }
      console.log('Tasks after load:', this.tasks); 
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    addTask() {
      const trimmedTask = this.newTask.trim();
      if (trimmedTask !== '' && !this.tasks.find(task => task.name === trimmedTask)) {
        this.tasks.push({ name: trimmedTask, completed: false });
        this.newTask = '';
        this.saveTasks();
      }
    },
    removeTask(task) {
      const index = this.tasks.findIndex(t => t.name === task.name);
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
      this.saveTasks();
    },
    toggleShowCompleted() {
      this.showCompleted = !this.showCompleted;
    },
    clearAllTasks() {
      const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus semua tugas?");
      if (confirmDelete) {
        this.tasks = [];
        this.saveTasks();
      }
    }
  }
});
