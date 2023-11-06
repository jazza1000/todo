<script setup lang="ts">
    import { reactive } from 'vue';
    import type Task from '@/types/Task';

    const props = defineProps<{
        task: Task
    }>()

    const task = reactive<Task>(
        props.task
    )

    const emit = defineEmits(['submit']);

    function handleSubmit() {
        emit("submit", task)
    }

</script>

<template>
    <label>Title</label>
    <input v-model="task.title" placeholder="Title">
    <label>Description</label>
    <input v-model="task.description">
    <button 
        @click="handleSubmit">
            Submit
    </button>
</template>