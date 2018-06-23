<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Sniptor</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">
                        Home
                    </router-link>
                </li>
                <li v-if="!isAuthenticated" class="nav-item">
                    <router-link to="/login" class="nav-link">
                        Login
                    </router-link>
                </li>
                <li v-if="!isAuthenticated" class="nav-item">
                    <router-link  to="/register" class="nav-link">
                        Register
                    </router-link>
                </li>
                <li v-else class="nav-item">
                    <a @click="logout" href="#" class="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Navigation",
        computed:{
            ...mapGetters({
                isAuthenticated: "isAuthenticated"
            })
        },
        methods: {
            logout() {
                this.$store.commit("AUTH_LOGOUT");
                this.$router.push({ path: "/" });
            }
        }
    }
</script>