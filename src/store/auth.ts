import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { type UserAuthData } from '@/types/UserAuthData';
import { usersData } from '@/model'
import type User from '@/types/User'

export const useAuthStore = defineStore('auth', () => {
    const authenticatedUser = ref<User | null>(null);
    const isAuthenticated = computed(() => {

        if (authenticatedUser.value===null){
                //check in local storage
                authenticatedUser.value = JSON.parse(localStorage.getItem('user')!)
        }
        return authenticatedUser.value !== null;
    });

    const users = usersData.data;

    function setAuthenticatedUser(userAuthData: UserAuthData) {
        const user =  users.find(u => u.username == userAuthData.username && u.password == userAuthData.password)
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            authenticatedUser.value = {
                username: user.username
            }
        }
    }

    function clearAuthenticatedUser() {
        authenticatedUser.value = null
        localStorage.removeItem('user');
    }


    return {
        authenticatedUser,
        isAuthenticated,
        setAuthenticatedUser,
        clearAuthenticatedUser,
      };
})
