<template>

    <div id="webDollar">
        <mining :startAutomatically="startAutomatically" :addresses="this.addresses" :currency="this.currency" ref="refMining"></mining>
        <wallet :addresses="this.addresses" :currency="this.currency" ref="refWallet"></wallet>
        <notifications class="notificationsBox" group="important" position="bottom left" max="5"/>
    </div>

</template>

<script>

    import Vue from "vue";
    import Wallet from "./Wallet/Wallet.vue"
    import Mining from "./Mining/Mining.vue"
    import Address from "components/Wallet/Address/Address.vue"

    export default {

        components:{
            Wallet,
            Mining,
        },

        props:[
            "startAutomatically",
        ],

        data: () => {
            return {
                addresses: [],
                currency: "0x01",
            }
        },

        mounted(){

            if (typeof window === "undefined") return ;

              WebDollar.Blockchain.Wallet.emitter.on("wallet/address-changes", (address)=>{
                  console.log("wallet/address-changes", address);
                  this.addNewAddress(address);
              });

              WebDollar.Blockchain.Wallet.emitter.on("wallet/changes", ()=>{
                  this.loadAllAddresses();
              });

            this.loadAllAddresses();

        },

        methods: {

            loadAllAddresses(){

                for (let index in this.addresses){
                    WebDollar.Blockchain.Balances.unsusbribeBalancesChanges(this.addresses[index ].subscription);
                    this.addresses[ index ].subscription = null;
                    console.log("unsubscribe....");
                }

                this.addresses = [];

                for (let i=0; i<WebDollar.Blockchain.Wallet.addresses.length; i++) {
                    this.addAddressToWalletWatch(WebDollar.Blockchain.Wallet.addresses[i].address);
                }

            },

            addNewAddress(address){

                if (address === null || address === undefined) return false;

                for (let i=0; i<this.addresses.length; i++)
                    if (address.toString() === this.addresses[i].address.toString()){
                        return false;
                    }

                this.addAddressToWalletWatch(address);
            },


            addAddressToWalletWatch(address){

                let data = WebDollar.Blockchain.Balances.subscribeBalancesChanges(address, (data)=>{

                    for (let i=0; i<this.addresses.length; i++)
                        if (this.addresses[i].address === address ){

                            this.addresses[i].balances = data.balances;
                            this.addresses[i] = Object.assign( {}, this.addresses[i], { });

                            this.$refs['refMining'].$refs['refShowSumBalances'].refreshSum(this.addresses, this.currency);
                            this.$refs['refMining'].$refs['refShowSumAvailableBalances'].refreshSum(this.addresses, this.currency);
                            this.$refs['refMining'].$refs['refShowSumPotentialBalances'].refreshSum(this.addresses, this.currency);

                            this.$refs['refWallet'].$refs['refShowSumBalances'].refreshSum(this.addresses, this.currency);

                            break;
                        }

                    // immutable array
                    // this.addresses = Object.assign( {}, this.addresses, { });

                    this.$forceUpdate();

                });

                if (data !== null && data.result) {

                    let element =  {address: address, balances: data.balances, subscription: data.subscription};
                    this.addresses.push (element);

                }

            },

            deleteAddress(address){

                if (address === null || address === undefined) return false;

                for (let keyAddress in this.addresses)
                    if (address.toString() === this.addresses[keyAddress].address.toString()){

                        WebDollar.Blockchain.Balances.unsusbribeBalancesChanges(this.addresses[keyAddress].subscription);
                        this.addresses.splice(i,1);
                        return true;
                    }

                return false;
            },

        }

    }
</script>

<style>

    .success{
        background: #2ea75e!important;
        border-left-color: #006528!important;
    }

    .error{
        background: #d23c25!important;
        border-left-color: #842b24!important;
    }

    .warn{
        background: #ffb648!important;
        border-left-color: #7b5419!important;
        color: #523f3c!important;
    }

    .vue-notification{
        background: #4a4a4a;
        border-left: 5px solid #5a5a5a;
    }

    .notification-title{
        font-size: 14px;
    }

    .notification-content{
        font-size: 12px;
    }

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

    .helpCursor{
        cursor:help;
    }

    .notificationsBox{
        margin-bottom: 40px;
    }

</style>