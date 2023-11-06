<script setup lang="ts">
    import type Task from '@/types/Task'
    import TaskForm from '@/components/forms/TaskForm.vue';
    import { useTaskStore } from '@/store/task';
    import router from '@/router'
    import { useUserStore } from '@/store/user';
    import { storeToRefs } from 'pinia';

    const props = defineProps<{
        taskId: number
    }>()

    const taskStore = useTaskStore()
    const userStore = useUserStore()
    const { users } = storeToRefs(userStore)
    const task = taskStore.tasks.find(t => t.id === props.taskId) 

    const permissions = {
        dueDate: false,
        completedDate: false
    }

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
            :users="users"
            :permissions="permissions"
            @submit="updateTask"
        />
    </div>

    <div v-else>
        Task {{ props.taskId }} not found
    </div>
</template>
