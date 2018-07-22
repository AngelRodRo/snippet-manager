<template>
    <div>
        <button class="btn btn-primary" v-if="isAunthenticated" @click="showRegister">New Snippet</button>
        <br>
        <br>
        <div class="row" >
            <Snippet
                :key="snippet.id"
                v-for="snippet in snippets"
                :snippet="snippet"
            />
        </div>
    </div>
</template>
<script>
    import Snippet from "./Item";
    import { mapGetters } from "vuex";

    export default {
        name: "SnippetList",
        components: {
            Snippet
        },
        computed: {
            ...mapGetters({
                snippets: "getSnippets",
                isAunthenticated: "isAuthenticated"
            })
        },
        beforeCreate() {
            this.$store.dispatch("listSnippets");
        },
        methods: {
            showRegister() {
                this.$router.push({ path: "/snippet-register" })
            }
        }
    }
</script>