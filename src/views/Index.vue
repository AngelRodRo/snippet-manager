<template>
    <div>
        <Navigation />
        <br>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">@</span>
                        </div>
                        <input type="text" v-model="query" class="form-control" placeholder="Search a snippet..." >
                    </div>
                </div>
            </div>
            <snippet-list />
        </div>
    </div>
    
</template>
<script>
    import SnippetList from "./snippet/List";
    import Navigation from "../components/Navigation";

    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Index",
        components: {
            SnippetList,
            Navigation
        },
        data() {
            return {
                query: ""
            }
        },
        computed:{
            ...mapGetters({
                isAuthenticated: "isAuthenticated"
            })
        },
        watch: {
            query(val) {
                this.$store.dispatch("listSnippets", val);
            }
        }
    }
</script>
