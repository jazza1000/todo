<script setup lang="ts">
    import { computed, ref, watch } from 'vue';

    const props = defineProps<{
        page: number;
        pageSize: number;
        totalItems: number
    }>()

    const selectedPageSize = ref(props.pageSize)

    const emit = defineEmits(['pageChanged']);

    const page = computed(() => {
        return props.page
    })

    const pageSize = computed(() => {
        return props.pageSize
    })

    const totalPages = computed(()=>{
        return Math.max(Math.ceil(props.totalItems / pageSize.value), 1);
    })

    const endIndex = computed(()=>{
        return Math.min(page.value * pageSize.value, props.totalItems);
    })

    const startIndex = computed(()=>{
        return (page.value - 1) * pageSize.value
    })

    const totalItems = computed(()=>{
        return props.totalItems;
    })

    watch(selectedPageSize, () => {
        let oldStartIndex = pageSize.value * (page.value - 1)
        let newPage = Math.ceil((oldStartIndex + 1) / selectedPageSize.value);
        emit('pageChanged', newPage, selectedPageSize.value)
    })

    function changePage(newPage: number) {
        emit('pageChanged', newPage, pageSize.value)
    }

    function firstPage() {
        changePage(1)
    }

    function nextPage() {
        if (page.value < totalPages.value)
            changePage(page.value + 1)
    }

    function prevPage() {
        if (page.value > 1)
            changePage(page.value - 1)
    }

    function lastPage() {
        changePage(totalPages.value)
    }
</script>

<template>
    <div>
        <slot name="filter"></slot>
        Items per page 
        <select v-model="selectedPageSize">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
        <div>
            Page {{ page }} of {{ totalPages }}
            <button @click="firstPage">first</button>
            <button @click="prevPage">prev</button>
            <button @click="nextPage">next</button>
            <button @click="lastPage">last</button>
            <div v-if="totalItems">
                {{ startIndex + 1 }} - {{ endIndex}} of {{ totalItems }}
            </div>
        </div>
        <slot></slot>
        <div>
            Page {{ page }} of {{ totalPages }}
            <button @click="firstPage">first</button>
            <button @click="prevPage">prev</button>
            <button @click="nextPage">next</button>
            <button @click="lastPage">last</button>
        </div>
    </div>
</template>