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
    export default {
        name: "SnippetList",
        components: {
            Snippet
        }
    }
</script>
