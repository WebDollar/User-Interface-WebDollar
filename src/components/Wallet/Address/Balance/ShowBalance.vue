<template>

    <span>
        {{ (this.balance !== null && this.balance.hasOwnProperty('1')) ? this.balance['1'] : 0 }}
    </span>

</template>

<script>

    export default{

        name: "ShowBalance",

        props:['address', 'currency'],

        data(){
          return {
              balance: {},
              subscription: null,
            }
        },

        mounted(){

            if (typeof window === "undefined") return;

            console.log("address", this.address);
            let data = WebDollar.Blockchain.Balances.subscribeBalanceChanges(this.address, (newBalance)=>{
                this.balance = newBalance;
            });

//            this.subscription = data.subscription;
//            this.balance = data.balance;

        },

        watch: {
            address: function (newVal, oldVal) { // watch it
                console.log('address changed: ', newVal, ' | was: ', oldVal)


                WebDollar.Blockchain.Balances.unsusbribeBalanceChanges(this.subscription);
                let data = WebDollar.Blockchain.Balances.subscribeBalanceChanges(newVal, (newBalance)=>{
                    console.log("new balance", this.balance);
                    this.balance = newBalance;
                });

                console.log("new balance", this.balance);
                this.subscription = data.subscription;
                this.balance = data.balance;

            },

            currency: function (newVal, oldVal) { // watch it

            }
        }

    }

</script>