<script setup lang="ts">
    import { computed, ref, toRef, type Ref, watch } from 'vue';
    import { useTaskStore } from '@/store/task';
    import { storeToRefs } from 'pinia';
    import { dateToISOString, stringToDate } from '@/mappers/date';

    const props = defineProps<{
        content: Object[]
    }>()

    const emit = defineEmits(['paginated']);

    const content = toRef(props.content)
    const pageSize = ref(10);
    const currentPage = ref(1);
   
    paginate(1, pageSize.value);

    const contentCount = computed(()=>{
        return content.value.length;
    })

    const totalPages = computed(()=>{
        return Math.ceil( content.value.length/ pageSize.value);
    })

    watch ([pageSize, currentPage], x => {
        paginate(currentPage.value, pageSize.value);
    })

    function paginate (page:number, pageSize:number)
    {
        let endIndex= Math.min(page*pageSize, content.value.length);
        let startIndex = (page - 1) * pageSize
        let paginatedContent = content.value.slice(startIndex, endIndex)
        emit("paginated", paginatedContent)
    }

    function firstPage()
    {
        currentPage.value = 1;
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

    function lastPage()
    {
        currentPage.value = totalPages.value
    }
</script>

<template>
    <div>
        <slot name="filter"></slot>
        Tasks per page 
        <select v-model="pageSize" >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
        <div>
            Page {{ currentPage }} of {{ totalPages }}
            <button @click="firstPage">first</button>
            <button @click="prevPage">prev</button>
            <button @click="nextPage">next</button>
            <button @click="lastPage">last</button>
        </div>
        <slot></slot>
        <div>
            Page {{ currentPage }} of {{ totalPages }}
            <button @click="firstPage">first</button>
            <button @click="prevPage">prev</button>
            <button @click="nextPage">next</button>
            <button @click="lastPage">last</button>
        </div>
    </div>
</template>