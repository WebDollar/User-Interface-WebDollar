<template>

    <div class="show-balance-span">
        {{ (this.balances !== null && this.balances !== undefined && this.balances.hasOwnProperty(this.currency)) ? Math.round(this.balances[this.currency] * 1000)/1000 : 0 }}
    </div>

</template>

<script>

    export default{

        name: "ShowBalance",

        props: ['address', 'currency'],

        data(){
          return {
              balances: {},
              subscription: null,
            }
        },

        mounted(){

            if (typeof window === "undefined") return;

            this.currency = this.currency || '0x01';

//            if (typeof this.address === "object" && typeof this.address.hasOwnProperty("balances") ){ //it is an address object
//                this.balances = this.address.balances;
//                return;
//            }

            let address = this.address;
            if (typeof this.address === "object" && typeof this.address.hasOwnProperty("address") ) { //it is an address object
                address = this.address.address;
            }

            let data = WebDollar.Blockchain.Balances.subscribeBalancesChanges(address, (data)=>{
                this.balances = data.balances;
            });

            if (data !== null) {
                this.subscription = data.subscription;
                this.balances = data.balances;
            }

        },

        watch: {
            address: function (newVal, oldVal) { // watch it

//                if (typeof newVal === "object" && typeof newVal.hasOwnProperty("balances") ){ //it is an address object
//                    this.balances = newVal.balances;
//                    return;
//                }

                WebDollar.Blockchain.Balances.unsusbribeBalancesChanges(this.subscription);

                let address = newVal;
                if (typeof newVal === "object" && typeof newVal.hasOwnProperty("address") ) { //it is an address object
                    address = newVal.address;
                }

                console.log("address!!!!!!", address);

                let data = WebDollar.Blockchain.Balances.subscribeBalancesChanges(address, (data)=>{
                    console.log("balance changed")
                    this.balances = data.balances;
                });

                if (data !== null) {
                    this.subscription = data.subscription;
                    this.balances = data.balances;
                }

            },

            currency: function (newVal, oldVal) { // watch it

            }
        }

    }

</script>

<style>
    .show-balance-span{
        display: inline-block;
        margin-right: 4px;
        color: #fec02c;
        vertical-align: top;
        margin-top: 0;
        text-align: center;
    }
</style>