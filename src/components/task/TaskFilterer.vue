<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { dateToISOString, stringToDate } from '@/mappers/date';
    import type Task from '@/types/Task';
    
    const props = defineProps<{
        content: Task[]
    }>()

    const emit = defineEmits(['filtered']);

    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate()+30);

    const search = ref('')
    const dateFrom =ref(dateToISOString(now))
    const dateTo = ref(dateToISOString(future));
    const isDateFilter = ref(false);

    watch ([search],async ([newSearch])=>{
        changeData(newSearch);
    })

    function changeData(newSearch:string)
    {
        let content = []
        if (isDateFilter.value)
             content = props.content.filter(x=>
                (x.description.includes(newSearch) || x.title.includes(newSearch))      
                &&  (x.dueDate && dateTo.value && x.dueDate  <  stringToDate(dateTo.value)! && x.dueDate > stringToDate(dateFrom.value)!)
                )
        else
            content = props.content.filter(x=>
                (x.description.includes(newSearch) || x.title.includes(newSearch)) )
        emit('filtered', content)
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