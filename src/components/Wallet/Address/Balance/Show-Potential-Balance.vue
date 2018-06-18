<template>

    <div style="display: inline-block">

        <loading-spinner class="fontColor" v-if="!this.loaded" />

        <div class="show-balance-span" v-if="this.loaded" >
            {{ this.formatMoneyNumber( (this.computePrice+this.poolReward) ,2)}}
        </div>

    </div>

</template>

<script>

    import LoadingSpinner from "components/UI/elements/Loading-Spinner.vue"

    export default{

        components:{
            LoadingSpinner,
        },

        props: ['address', 'currency'],

        data(){
          return {
              balances: {},
              poolReward: 0,
              subscription: null,
              loaded: WebDollar.Blockchain.loaded||false,
            }
        },

        computed:{

            computePrice(){

                if (this.balances === null || this.balances === undefined || !this.balances.hasOwnProperty(this.currency)) return 0;

                //return this.formatMoneyNumber( this.balances[this.currency] / WebDollar.Applications.CoinsHelper.WEBD );
                return (this.balances[this.currency]);
            }

        },

        mounted(){

            if (typeof window === "undefined") return;

            this.currency = this.currency || '0x01';

            let address = this.address;
            if (typeof this.address === "object" && typeof this.address.hasOwnProperty("address") ) { //it is an address object
                address = this.address.address;
            }

            WebDollar.StatusEvents.emitter.on("blockchain/status", (data)=>{

                if (data.message === "Blockchain Ready to Mine")
                    this.loaded = true;

            });

            let data = WebDollar.Blockchain.Balances.subscribeBalancesChanges(address, (data)=>{
                this.balances = data.balances;
            });

            if (data !== null && data.result) {
                this.subscription = data.subscription;
                this.balances = data.balances;
            }

        },

        watch: {
            address: function (newVal, oldVal) { // watch it

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

                if (data !== null && data.result) {
                    this.subscription = data.subscription;
                    this.balances = data.balances;
                }

            },

            currency: function (newVal, oldVal) { // watch it

            }
        },

        methods:{

            formatMoneyNumber(n, decimals=0) {

                var number = parseInt(n/WebDollar.Applications.CoinsHelper.WEBD);
                var decimalNumber = this.getNumberRest(n);

                if(number<100) decimals=4;
                if(number>99999) decimals=0;

                return this.formatIntNumber(number)+'.'+this.getFirstDigits(decimalNumber,decimals);

            },

            formatIntNumber(number){

                return number.toString().replace(/./g, function(c, i, a) {
                    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                });

            },

            getNumberRest(number){

                return number % WebDollar.Applications.CoinsHelper.WEBD;

            },

            getFirstDigits(number,decimals){

                var decimalsVerifier = Math.pow(10,decimals);
                var newNumber = '';

                if(number<10){

                    newNumber='000'+number.toString();

                }else if(number<100){

                    newNumber='00'+number.toString();

                }else if(number<1000){

                    newNumber='0'+number.toString();

                }else if(number<10000){

                    newNumber=''+number.toString();

                }

                return newNumber.substring(0,decimals);

            }

        }

    }

</script>

<style>

    .balanceContent .fontColor{
        display: block;
    }

    .balanceContent .miningAddress{
        margin-top: 30px;
    }

    .balanceContent  .show-balance-span{
        font-size:20px;
    }

    .show-balance-span{
        display: inline-block;
        margin-right: 4px;
        color: #fec02c;
        vertical-align: top;
        margin-top: 0;
        text-align: center;
    }

    .balanceContent .show-balance-span{
        margin-top: 0;
        font-size: 14px;
    }

    @media only screen and (max-width : 831px) {

        .show-balance-span{
            margin-left: 5px;
            line-height: 48px;
        }

    }

    @media only screen and (max-width : 600px) {

        .walletAddress b{
            margin-top: 0!important;
        }

        .addressIdentityBox .show-balance-span{
            line-height: 40px;
            font-size: 14px;
        }

        .addressIdentityBox .show-balance-span svg{

            margin-top: 15px;
            display: block;

        }

    }
</style>