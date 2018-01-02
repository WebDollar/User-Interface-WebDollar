<template>
    <div class="walletAdress" v-on:click.stop="handleTransferFunds">

        <img class="walletAddressImage" :src="this.getAddressPic">

        <b>0.0 WBD</b>

        <TransactionModal ref="refTransactionModal" :address="this.address" />

    </div>
</template>


<script>

    import TransactionModal from "./Transactions/Transaction.modal.vue"

    export default{

        props:{
            address:{default:''},
        },

        components:{
            "TransactionModal":TransactionModal,
        },

        computed: {
            getAddressPic(){
                return WebDollar.Blockchain.Wallet.getAddressPic(this.address);
            }
        },

        methods:{

            handleTransferFunds(e){

                this.$refs['refTransactionModal'].showModal(e);

            }

        }

    }
</script>








<style>
    .allWaletsContaier{

    }

    #allWalets .walletAdress{
        padding: 0!important;
        padding-right: 0;
        background-color: #272626;
        margin: 5px;
        width: 100%;
        cursor: pointer;
    }

    #allWalets .walletAdress:last-child{
        margin-bottom: 1px;
    }

    #allWalets .walletAdress img{
        height: 40px;
        display: inline-block;
        vertical-align: top;
    }

    #allWalets .walletAdress:hover{
        background-color: #000;
        transition: all .3s linear;
    }

    .walletAdress b{
        text-align: center;
        display: inline-block;
        color: #fddb0c;
        line-height: 40px;
        padding-top: 1px;
        margin-left: 10px;
        font-size: 12px;
        vertical-align: top;
    }
</style>