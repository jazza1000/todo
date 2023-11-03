<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import { storeToRefs } from 'pinia';
    import { type User } from '@/model/User'
    import { useAuthStore } from '@/store/auth.js'
    import router from '@/router'

    const { authenticateUser } = useAuthStore();
    const { isAuthenticated } = storeToRefs(useAuthStore());

    const user = reactive<User>({
        username: "",
        password: ""
    })

    function login(){
        authenticateUser(user)
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
@/store/auth