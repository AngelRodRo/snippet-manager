<template>
    <div class="container">
        <h3>Create a new account</h3>
        <div class="form-group">
            <input name="firstName" class="form-control" placeholder="First name" v-model.trim="$v.author.firstName.$model" type="text">
            <div v-if="$v.author.firstName.$error">
                <div class="error" v-if="!$v.author.firstName.required">First name is required</div>
                <div class="error" v-if="!$v.author.firstName.minLength">First name must have at least {{$v.author.firstName.$params.minLength.min}} letters.</div>
            </div>
        </div>
        <div class="form-group">
            <input name="lastName" class="form-control" placeholder="Lastname" v-model="$v.author.lastName.$model" type="text">
            <div v-if="$v.author.lastName.$error">
                <div class="error" v-if="!$v.author.lastName.required">Last name is required</div>
                <div class="error" v-if="!$v.author.lastName.minLength">Last name must have at least {{$v.author.lastName.$params.minLength.min}} letters.</div>
            </div>
        </div>
        <div class="form-group">
            <input name="email" class="form-control" placeholder="Email" v-model="$v.author.email.$model" type="email">
            <div v-if="$v.author.email.$error">
                <div class="error" v-if="!$v.author.email.required">Email is required</div>
                <div class="error" v-if="!$v.author.email.email">The email must be valid</div>
            </div>
        </div>
        <div class="form-group">
            <input name="password" class="form-control" placeholder="Password" v-model="$v.author.password.$model" type="password">
            <div v-if="$v.author.password.$error">
                <div class="error" v-if="!$v.author.password.required">Password is required</div>
            </div>
        </div>
        <div class="form-group">
            <button 
                :class="{ 'disabled': $v.$invalid }"
                :disabled="$v.$invalid"
                class="btn btn-primary" 
                @click="registerAuthor" 
                type="button">
                Register
            </button>
        </div>
    </div>
</template>
<script>

    import { mapActions } from "vuex"
    import { required, email, minLength, sameAs } from "vuelidate/lib/validators"

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
        validations: {
            author: {
                firstName: {
                    required,
                    minLength: minLength(4)
                },
                lastName: {
                    required,
                    minLength: minLength(4)
                },
                password: {
                    required
                },
                email: {
                    required,
                    email
                }
            }
        },
        methods: {
            ...mapActions({
                createAuthor: "createAuthor"
            }),
            async registerAuthor(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (!this.$v.invalid) {
                    const payload = this.author;
                    await this.createAuthor(payload);
                    this.$router.push({ path: "/" })
                }
            }
        }
    }
</script>