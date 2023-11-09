<script setup lang="ts">
    import { reactive } from 'vue';
    import type Task from '@/types/Task'
    import TaskForm from '@/components/task/TaskForm.vue';
    import { useTaskStore } from '@/store/task';
    import router from '@/router'
    import { useUserStore } from '@/store/user';
    import { storeToRefs } from 'pinia';

    const taskStore = useTaskStore()
    const userStore = useUserStore()
    const { users } = storeToRefs(userStore)
 
    const task = reactive<Task>({
        title: "",
        description: ""
    })

    const permissions = {
        dueDate: true,
        completedDate: true
    }

    async function createTask(taskToCreate: Task){
        taskStore.addTask(taskToCreate)
        await router.push('/')
    }
</script>

<template>
    <h1>Create Task</h1>
    <TaskForm 
        :task="task" 
        :users="users"
        :permissions="permissions"
        @submit="createTask"
        />
</template>
