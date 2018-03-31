<template>

    <ul class="destinations">
        <li class="destinationElement">

            <img class="walletAddressImage" :src="this.getAddressPic" >

            <div class="money" title="Amount">
                <span class="amount">-{{this.fromAddress.amount}}</span><span class="currency">WEBD</span>
            </div>

        </li>
    </ul>

</template>

<script>

    export default{

        props:{
            fromAddress: {default: null}
        },

        computed:{
            getAddressPic(){
                return WebDollar.Blockchain.Wallet.getAddressPic(this.fromAddress.address);
            }
        },

    }

</script>