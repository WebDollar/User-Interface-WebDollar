<template>

    <span class="show-sum-balances">
        {{  Math.round(this.sum * 100000)/100000 }}
    </span>

</template>

<script>

    export default{

        name: "ShowSumBalances",

        props: ['addresses', 'currency'],

        data(){
            return {
                sum: 0,
            }
        },

        mounted(){

        },

        methods:{

            refreshSum(addresses, currency){

                let newSum = 0;

                //it should use BigNumber as math...

                if (addresses === undefined || addresses === null) return ;

                for (let index in this.addresses){

                    if (addresses[index].balances !== undefined && addresses[index].balances !== null && addresses[index].balances[currency] !== undefined)
                        newSum += parseFloat( addresses[index].balances[currency]);
                }

                this.sum = newSum;

            }

        },

        watch: {
            addresses: function (newVal, oldVal) { // watch it

                this.refreshSum(newVal, this.currency);

            },

            currency: function (newVal, oldVal) { // watch it

                this.refreshSum(this.addresses, newVal);

            }
        }

    }

</script>

<style>

    .show-sum-balances{
        width: auto;
        display: inline-block;
        color:#fec02c;
    }

</style>
