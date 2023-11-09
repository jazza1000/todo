<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import { storeToRefs } from 'pinia';
    import { type UserAuthData } from '@/types/UserAuthData.js'
    import { useAuthStore } from '@/store/auth.js'
    import router from '@/router'

    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);

    const user = reactive<UserAuthData>({
        username: "",
        password: ""
    })

    const validationErrors = ref<string[]>([])

    async function handleSubmit() {
        validateForm();
        if (validationErrors.value.length) return;
        
        authStore.setAuthenticatedUser(user)
        if (isAuthenticated.value){
           await router.push("/")
        }
        else {
            validationErrors.value.push("Username or password is incorrect")
        }
    }

    function validateForm() {
        validationErrors.value = [];
        if (!user.username) {
            validationErrors.value.push("Please enter a username")
        }
        if (!user.password) {
            validationErrors.value.push("Please enter a password")
        }
    }

</script>

<template>
    <form>
        <input v-model="user.username" placeholder="Username"/>
        <input v-model="user.password" placeholder="Password" type="password"/>
        <div v-for="error in validationErrors" :key="error">
            {{ error }}
        </div>
        <button
            type="button"
            @click="handleSubmit"
        >
            Submit
        </button>
    </form>
</template>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }
</style>