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

    #allWalets .walletAddress{
        padding: 0!important;
        padding-right: 0;
        width: 100%;
        cursor: pointer;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        margin: 15px 10px;
        transition: all .3s linear;
    }

    #allWalets .walletAddress:last-child{
        margin-bottom: 1px;
    }

    #allWalets .walletAddress img{
        height: 40px;
        display: inline-block;
        vertical-align: top;
        border-radius: 100%;
    }

    #allWalets .walletAddress:hover{
        margin: 15px 20px;
        background-color: #313131;
        transition: all .3s linear;
    }

    .walletAddress b{
        text-align: center;
        display: inline-block;
        color: #fddb0c;
        line-height: 40px;
        padding-top: 1px;
        margin-left: 7px;
        font-size: 12px;
        vertical-align: top;
    }

</style>