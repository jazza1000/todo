<script setup lang="ts">
    import { computed, ref, toRef, type Ref, watch } from 'vue';
    import { useTaskStore } from '@/store/task';
    import { storeToRefs } from 'pinia';
    import { dateToISOString, stringToDate } from '@/mappers/date';
    import type Task from '@/types/Task';
    
    const props = defineProps<{
        content: Task[]
    }>()

    const emit = defineEmits(['filtered']);
    let content: Task[]= props.content.map(obj => obj);
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate()+30);

    const search = ref('')
    const dateFrom =ref(dateToISOString(now))
    const dateTo = ref(dateToISOString(future));

    const isDateFilter = ref(false);

    watch ([search],async ([newSearch])=>{
        changeData(newSearch);
        emit('filtered', content)
    })

    function changeData(newSearch:string)
    {
        if (isDateFilter.value)
        content = content.filter(x=>
            (x.description.includes(newSearch) || x.title.includes(newSearch))      
            &&  (x.dueDate && dateTo.value && x.dueDate  <  stringToDate(dateTo.value)! && x.dueDate > stringToDate(dateFrom.value)!)
            )
        else
        content = content.filter(x=>
            (x.description.includes(newSearch) || x.title.includes(newSearch)) )
    }
</script>

<template>
    <div class="search">
      <div>
        Search: <input type="text" v-model="search" />
      </div>
      <div>
        Date From: <input type="datetime-local" v-model="dateFrom" />
        Date To: <input type="datetime-local" v-model="dateTo" />
        <input type="checkbox" v-model="isDateFilter" @change="changeData(search)" />apply date filter
      </div>
    </div>
</template>