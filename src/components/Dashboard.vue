<template>
    <div id="webDollar">

        <Mining></Mining>
        <Wallet></Wallet>

    </div>
</template>

<style>
    ::-webkit-scrollbar {
    }

    /* Track */
    ::-webkit-scrollbar-track {
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        opacity:0.1;
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: rgba(0,0,0,0.5);
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }

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