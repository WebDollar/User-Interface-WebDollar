<template>
    <div class="walletAddress" v-on:click.stop="handleTransferFunds">

        <img class="walletAddressImage" :src="this.getAddressPic">

        <b><ShowBalance :address="this.address" currency="0x01"/> WBD</b>

        <TransactionModal ref="refTransactionModal" :address="this.address" />

    </div>
</template>


<script>

    import TransactionModal from "./Transactions/Transaction.modal.vue"
    import ShowBalance from "components/Wallet/Address/Balance/ShowBalance.vue"

    export default{

        props:{
            address:{default:''},
        },

        components:{
            "TransactionModal":TransactionModal,
            "ShowBalance":ShowBalance,
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

    #allWalets .walletAddress{
        padding: 0!important;
        padding-right: 0;
        background-color: #272626;
        margin: 5px;
        width: 100%;
        cursor: pointer;
    }

    #allWalets .walletAddress:last-child{
        margin-bottom: 1px;
    }

    #allWalets .walletAddress img{
        height: 40px;
        display: inline-block;
        vertical-align: top;
    }

    #allWalets .walletAddress:hover{
        background-color: #000;
        transition: all .3s linear;
    }

    .walletAddress b{
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