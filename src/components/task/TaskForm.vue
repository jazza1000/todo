<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import type Task from '@/types/Task';
    import type User from '@/types/User';
    import type TaskEditPermissions from '@/types/TaskEditPermissions';
    import { dateToISOString, stringToDate } from '@/mappers/date';

    const props = defineProps<{
        task: Task
        users: User[]
        permissions: TaskEditPermissions
    }>()

    const dueDateString = ref<string>(dateToISOString(props.task.dueDate))
    const completedDateString = ref<string>(dateToISOString(props.task.completedDate))
    const task = reactive<Task>({
        id: props.task.id,
        title: props.task.title,
        description: props.task.description,
        assigned: props.task.assigned,
        dueDate: stringToDate(dueDateString.value),
        completedDate: stringToDate(completedDateString.value)
    })

    const emit = defineEmits(['submit']);

    function handleSubmit() {
        emit("submit", task)
    }
</script>

<template>
    <form>
        <label>Title</label>
        <input 
            v-model="task.title"
            placeholder="Title"
            data-test="title-input">

        <label>Description</label>
        <textarea 
            v-model="task.description"
            placeholder="Description"
            rows="10"
            data-test="description-input"></textarea>

        <label>Assignee</label>
        <select v-model="task.assigned">
            <option 
                value=null
                selected=true
            >
                Unassigned
            </option>
            <option
                v-for="user in users" 
                :key="user.username" 
                :value="user.username"
                :selected="task.assigned === user.username"
            >
                {{ user.username }}
            </option>
        </select>

        <label>Due Date</label>
        <input 
            v-model="dueDateString"
            class="date-input" 
            type="datetime-local"
            :disabled="!props.permissions.dueDate"
        />
        <label>Completed Date</label>
        <input 
            v-model="completedDateString"
            class="date-input"
            type="datetime-local"
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
