<template>

    <div style="display: inline-block">

        <loading-spinner class="fontColor" v-if="!this.loaded" />

        <div class="show-balance-span" v-if="this.loaded" >
            {{ this.formatMoneyNumber( (this.sum + (this.showPoolReward === true ?  this.computePoolReward : 0)) ,2)}}
        </div>

    </div>

</template>

<script>

    import LoadingSpinner from "components/UI/elements/Loading-Spinner.vue"
    import BrowserHelpers from "helpers/Browser.helpers"

    export default{

        components:{
            LoadingSpinner,
        },

        props: ['address', 'currency', 'showPoolReward'],

        data(){
          return {
              sum: 0,

              subscription: null,
              loaded: WebDollar.Blockchain.loaded||false,

              minerPoolPotentialReward: 0,
              minerPoolConfirmedReward: 0,
            }
        },

        mounted(){

            if (typeof window === "undefined") return;

            WebDollar.StatusEvents.emitter.on("blockchain/status", (data)=>{

                if (data.message === "Blockchain Ready to Mine")
                    this.loaded = true;

            });

            //pool reward

            if (WebDollar.Blockchain.MinerPoolManagement !== undefined) {
                this.minerPoolPotentialReward = WebDollar.Blockchain.MinerPoolManagement.minerPoolReward.potentialReward / 10000;
                this.minerPoolConfirmedReward = WebDollar.Blockchain.MinerPoolManagement.minerPoolReward.confirmedReward / 10000;
            }

            WebDollar.StatusEvents.on("miner-pool/potential-reward", (data)=>{
                this.minerPoolPotentialReward = data.potentialReward/10000;
            });

            WebDollar.StatusEvents.on("miner-pool/confirmed-reward", (data)=>{
                this.minerPoolConfirmedReward = data.confirmedReward/10000;
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

            formatMoneyNumber: BrowserHelpers.formatMoneyNumber,

        },

        watch: {
            addresses: function (newVal, oldVal) { // watch it

                this.refreshSum(newVal, this.currency);

            },

            currency: function (newVal, oldVal) { // watch it

                this.refreshSum(this.addresses, newVal);

            }
        },

        computed:{

            computePoolReward(){

                return this.minerPoolPotentialReward + this.minerPoolConfirmedReward;

            }

        },


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