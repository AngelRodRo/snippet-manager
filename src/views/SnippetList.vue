<template>
    <div>
        <Snippet
            :key="snippet.id"
            v-for="snippet in snippets"
        />
    </div>
</template>
<script>
    import Snippet from "./Snippet";
    import { mapGetters } from "vuex";
    export default {
        name: "SnippetList",
        components: {
            Snippet
        },
        computed: {
            ...mapGetters({
                snippets: "getSnippets"
            })
        },
        beforeCreate() {
            this.$store.dispatch("listSnippets");
        }
    }
</script>
