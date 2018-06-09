<template>
    <div>
        <form action="">
            <div>
                <label for="">Email</label>
                <input v-model="email" type="email">
            </div>
            <div>
                <label for="">Password</label>
                <input v-model="password" type="password">
            </div>
            <div>
                <input type="submit" value="Sign in">
            </div>
        </form>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";

    export default {
        name: "LoginView",
        computed: {
            ...mapGetters({
                login: "login"
            })
        },
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            async signIn() {
                const credentials = {
                    email: this.email,
                    password: this.password
                }
                await this.login(credentials)
            }
        }
    }
</script>
