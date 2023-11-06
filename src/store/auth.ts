import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { type UserAuthData } from '@/types/UserAuthData';
import { usersData } from '@/model'
import type User from '@/types/User'

export const useAuthStore = defineStore('auth', () => {
    const authenticatedUser = ref<User | null>(null);
    const isAuthenticated = computed(() => {
        return authenticatedUser.value !== null;
    });

    const users = usersData.data;

    async function setAuthenticatedUser(userAuthData: UserAuthData) {
        const user = users.find(u => u.username == userAuthData.username && u.password == userAuthData.password)
        if (user) {
            authenticatedUser.value = {
                username: user.username
            }
        }
    }

    function clearAuthenticatedUser() {
        authenticatedUser.value = null
    }


    return {
        authenticatedUser,
        isAuthenticated,
        setAuthenticatedUser,
        clearAuthenticatedUser,
      };
})
