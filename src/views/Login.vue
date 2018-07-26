<template>
    <div class="container">
        <div class="form-group">
            <input class="form-control" 
                placeholder="Email" 
                v-model.trim="$v.credentials.email.$model" 
                type="email"
            />
            <div v-if="$v.credentials.email.$error">
                <div class="error" v-if="!$v.credentials.email.required">Email is required</div>
            </div>
        </div>
        <div class="form-group">
            <input 
                class="form-control" 
                placeholder="Password" 
                v-model.trim="$v.credentials.password.$model" 
                type="password"
            />
            <div v-if="$v.credentials.password.$error">
                <div class="error" v-if="!$v.credentials.password.required">Password is required</div>
            </div>
        </div>
        <div>
            <button 
                @click="signIn" 
                :class="{ 'disabled': $v.$invalid }" 
                :disabled="$v.$invalid"
                class="btn btn-primary">
                Sign in
            </button>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";
    import { required, email, minLength } from "vuelidate/lib/validators"

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
        validations: {
            credentials: {
                email: {
                    required,
                    email,
                    minLength: minLength(4)
                },
                password: {
                    required
                }
            }
        },
        methods: {
            ...mapActions({
                login: "login"
            }),
            async signIn() {
                if (!this.$v.$invalid) {
                    const credentials = this.credentials;
                    await this.login(credentials);
                    this.$router.push({ path: "/" })
                }
            },
            register() {
                this.$router.push({ path: "/register" })
            }
        }
    }
</script>