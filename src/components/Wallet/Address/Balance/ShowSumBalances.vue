<template>

    <span>
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

                for (let address in this.addresses){

                    if (addresses[address].balances !== undefined && addresses[address].balances !== null && addresses[address].balances[currency] !== undefined)
                        newSum += parseFloat( addresses[address].balances[currency]);
                }

                this.sum = newSum;

            }

        },

        watch: {
            addresses: function (newVal, oldVal) { // watch it

                console.log('changed to new', newVal);
                this.refreshSum(newVal, this.currency);

            },

            currency: function (newVal, oldVal) { // watch it

                this.refreshSum(this.addresses, newVal);

            }
        }

    }

</script>