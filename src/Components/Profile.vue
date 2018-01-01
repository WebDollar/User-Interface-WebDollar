<template>
    <div class="profile">
        @{{ name }}
    </div>
</template>

<script>
    export default {
        data () {
            return {
                name: 'Matt Stauffer'
            };
        }
    };
</script>

<style>
    .profile {
        background: #eee;
        border: 1px solid #aaa;
        border-radius: 2em;
        margin: 2em auto;
        min-height: 150px;
        padding: 2em;
        width: 300px;
    }
</style>