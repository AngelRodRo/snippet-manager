<template>
    <div class="container">
        <div class="form-group">
            <label>Name</label>
            <input class="form-control" v-model="snippet.name" type="text" />
        </div>
        <div class="form-group">
            <label>Repository</label>
            <input class="form-control" v-model="snippet.repository" type="text" />
        </div>
        <div>
            <button class="btn btn-primary" @click="register">Create</button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    export default {
        name: "SnippetForm",
        data() {
            return {
                snippet: {
                    name: "",
                    repository: ""
                }
            }
        },
        methods: {
            ...mapActions({
                createSnippet: "createSnippet"
            }),
            async register() {
                const snippet = this.snippet;
                await this.createSnippet(snippet);
                this.$router.push({ path: "/" })
            }
        }
    }
</script>

