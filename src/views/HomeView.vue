<script setup lang="ts">  
  import { computed, ref, watch } from 'vue';
  import { useTaskStore } from '@/store/task';
  import { storeToRefs } from 'pinia';

  const taskStore = useTaskStore()
  const { tasks } = storeToRefs(taskStore)

  let tasklist = tasks.value
  const now = new Date();
  const future = new Date()
  future.setDate(future.getDate()+7);

  const search = ref('')
  const dateFrom =ref(now.toISOString().slice(0,16))
  const dateTo = ref(future.toISOString().slice(0,16));

  const totalTasks = computed(()=>{
    return tasks.value.length;
  })

  watch(search, async (textBefore, textAfter)=>{

      tasklist = tasks.value.filter((x=>x.description.includes(textBefore)));
  }
  );

</script>

<template>
  <main>
    <div class="search">
      <div>
        Search: <input type="text" v-model="search" />
      </div>
      <div>
        Date From: <input type="datetime-local" v-model="dateFrom" />
        Date To: <input type="datetime-local" v-model="dateTo" />
      </div>
    </div>

    <div class="table">
      <h3>Total Tasks: {{ totalTasks }}</h3>
      Page x of y
      <button>prev</button>
      <button>next</button>
      Tasks per page <select>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="10">20</option>
      </select>
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
            v-for="task in tasklist"
            :key="task.id"
          >
            <td>{{task.title}}</td>
            <td>{{task.description}}</td>
            <td>{{task.assigned}}</td>
            <td>{{task.dueDate}}</td>
            <td>{{task.completedDate}}</td>
            <td><a href="#">edit</a> <a href="#">delete</a></td>
          </tr>
        </tbody>
      </table>
    </div>
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
