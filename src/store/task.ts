import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type Task from '@/types/Task';
import { tasksData } from '@/model'
import { stringToDate } from '@/mappers/date';

export const useTaskStore = defineStore('task', () => {
    const tasksArray: Task[] = tasksData.data.map(t => {
        return {
            id: t.id,
            title: t.title,
            description: t.description,
            assigned: t.assigned,
            dueDate: stringToDate(t.dueDate),
            completedDate: stringToDate(t.completedDate)
        }
    });

    const allTasks = ref(tasksArray)

    const contains = ref("");
    const filteredTasks = computed(() => {
        return  allTasks.value.filter(x => x.description.includes(contains.value) || x.title.includes(contains.value)) 
    })
    const totalFilteredTasks = computed(() => {
        return  filteredTasks.value.length
    })

    const page = ref(1);
    const pageSize = ref(10);
    const paginatedTasks = computed(() => {
        let startIndex = (page.value - 1) * pageSize.value;
        let endIndex = Math.min(page.value * pageSize.value, filteredTasks.value.length);
        return  filteredTasks.value.slice(startIndex, endIndex)
    })

    const nextId = ref<number>(tasksData.data.reduce((prev, current) => (prev && prev.id > current.id) ? prev : current).id + 1)

    function changePage(newPage: number | undefined, newPageSize: number | undefined, newContains: string | undefined)  {
        page.value = newPage ?? page.value;
        pageSize.value = newPageSize ?? pageSize.value;
        contains.value = newContains ?? contains.value;
    }

    function addTask(task: Task){
        task.id = nextId.value
        allTasks.value.push(task)
        nextId.value++
    }

    function replaceTask(task: Task){
        let index = allTasks.value.findIndex(t => t.id === task.id)
        if (index === -1) return;
        allTasks.value[index] = task
    }

    return {
        tasks: paginatedTasks,
        totalTasks: totalFilteredTasks,
        changePage,
        addTask,
        replaceTask
      };
})
