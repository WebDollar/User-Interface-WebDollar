<template>

    <span class="show-sum-balances">
        {{ this.sum }}
    </span>

</template>

<script>

    export default{

        name: "ShowSumBalances",

        props: ['addresses', 'currency'],

        data(){
            return {
                sum: 0
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

                this.sum = Math.round(newSum * 100000)/100000;

                if (this.sum!==0){

                    this.sum = this.formatMoneyNumber(this.sum);

                }

            },

            formatMoneyNumber(n, decimals=0) {
                return n.toFixed(decimals).replace(/./g, function(c, i, a) {
                    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                });
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
