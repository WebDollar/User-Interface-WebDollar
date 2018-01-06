<template>

    <div class="show-balance-span">
        {{ (this.balances !== null && this.balances.hasOwnProperty(this.currency)) ? Math.round(this.balances[this.currency] * 100000)/100000 : 0 }}
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

            let data = WebDollar.Blockchain.Balances.subscribeBalancesChanges(this.address, (data)=>{
                this.balances = data.balances;
            });

            if (data !== null) {
                this.subscription = data.subscription;
                this.balances = data.balances;
            }

        },

        watch: {
            address: function (newVal, oldVal) { // watch it

                WebDollar.Blockchain.Balances.unsusbribeBalancesChanges(this.subscription);

                let data = WebDollar.Blockchain.Balances.subscribeBalancesChanges(newVal, (data)=>{
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
        margin-right: 10px;
        color: #fec02c;
        vertical-align: top;
        margin-top: 0;
        text-align: center;
    }
</style>