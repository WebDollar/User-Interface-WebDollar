<template>

    <div id="webDollar">
        <Mining ref="minig"></Mining>
        <Wallet :addresses="this.addresses" :currency="this.currency" ref="wallet"></Wallet>
    </div>

</template>

<style>

    #webDollar * {
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
    }
    #webDollar *:before,
    #webDollar *:after {
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
    }

    ::-webkit-scrollbar {
        width: 0;
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
    import Address from "components/Wallet/Address/Address.vue"

    export default {

        components:{
            "Wallet":Wallet,
            "Mining":Mining,
            "Address":Address,
        },

        data: () => {
            return {
                addresses: [],
                currency: "0x01",
            }
        },

        mounted(){

            this.loadAllAddresses();

        },

        methods: {

            loadAllAddresses(){

                for (let index in this.addresses){
                    WebDollar.Blockchain.Balances.unsusbribeBalancesChanges(this.addresses[index ].subscription);
                    this.addresses[ index ].subscription = null;
                    console.log("unsubscribe....");
                }

            }

            addNewAddress(address){

                if (address === null || address === undefined) return false;

                for (let i=0; i<this.addresses.length; i++)
                    if (address.toString() === this.addresses[i].address.toString()){
                        return false;
                    }

                this.addAddressToWalletWatch(address);
            },

        }

    }
</script>