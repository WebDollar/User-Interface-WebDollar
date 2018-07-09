<template>

    <div style="display: inline-block">

        <loading-spinner class="fontColor" v-if="!this.loaded" />

        <div class="show-balance-span" v-if="this.loaded" >
            {{ this.formatMoneyNumber( (this.sum + (this.showPoolReward === true ? this.computePoolReward : 0 )) ,2)}}
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

        props: ['addresses', 'currency', 'showPoolReward'],

        data(){
          return {
              sum: 0,

              subscription: null,
              loaded: WebDollar.Blockchain.loaded||false,

              minerPoolTotalReward: 0,
              minerPoolConfirmedReward: 0,

              minerPoolReferralTotalReward: 0,
              minerPoolReferralConfirmedReward: 0,
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
                this.minerPoolTotalReward = WebDollar.Blockchain.MinerPoolManagement.minerPoolReward.totalReward;
                this.minerPoolConfirmedReward = WebDollar.Blockchain.MinerPoolManagement.minerPoolReward.confirmedReward;

                this.minerPoolReferralTotalReward = WebDollar.Blockchain.MinerPoolManagement.minerPoolReward.totalReferralReward;
                this.minerPoolReferralConfirmedReward = WebDollar.Blockchain.MinerPoolManagement.minerPoolReward.confirmedReferralReward;
            }

            WebDollar.StatusEvents.on("miner-pool/total-reward", data => this.minerPoolTotalReward = data.totalReward );
            WebDollar.StatusEvents.on("miner-pool/confirmed-reward", data =>  this.minerPoolConfirmedReward = data.confirmedReward );

            WebDollar.StatusEvents.on("miner-pool/referral-total-reward", data=>  this.minerPoolReferralTotalReward = data.referralTotalReward );
            WebDollar.StatusEvents.on("miner-pool/referral-confirmed-reward", data=>  this.minerPoolReferralConfirmedReward = data.referralConfirmedReward );

        },

        methods:{

            refreshSum(addresses, currency){

                let newSum = 0;

                //it should use BigNumber as math...

                if (addresses === undefined || addresses === null) return ;

                for (let index in addresses){

                    if (addresses[index].balances !== undefined && addresses[index].balances !== null && addresses[index].balances[currency] !== undefined)
                        newSum += parseFloat( addresses[index].balances[currency]);
                }

                this.sum = newSum;

                if (this.sum!==0){

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

            },

            showPoolReward: function (newVal, oldVal) { // watch it

                this.refreshSum(this.addresses, this.currency);

            }

        },

        computed:{

            computePoolReward(){

                return this.minerPoolTotalReward + this.minerPoolConfirmedReward + this.minerPoolReferralTotalReward + this.minerPoolReferralConfirmedReward;

            }

        },


    }

</script>

<style>

    .balanceContent .fontColor{
        display: block;
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