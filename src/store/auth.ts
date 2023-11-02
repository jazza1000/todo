import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { type User } from '@/model/User';

export const useAuthStore = defineStore('auth', () => {
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

    function authenticateUser(user: User): boolean {
        console.log("authenticating user")
        if (users.filter(u => u.username == user.username && u.password == user.password).length) {
            authenticatedUser.value = user.username
            return true;
        }
        return false;
    }

    return {
        authenticatedUser,
        isAuthenticated,
        authenticateUser
      };
})
