<template>
    <div>
        <form action="">
            <div>
                <label for="">Email</label>
                <input v-model="credentials.email" type="email">
            </div>
            <div>
                <label for="">Password</label>
                <input v-model="credentials.password" type="password">
            </div>
            <div>
                <input type="button" @click="signIn" value="Sign in">
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
