import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { type Task } from '@/types/Task';
import { tasksData } from '@/model'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref( tasksData.data );

    function addTask(task: Task){
        tasks.push(task)
    }

    function getTask(taskId: number): Task {
        const task = tasksData.tasks.find(t => t.id === taskId);
        return task;
    }

    return {
        tasks,
        addTask,
        getTask
      };
})
