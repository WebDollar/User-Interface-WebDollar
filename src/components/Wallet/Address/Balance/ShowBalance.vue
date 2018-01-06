<template>

    <span>
        {{ (this.balance !== null && this.balance.hasOwnProperty(this.currency)) ? this.balance[this.currency] : 0 }}
    </span>

</template>

<script>

    export default{

        name: "ShowBalance",

        props: ['address', 'currency'],

        data(){
          return {
              balance: {},
              subscription: null,
            }
        },

        mounted(){

            if (typeof window === "undefined") return;

            this.currency = this.currency || '0x01';

            let data = WebDollar.Blockchain.Balances.subscribeBalanceChanges(this.address, (data)=>{
                this.balance = data.balance;
            });

            if (data !== null) {
                this.subscription = data.subscription;
                this.balance = data.balance;
            }

        },

        watch: {
            address: function (newVal, oldVal) { // watch it

                WebDollar.Blockchain.Balances.unsusbribeBalanceChanges(this.subscription);

                let data = WebDollar.Blockchain.Balances.subscribeBalanceChanges(newVal, (data)=>{
                    console.log("new balances");
                    this.balance = data.balance;
                });


                if (data !== null) {
                    this.subscription = data.subscription;
                    this.balance = data.balance;
                }

            },

            currency: function (newVal, oldVal) { // watch it

            }
        }

    }

</script>