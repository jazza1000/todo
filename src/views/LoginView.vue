<script setup lang="ts">
    import { reactive } from 'vue'
    import { type User, users } from '@/model/User'

    const user = reactive<User>({
        username: "",
        password: ""
    })

    function authenticateUser(){
        if (users.filter(u => u.username == user.username && u.password == user.password).length) {
            console.log("Authenticated")
            }
        }

</script>

<template>
    <div>
        <input v-model="user.username" placeholder="Username"/>
        <input v-model="user.password" placeholder="Password" type="password"/>
        <button
            @click="authenticateUser()">
            Submit
        </button>
    </div>
</template>
