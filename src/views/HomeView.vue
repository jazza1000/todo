<script setup lang="ts">  
  import { computed, ref, watch } from 'vue';
  import { useTaskStore } from '@/store/task';
  import { storeToRefs } from 'pinia';
  import { dateToISOString } from '@/mappers/date';


  const taskStore = useTaskStore()
  const { tasks } = storeToRefs(taskStore)

  const pageSize = ref(10);
  const filteredTasks =ref(tasks);
  let tasklist = pageTasks(1,pageSize.value);
  let allTasks = tasks;
  let currentPage =ref(1);
  const now = new Date();
  const future = new Date()
  future.setDate(future.getDate()+7);

  const search = ref('')
  const dateFrom =ref(dateToISOString(now))
  const dateTo = ref(dateToISOString(future));

  const totalTasks = computed(()=>{
    return filteredTasks.value.length;
  })

  const totalPages = computed(()=>{
    return Math.ceil( filteredTasks.value.length/ pageSize.value);
  }
  )
  
  //const pagedList= computed(()=>{
  //  return pageTasks(currentPage,pageSize.value);
  //})


  /*watch(search, async (textBefore, textAfter)=>{

      tasklist = tasks.value.filter((x=>x.description.includes(textBefore)));
  }
  );*/

  watch ([search,pageSize, currentPage],([newSearch, newPageSize, newCurrentPage],[prevSearch, prevPageSize, preCurrentPage])=>{

    //apply filter first
    filteredTasks.value = tasks.value.filter((x=>x.description?.includes(newSearch)));
    //then apply paging
    tasklist = pageTasks(newCurrentPage,newPageSize);

    
  })

 function pageTasks (page:number, pageSize:number)
 {
    let endIndex= Math.min(page*pageSize, filteredTasks.value.length);
    return filteredTasks.value.slice(Math.max(endIndex-pageSize,0),endIndex)
 }

 function nextPage()
 {
    if (currentPage.value<totalPages.value)
        currentPage.value = currentPage.value+1;
 }

 function prevPage()
 {
  if (currentPage.value>1)
    currentPage.value = currentPage.value-1;
 }

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

    <router-link :to="{name: 'createTask'}">
      Create Task
    </router-link> 

    <div class="table">
      <h3>Total Tasks: {{ totalTasks }}</h3>
      Page{{ currentPage }} of {{ totalPages }}
      <button @click="prevPage">prev</button>
      <button @click="nextPage">next</button>
      Tasks per page <select v-model="pageSize" >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
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
