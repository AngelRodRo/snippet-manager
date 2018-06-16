<template>
    <div>
        <form>
            <div>
                <label>Name</label>
                <input v-model="snippet.name" type="text" />
            </div>
            <div>
                <label>Repository</label>
                <input v-model="snippet.repository" type="text" />
            </div>
            <div>
                <button @click="register">Create</button>
            </div>
        </form>
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
                await this.createSnippet(snippet)
            }
        }
    }
</script>

