<script setup lang="ts">
    import type Task from '@/types/Task';
    import { reactive } from 'vue';

    const props = defineProps<{
        task: Task
        updateCallback: (task: Task) => void; 
    }>()

    const task = reactive<Task>(props.task)
    console.log(task)
</script>

<template>
    <label>Title</label>
    <input :value="task.title" placeholder="Title">
    <label>Description</label>
    <input :value="task.description">
</template>