<template>
    <form action="">
        <div>
            <label for="">First name</label>
            <input v-model="author.firstName" type="text">
        </div>
        <div>
            <label for="">Last name</label>
            <input v-model="author.lastName" type="text">
        </div>
        <div>
            <label for="">Email</label>
            <input v-model="author.email" type="email">
        </div>
        <div>
            <label for="">Password</label>
            <input v-model="author.password" type="password">
        </div>
        <div>
            <input @click="registerAuthor" type="button" value="Register">
        </div>
    </form>
</template>
<script>
    import { mapActions } from "vuex"
    export default {
        name: "RegisterForm",
        data() {
            return {
                author: {
                    firstName: "",
                    lastName: "",
                    password: "",
                    email: ""
                }
            }
        },
        methods: {
            ...mapActions({
                createAuthor: "createAuthor"
            }),
            async registerAuthor() {
                const payload = this.author;
                debugger
                await this.createAuthor(payload);
            }
        }
    }
</script>

