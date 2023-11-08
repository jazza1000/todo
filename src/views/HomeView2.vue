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

    const filteredTasks = ref(tasks.value.map(x => x));
    const paginatedTasks = ref(filteredTasks.value.map(x => x)); 

    console.log("filtered tasks", filteredTasks.value.length)

    function setFilteredTasks(newFilteredTasks: Task[]) {
        console.log("new filtered tasks", newFilteredTasks.length)
        filteredTasks.value = newFilteredTasks
    }

    function setPaginatedTasks(newPaginatedTasks: Task[]) {
        console.log("paginated Tasks", newPaginatedTasks.length)
        paginatedTasks.value = newPaginatedTasks
    }

</script>

<template>
  <main>
    <router-link :to="{name: 'createTask'}">
      Create Task
    </router-link> 

    <Paginator
        :content="filteredTasks"
        @paginated="setPaginatedTasks"
    >
        <TaskFilterer
          #filter
          :content="tasks"
          @filtered="setFilteredTasks"
        >
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
                v-for="task in paginatedTasks"
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
