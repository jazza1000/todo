<script setup lang="ts">
    import { reactive } from 'vue';
    import type Task from '@/types/Task'
    import TaskForm from '@/components/forms/TaskForm.vue';
    import { useTaskStore } from '@/store/task';
    import router from '@/router'

    const taskStore = useTaskStore()

    const task = reactive<Task>({
        id: taskStore.nextId,
        title: null
    })

    function createTask(taskToCreate: Task){
        taskStore.addTask(taskToCreate)
        router.push('/')
    }
</script>

<template>
    <h1>Create Task</h1>
    <TaskForm 
        :task="task" 
        @submit="createTask"
        />
</template>
