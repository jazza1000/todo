<script setup lang="ts">
    import type Task from '@/types/Task'
    import TaskForm from '@/components/forms/TaskForm.vue';
    import { useTaskStore } from '@/store/task';
    import router from '@/router'

    const props = defineProps<{
        taskId: number
    }>()

    const taskStore = useTaskStore()
    const task = taskStore.tasks.find(t => t.id === props.taskId) 

    function updateTask(updatedTask: Task){
        taskStore.replaceTask(updatedTask)
        router.push('/')
    }
</script>

<template>
    <h1>Edit Task</h1>
    <div v-if="task" >
        <TaskForm 
            :task="task" 
            @submit="updateTask"
            />
    </div>

    <div v-else>
        Task {{ props.taskId }} not found
    </div>
</template>
