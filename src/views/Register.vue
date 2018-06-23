<template>
    <div class="container">
        <div class="form-group">
            <label for="">First name</label>
            <input class="form-control" v-model="author.firstName" type="text">
        </div>
        <div class="form-group">
            <label for="">Last name</label>
            <input class="form-control" v-model="author.lastName" type="text">
        </div>
        <div class="form-group">
            <label for="">Email</label>
            <input class="form-control" v-model="author.email" type="email">
        </div>
        <div class="form-group">
            <label for="">Password</label>
            <input class="form-control" v-model="author.password" type="password">
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click="registerAuthor" type="button">Register</button>
        </div>
    </div>
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
                await this.createAuthor(payload);
                this.$router.push({ path: "/" })
            }
        }
    }
</script>