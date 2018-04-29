<template>

    <ul class="destinations">
        <li class="destinationElement transactionElement">

            <img :title="this.toAddress.address" @click="copyToClipboard" class="walletAddressImage" :src="this.getAddressPic" >

            <div class="money" title="Amount">
                <span class="amount">{{getAmount}}</span><span class="currency">WEBD</span>
            </div>

        </li>
    </ul>

</template>

<script>

    var Vue = require('vue/dist/vue.min.js');

    import Clipboard from '../../../../../../../../node_modules/v-clipboard/dist/index.min';

    Vue.use(Clipboard);

    export default{

        props:{
            toAddress: {default: null},
        },

        computed:{
            getAddressPic(){
                return WebDollar.Blockchain.Wallet.getAddressPic(this.toAddress.address);
            },

            getAmount(){
                return this.toAddress.amount / WebDollar.Applications.CoinsHelper.WEBD
            }

        },

        methods:{

            copyToClipboard(){
                this.$clipboard(this.toAddress.address);
            },

        }

    }

</script>

<style>

    .destinations img{
        cursor: pointer;
    }

</style>