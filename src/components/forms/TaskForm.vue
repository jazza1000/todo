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
</script>

<template>
    <form>
        <label>Title</label>
        <input v-model="task.title" placeholder="Title">

        <label>Description</label>
        <textarea 
            placeholder="Description"
            rows="10"
            v-model="task.description"></textarea>

        <label>Assignee</label>
        <select v-model="task.assigned">
            <option 
                value=null
                :selected="task.assigned === null"
            >
                Unassigned
            </option>
            <option v-for="user in users" 
                :key="user.username" 
                :value="user.username"
                :selected="task.assigned === user.username"
            >
                {{ user.username }}
            </option>
        </select>

        <label>Due Date</label>
        <input 
            class="date-input"
            type="date" 
            v-model="task.dueDate"
            :disabled="!props.permissions.dueDate"/>

        <label>Completed Date</label>
        <input 
            class="date-input"
            type="date"
            v-model="task.completedDate"
            :disabled="!props.permissions.completedDate"/>

        <button 
            type="button"
            @click="handleSubmit"
        >
            Submit
        </button>
    </form>
</template>

<style scoped>
    form {
        width: 60vw;
        display: flex;
        flex-direction: column;
    }

    select {
        width: fit-content;
        margin-bottom: 1em;
    }
    
    input {
        margin-bottom: 1em;
    }

    textarea {
        margin-bottom: 1em;
    }

    .date-input {
        width: fit-content;
    }

    button {

        width: 5em;
    }
</style>
