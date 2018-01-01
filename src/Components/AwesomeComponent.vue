// AwesomeComponent.vue
<template>
    <div>
        <p>Salutare</p>
        <button @click="doSomethingCool"></button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isDoingSomethingCool: false
            }
        },

        methods: {
            doSomethingCool () {
                this.isDoingSomethingCool = true;
            }
        }
    }
</script>