<template>
    <div>
        <ul>
            <li> 
                <router-link tag="home" to="/">
                    <a>Home</a>
                </router-link>
            </li>
            <li>
                <router-link tag="login" to="/login">
                    <a>Login</a>
                </router-link>
            </li>
            <li>
                <router-link tag="register" to="/register">
                    <a>Register</a>
                </router-link>
            </li>
        </ul>
        <snippet-list />
    </div>
</template>
<script>
    import SnippetList from "./SnippetList";

    export default {
        name: "Index",
        components: {
            SnippetList
        }
    }
</script>
