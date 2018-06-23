<template>
    <div class="container">
        <div class="form-group">
            <label for="">Email</label>
            <input class="form-control" v-model="credentials.email" type="email">
        </div>
        <div class="form-group">
            <label for="">Password</label>
            <input class="form-control" v-model="credentials.password" type="password">
        </div>
        <div>
            <button @click="signIn" class="btn btn-primary">Sign in</button>
            <button @click="register" class="btn btn-primary">Register</button>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";

    export default {
        name: "LoginView",
        data() {
            return {
                credentials: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            ...mapActions({
                login: "login"
            }),
            async signIn() {
                const credentials = this.credentials;
                await this.login(credentials);
                this.$router.push({ path: "/" })
            },
            register() {
                this.$router.push({ path: "/register" })
            }
        }
    }
</script>
