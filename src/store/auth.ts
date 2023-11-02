import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { type User } from '@/model/User';

export const useAuthStore = defineStore('counter', () => {
    const authenticatedUser = ref<string | null>(null);
    const isAuthenticated = computed(() => {
        return authenticatedUser.value !== null;
    });

    const users: Array<User> = [
        {
            username: "spiderBob",
            password: "password123"
        },
        {
            username: "arachnidRobert",
            password: "password321"
        },
    ]

    function authenticateUser(user: User) {
        if (users.filter(u => u.username == user.username && u.password == user.password).length) {
            authenticatedUser.value = user.username
        }
    }

    return {
        authenticatedUser,
        isAuthenticated,
        authenticateUser
      };
})
