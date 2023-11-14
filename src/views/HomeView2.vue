<script setup lang="ts">  
  import ContentPaginator from '@/components/ContentPaginator.vue';
  import TaskFilter from '@/components/task/TaskFilter.vue';
  import { ref, watch } from 'vue';
  import { useTaskStore } from '@/store/task';
  import router from '@/router'
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
import { dateToISOString } from '@/mappers/date';
    
  const props = defineProps<{
    page?: number,
    pageSize?: number,
    search?: string,
    dateFrom?: Date,
    dateTo?: Date
  }>()

  const taskStore = useTaskStore()
  const { totalTasks, tasks } = storeToRefs(taskStore)
  const route = useRoute();

  const currentPage = ref<number>(props.page ? props.page : 1)
  const currentPageSize = ref<number>(props.pageSize ? props.pageSize : 10)
  const currentSearch = ref<string | undefined>(props.search)
  const currentDateFrom = ref<Date | undefined>(props.dateFrom)
  const currentDateTo = ref<Date | undefined>(props.dateTo)

  watch([() => route.query], () => {
    currentPage.value = props.page ? props.page : 1;
    currentPageSize.value = props.pageSize ? props.pageSize : 10;
    currentSearch.value = props.search;
    currentDateFrom.value = props.dateFrom;
    currentDateTo.value = props.dateTo;
    taskStore.changePage(currentPage.value, currentPageSize.value, currentSearch.value, currentDateFrom.value, currentDateTo.value);
  })

  async function newPage(page: number, pageSize: number) {
    await navigate(page, pageSize, props.search, props.dateFrom, props.dateTo)
  }

  async function newSearch(contains: string, dateFrom: Date, dateTo: Date) {
    await navigate(1, props.pageSize, contains, dateFrom, dateTo)
  }

  async function navigate(
    page: number | undefined, 
    pageSize: number | undefined, 
    contains: string | undefined,
    dateFrom: Date | undefined,
    dateTo: Date | undefined,
    ){

    await router.push({ 
      name: 'tasks', 
      query: { 
        page: page ?? 1,
        pageSize: pageSize ?? 10,
        search: contains,
        dateFrom: dateToISOString(dateFrom),
        dateTo: dateToISOString(dateTo)
      } 
    })
  }

  taskStore.changePage(currentPage.value, currentPageSize.value, currentSearch.value, currentDateFrom.value, currentDateTo.value)
</script>

<template>
  <main>
    <router-link :to="{name: 'createTask'}">
      Create Task
    </router-link> 

    <ContentPaginator
      :content="tasks"
      :page="currentPage"
      :page-size="currentPageSize"
      :total-items="totalTasks"
      @page-changed="newPage"
    >
      <template #filter>
        <TaskFilter
          :content="tasks"
          @filtered="newSearch"
        >
        </TaskFilter>
      </template>
      <div v-if="tasks.length" class="table" >
        <table >
          <thead>
            <tr>
              <th>Id</th>
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
              v-for="task in tasks"
              :key="task.id"
            >
              <td>{{ task.id }}</td>
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
    </ContentPaginator>
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
