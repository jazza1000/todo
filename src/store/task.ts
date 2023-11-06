import { ref } from 'vue';
import { defineStore } from 'pinia';
import type Task from '@/types/Task';
import { tasksData } from '@/model'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>( tasksData.data );

    function addTask(task: Task){
        tasks.value.push(task)
    }

    function replaceTask(task: Task){
        console.log(task)
        let index = tasks.value.findIndex(t => t.id === task.id)
        if (index === -1) return;
        tasks.value[index] = task
    }

    return {
        tasks,
        addTask,
        replaceTask
      };
})