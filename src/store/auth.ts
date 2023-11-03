import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { type UserAuthData } from '@/types/UserAuthData';
import { users } from '@/model'

export const useAuthStore = defineStore('auth', () => {
    const authenticatedUser = ref<User | null>(null);
    const isAuthenticated = computed(() => {
        return authenticatedUser.value !== null;
    });

    const usersData = users.data;

    async function setAuthenticatedUser(userAuthData: UserAuthData) {
        const user = usersData.find(u => u.username == userAuthData.username && u.password == userAuthData.password)
        if (user) {
            authenticatedUser.value = {
                username: user.username
            }
        }
    }

    function clearAuthenticatedUser() {
        authenticatedUser.value = null
    }

    function getUsers(): User[] {
        return usersData.map(u => new { username: u.username })
    }

    return {
        authenticatedUser,
        isAuthenticated,
        setAuthenticatedUser,
        clearAuthenticatedUser,
        getUsers
      };
})
