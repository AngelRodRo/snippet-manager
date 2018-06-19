<template>
    <div class="container">
        <form action="">
            <div class="form-group">
                <label for="">Email</label>
                <input class="form-control" v-model="credentials.email" type="email">
            </div>
            <div class="form-group">
                <label for="">Password</label>
                <input class="form-control" v-model="credentials.password" type="password">
            </div>
            <div>
                <input class="btn btn-primary" type="button" @click="signIn" value="Sign in">
            </div>
        </form>
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
            }
        }
    }
</script>
