<template>
    <div id="webDollar">

        <Mining></Mining>
        <Wallet></Wallet>

    </div>
</template>

<style>
    #webDollar{
        font-family: 'avenir',sans-serif;
    }
</style>

<script>

    import Wallet from "./Wallet/Wallet.vue"
    import Mining from "./Mining/Mining.vue"

    export default {

        components:{
            "Wallet":Wallet,
            "Mining":Mining,
        },

        data: () => {
            return {

            }
        },

        methods: {

        }
    }
</script>