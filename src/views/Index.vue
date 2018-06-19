<template>
    <div>
        <div>
            <ul class="nav">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">
                        Home
                    </router-link>
                </li>
                <li v-if="!isAuthenticated" class="nav-item">
                    <router-link  to="/login" class="nav-link">
                        Login
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">@</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search a snippet..." >
                    </div>
                </div>
            </div>
            
            <snippet-list />
        </div>
    </div>
    
</template>
<script>
    import SnippetList from "./snippet/List";
    import { mapGetters } from 'vuex';

    export default {
        name: "Index",
        components: {
            SnippetList
        },
        computed:{
            ...mapGetters({
                isAuthenticated: "isAuthenticated"
            })
        }
    }
</script>
