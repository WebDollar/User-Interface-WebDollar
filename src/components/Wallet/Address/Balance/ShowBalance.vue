<template>

    <div style="display: inline-block">

        <loading-spinner class="fontColor" v-if="!this.loaded" />
        <div class="show-balance-span" v-if="this.loaded" >
            {{ this.computePrice }}
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
              subscription: null,
              loaded: false,
            }
        },

        computed:{

            computePrice(){

                if (this.balances === null || this.balances === undefined || !this.balances.hasOwnProperty(this.currency)) return 0;

                return this.formatMoneyNumber(Math.round(this.balances[this.currency] * 1000)/1000);
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

            if (data !== null) {
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

                if (data !== null) {
                    this.subscription = data.subscription;
                    this.balances = data.balances;
                }

            },

            currency: function (newVal, oldVal) { // watch it

            }
        },

        methods:{

            formatMoneyNumber(n, decimals=0) {
                return n.toFixed(decimals).replace(/./g, function(c, i, a) {
                    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                });
            }

        }

    }

</script>

<style>
    .show-balance-span{
        display: inline-block;
        margin-right: 4px;
        color: #fec02c;
        vertical-align: top;
        margin-top: 0;
        text-align: center;
    }

    @media only screen and (max-width : 831px) {

        .show-balance-span{
            margin-left: 5px;
        }

    }
</style>