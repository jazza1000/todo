<script setup lang="ts">
    import { reactive } from 'vue';
    import type Task from '@/types/Task';
    import type User from '@/types/User';
    import type TaskEditPermissions from '@/types/TaskEditPermissions';

    const props = defineProps<{
        task: Task
        users: User[]
        permissions: TaskEditPermissions
    }>()

    const task = reactive<Task>(
        props.task
    )

    const emit = defineEmits(['submit']);

    function handleSubmit() {
        emit("submit", task)
    }

    console.log(props.permissions.dueDate)
    console.log(props.permissions.completedDate)
</script>

<template>
    <label>Title</label>
    <input v-model="task.title" placeholder="Title">

    <label>Description</label>
    <input v-model="task.description">

    <label>Assignee</label>
    <select v-model="task.assigned">
        <option v-for="user in users" :key="user.username" :value="user.username">{{ user.username }}</option>
    </select>

    <label>Due Date</label>
    <input type="datetime-local" v-model="task.dueDate" :disabled="!props.permissions.dueDate"/>

    <label>Completed Date</label>
    <input type="datetime-local" v-model="task.completedDate" :disabled="!props.permissions.completedDate"/>

    <button 
        @click="handleSubmit">
            Submit
    </button>
</template>
