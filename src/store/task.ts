import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { type Task } from '@/types/Task';
import { tasksData } from '@/model'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>( tasksData.data );

    function addTask(task: Task){
        tasks.push(task)
    }

    function replaceTask(task: Task){
        tasks.filter(t => t.id !== task.id).push(task)
    }

    return {
        tasks,
        addTask,
        replaceTask
      };
})
