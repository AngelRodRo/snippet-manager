<template>
    <div>
        <p>Name : <span>{{snippet.name}}</span></p>
        <p>Author : <span>{{snippet.author}}</span></p>
    </div>
</template>
<script>
    export default {
        name: "Snippet",
        props: {
            snippet: {
                type: Object,
                default: {}
            }
        }
    }
</script>
