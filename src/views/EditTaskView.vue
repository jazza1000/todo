<script setup lang="ts">
    import type Task from '@/types/Task'
    import TaskForm from '@/components/forms/TaskForm.vue';
    import { useTaskStore } from '@/store/task';
    const props = defineProps<{
        taskId: number
    }>()

    console.log(props.taskId)
    const taskStore = useTaskStore()
    const task = taskStore.tasks.find(t => t.id === props.taskId) 
</script>

<template>
    <h1>Edit Task</h1>
    <div v-if="task" >
        <TaskForm 
            :task="task" 
            :update-callback="taskStore.replaceTask" />
    </div>

    <div v-else>
        Task not found
    </div>
</template>
