// AwesomeComponent.vue
<template>
    <div>

        <Mining></Mining>
        <Wallet></Wallet>

    </div>
</template>

<script>

    import Wallet from "./Wallet/Wallet.vue"
    import Mining from "./Mining/Mining.vue"

    export default {

        components:{
            "Wallet":Wallet,
            "Mining":Mining,
        },

        data:  () => {
            return {

            }
        },

        methods: {

        }
    }
</script>