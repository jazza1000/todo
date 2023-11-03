<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import { storeToRefs } from 'pinia';
    import { type UserAuthData } from '@/types/UserAuthData.js'
    import { useAuthStore } from '@/store/auth.js'
    import { useTaskStore } from '@/store/task.js'
    import router from '@/router'

    const authStore = useAuthStore();
    const taskStore = useTaskStore();
    const { isAuthenticated } = storeToRefs(authStore);

    const user = reactive<UserAuthData>({
        username: "",
        password: ""
    })

    function login(){
        authStore.setAuthenticatedUser(user)
        if (isAuthenticated){
            router.push("/")
        }
    }
</script>

<template>
    <div>
        <input v-model="user.username" placeholder="Username"/>
        <input v-model="user.password" placeholder="Password" type="password"/>
        <button
            @click="login()">
            Submit
        </button>
    </div>
</template>
@/store/auth@/model/UserAuthData