<script setup lang="ts">
    import { reactive } from 'vue'
    import { type User } from '@/model/User'
    import { useAuthStore } from '@/store/auth.js'
    import router from '@/router'

    const { authenticateUser } = useAuthStore();

    const user = reactive<User>({
        username: "",
        password: ""
    })

    function login(){
        console.log("trying to login")
        if (authenticateUser(user)){
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