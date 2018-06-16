<template>
    <div>
        <button @click="showRegister">
        <Snippet
            :key="snippet.id"
            v-for="snippet in snippets"
            :snippet="snippet"
        />
    </div>
</template>
<script>
    import Snippet from "./Item";
    import { mapGetters } from "vuex";

    export default {
        name: "SnippetList",
        components: {
            Snippet,
            RegisterForm
        },
        computed: {
            ...mapGetters({
                snippets: "getSnippets"
            })
        },
        beforeCreate() {
            this.$store.dispatch("listSnippets");
        },
        methods: {
            showRegister() {
                
            }
        }
    }
</script>
