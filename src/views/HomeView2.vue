<script setup lang="ts">  
    import Paginator from '@/components/Paginator.vue';
    import { computed, ref, watch } from 'vue';
    import { useTaskStore } from '@/store/task';
    import { storeToRefs } from 'pinia';
    import { dateToISOString, stringToDate } from '@/mappers/date';
    import type Task from '@/types/Task';
import TaskFilterer from '@/components/task/TaskFilterer.vue';

    const taskStore = useTaskStore()
    const { tasks } = storeToRefs(taskStore)
    console.log("tasks", tasks.value.length)
    const filteredTasks = ref(tasks); 
    const displayedTasks = ref(filteredTasks.value.map(obj=>({...obj}))); //note need to copy to new array

    console.log("filtered tasks", filteredTasks.value.length)
    function setFilteredTasks(newFilteredTasks: Task[]) {
        console.log("new filtered tasks", newFilteredTasks.length)
        displayedTasks.value = newFilteredTasks
    }

    function setDisplayedTasks(newDisplayedTasks: Task[]) {
        displayedTasks.value = newDisplayedTasks
    }
</script>

<template>
  <main>
    <router-link :to="{name: 'createTask'}">
      Create Task
    </router-link> 

    <Paginator
        :content="filteredTasks"
        @paginated="setDisplayedTasks"
    >
        <TaskFilterer
            :content="tasks"
            @filtered="setFilteredTasks"
            #filter>
        </TaskFilterer>
        <div class="table">
            <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned</th>
                <th>Due Date</th>
                <th>Completed Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr 
                v-for="task in displayedTasks"
                :key="task.id"
            >
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>{{task.assigned}}</td>
                <td>{{task.dueDate?.toLocaleDateString()}}</td>
                <td>{{task.completedDate?.toLocaleDateString()}}</td>
                <td>
                <router-link 
                    :to="{ name: 'editTask', params: { taskId: task.id }}"
                    >
                    Edit
                </router-link> 
                <a href="#">delete</a></td>
            </tr>
            </tbody>
        </table>
    </div>
    </Paginator>
    
  </main>
</template>


<style scoped>
  .search {
    border-style: groove;
    margin-bottom: 2em;
    padding: 5px; 
  }

  th {
    font-weight: bold;
  }
  .table {
    border-style: groove;
    padding: 5px;
  }
</style>
