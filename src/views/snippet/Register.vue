<template>
    <div class="container">
        <div class="form-group">
            <label>Name</label>
            <input class="form-control" v-model="$v.snippet.name.$model" type="text" />
            <div v-if="$v.snippet.name.$error">
                <div class="error" v-if="!$v.snippet.name.required">Snippet name is required</div>
            </div>
        </div>
        <div class="form-group">
            <label>Repository</label>
            <input class="form-control" v-model="$v.snippet.repository.$model" type="text" />
            <div v-if="$v.snippet.repository.$error">
                <div class="error" v-if="!$v.snippet.repository.required">Snippet repository is required</div>
                <div class="error" v-if="!$v.snippet.repository.url">Snippet repository must be valid</div>
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" v-model="snippet.description" cols="30" rows="10"></textarea>
        </div>
        <div>
            <button 
                class="btn btn-primary" 
                :class="{ 'disabled': $v.$invalid }" 
                @click="register">
                Create
            </button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import { required, email, url, minLength } from "vuelidate/lib/validators"

    export default {
        name: "SnippetForm",
        data() {
            return {
                snippet: {
                    name: "",
                    repository: "",
                    description: ""
                }
            }
        },
        validations: {
            snippet: {
                name: {
                    required,
                    minLength: minLength(4)
                },
                repository: {
                    required,
                    url,
                    minLength: minLength(4)
                }
            }
        },
        methods: {
            ...mapActions({
                createSnippet: "createSnippet"
            }),
            async register() {
                if (!this.$v.$invalid) {
                    const snippet = this.snippet
                    await this.createSnippet(snippet)
                    this.$router.push({ path: "/" })
                }
            }
        }
    }
</script>