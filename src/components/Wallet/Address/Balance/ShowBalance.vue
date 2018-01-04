<template>

    <span>
        {{this.balance}}
    </span>

</template>

<script>

    export default{

        name: "ShowBalance",

        props:['address', 'currency'],

        data(){
          return {
              balance: {

              }
            }
        },

        mounted(){

            if (typeof window === "undefined") return;

//            WebDollar.Blockchain.Balances.registerBalanceChanges(address)

        },

        watch: {
            address: function (newVal, oldVal) { // watch it
                console.log('address changed: ', newVal, ' | was: ', oldVal)
            },

            currency: function (newVal, oldVal) { // watch it
                console.log('my_currency changed: ', newVal, ' | was: ', oldVal)
            }
        }

    }

</script>