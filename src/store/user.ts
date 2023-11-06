import { ref } from 'vue';
import { defineStore } from 'pinia';
import type User from '@/types/User';
import { usersData } from '@/model'

export const useUserStore = defineStore('user', () => {

    const users = ref<User[]>(usersData.data.map(u => { return { username: u.username }} ));

    return {
        users
    };
})
