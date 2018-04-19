<template>

    <div style="display: inline-block">

        <loading-spinner class="loading-wallet-spinner" v-if="!this.loaded" />

        <span v-if="this.loaded" class="show-sum-balances">
            {{ this.formatMoneyNumber(this.sum,2) }}
        </span>

    </div>

</template>

<script>

    import LoadingSpinner from "components/UI/elements/Loading-Spinner.vue"

    export default{

        components:{
            LoadingSpinner,
        },

        props: ['addresses', 'currency'],

        data(){
            return {
                sum: 0,
                loaded: false,
            }
        },

        mounted(){

            if (typeof window === "undefined") return;

            WebDollar.StatusEvents.emitter.on("blockchain/status", (data)=>{

                if (data.message === "Blockchain Ready to Mine")
                    this.loaded = true;

            });

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

                if (this.sum!==0){

                    //this.sum = this.formatMoneyNumber(this.sum);
                    this.sum = this.sum;

                }

            },

            formatMoneyNumber(n, decimals=0) {

               var number = parseInt(n/WebDollar.Applications.CoinsHelper.WEBD);
               var decimalNumber = getNumberRest(n);

               return formatIntNumber(number)+'.'+getFirstDigits(decimalNumber,decimals);

            },

            formatIntNumber(number){

                return n.toString().replace(/./g, function(c, i, a) {
                    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                });

            },

            getNumberRest(number){

                return number % WebDollar.Applications.CoinsHelper.WEBD;

            },

            getFirstDigits(number,decimals){

                var decimalsVerifier = Math.pow(10,decimals);

                while (decimalsVerifier < number){

                    number = number/10;

                }

                return parseInt(number);

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

    .loading-wallet-spinner{
        fill: black !important;;
        margin-left: 10px;
        margin-top: 0 !important;
        vertical-align: middle !important;;
    }

</style>
