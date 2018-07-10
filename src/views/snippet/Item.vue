<template>
    <div class="col-md-4">
        <div class="card" style="margin: 10px 0">
            <div class="card-body">
                <h5 class="card-title">{{snippet.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ author }}</h6>
                <p class="card-text">{{ snippet.description }}</p>
                <a :href="snippet.repository" class="btn btn-primary text-white">Show more</a>
            </div>
        </div>
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
        },
        computed: {
            author() {
                return this.snippet.author? `${this.snippet.author.firstName} ${this.snippet.author.lastName}` : "";
            }
        }
    }
</script>