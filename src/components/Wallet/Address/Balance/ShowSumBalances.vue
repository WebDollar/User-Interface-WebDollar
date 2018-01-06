<template>

    <span>
        {{ this.sum }}
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

                //it should to math using BigNumber

                if (addresses === undefined || addresses === null) return ;

                for (let i=0; i<addresses.length; i++) {
                    console.log("addressse");
                    console.log(addresses[i]);
                    console.log(addresses[i].balances);
                    if (addresses[i].balances !== undefined && addresses[i].balances !== null && addresses[i].balances[currency] !== undefined)
                        newSum += addresses[i].balances[currency];
                }

                this.sum = newSum;
            }

        },

        watch: {
            addresses: function (newVal, oldVal) { // watch it

                console.log('changed to new', newVal);
//                this.refreshSum(newVal, this.currency);

            },

            currency: function (newVal, oldVal) { // watch it

//                this.refreshSum(this.addresses, newVal);

            }
        }

    }

</script>