<script setup lang="ts">
    import { computed, ref, watch } from 'vue';

    const props = defineProps<{
        content: Object[]
    }>()

    const emit = defineEmits(['paginated']);

    const pageSize = ref(10);
    const currentPage = ref(1);

    const totalPages = computed(()=>{
        return Math.ceil( props.content.length/ pageSize.value);
    })

    const startIndex = computed(()=>{
        return (currentPage.value - 1) * pageSize.value
    })

    const endIndex = computed(()=>{
        return Math.min(currentPage.value * pageSize.value, props.content.length);
    })

    const totalItems = computed(()=>{
        return props.content.length;
    })

    paginate();

    watch ([pageSize, currentPage, () => props.content], () => {
        paginate();
    })

    function paginate ()
    {
        let paginatedContent = props.content.slice(startIndex.value, endIndex.value)
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
        Items per page 
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
            {{ startIndex + 1 }} - {{ endIndex}} of {{ totalItems }}
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