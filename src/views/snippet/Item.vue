<template>
    <div class="col-md-4">
        <div class="card" style="margin: 10px 0">
            <div class="card-body">
                <h5 class="card-title">{{snippet.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Angel</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
        }
    }
</script>
