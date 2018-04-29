<template>

    <ul class="destinations">
        <li class="destinationElement transactionElement">

            <img :title="this.fromAddress.address" @click="copyToClipboard" class="walletAddressImage" :src="this.getAddressPic" >

            <div class="money" title="Amount">
                <span class="amount">-{{ getAmount }}</span><span class="currency">WEBD</span>
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
            fromAddress: {default: null},
        },

        computed:{
            getAddressPic(){
                return WebDollar.Blockchain.Wallet.getAddressPic(this.fromAddress.address);
            },

            getAmount(){
                return this.fromAddress.amount / WebDollar.Applications.CoinsHelper.WEBD
            }
        },

        methods:{

            copyToClipboard(){
                this.$clipboard(this.fromAddress.address);
            },

        }

    }

</script>

<style>

    .destinations img{
        cursor: pointer;
    }

</style>