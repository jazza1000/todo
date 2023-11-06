import { ref } from 'vue';
import { defineStore } from 'pinia';
import type Task from '@/types/Task';
import { tasksData } from '@/model'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>( tasksData.data );
    const nextId = ref<number>(tasksData.data.reduce((prev, current) => (prev && prev.id > current.id) ? prev : current).id + 1)

    function addTask(task: Task){
        console.log(task)
        tasks.value.push(task)
        nextId.value++
    }

    function replaceTask(task: Task){
        console.log(task)
        let index = tasks.value.findIndex(t => t.id === task.id)
        if (index === -1) return;
        tasks.value[index] = task
    }

    return {
        tasks,
        nextId,
        addTask,
        replaceTask
      };
})
