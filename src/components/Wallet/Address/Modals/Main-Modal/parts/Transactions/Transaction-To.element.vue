<template>

    <ul class="destinations">
        <li class="destinationElement transactionElement">

            <img class="walletAddressImage" :src="this.getAddressPic" >

            <div class="money" title="Amount">
                <span class="amount">{{getAmount}}</span><span class="currency">WEBD</span>
            </div>

        </li>
    </ul>

</template>

<script>

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

    }

</script>