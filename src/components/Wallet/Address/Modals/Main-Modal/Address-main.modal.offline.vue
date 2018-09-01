<template>

    <div v-if="this.address !== null && this.address !== undefined">

        <modal title="Wallet Address" ref="refModal" class="addressMainModal">

            <div slot="content">

                <transfer :address="this.address" @onTransferSuccess="this.handleTransferSuccess" @closeModal="this.closeModal" :offlineTransaction="true"/>

            </div>


        </modal>

    </div>

</template>

<script>

    var Vue = require('vue/dist/vue.min.js');

    import Modal from "components/UI/modal/Modal.vue"
    import Clipboard from '../../../../../../node_modules/v-clipboard/dist/index.min'
    import ShowBalance from "components/Wallet/Address/Balance/Show-Balance.vue"
    import ShowPotentialBalance from "components/Wallet/Address/Balance/Balances/Show-Sum-Balances.vue"
    import icon from "components/UI/icons/icon.vue"

    import Transactions from "./parts/Transactions/Transactions.part.vue"
    import Transfer from "./parts/Transfer.part.vue"

    import Notification from "helpers/Notification.helpers"

    Vue.use(Clipboard);

    export default {

        props: {
            address: {default: null},
        },

        components: {
            ShowBalance,
            Modal,
            Transactions,
            Transfer,
            icon,
            ShowPotentialBalance
        },

        methods: {

            showTransfer() {
                this.partActivated = "transfer";
            },

            showBuy() {
                this.partActivated = "buy/sell";
            },
            showTransactions(){
                this.partActivated = "transactions";
            },

            closeModal() {
                this.offlineTransaction=false;
                this.$refs['refModal'].closeModal();
            },

            showModal() {
                if (this.$refs['refModal'].modalOpened === false){
                    this.$refs['refModal'].showModal();
                }
                this.clipboardText= 'Copy Address';
            },
            copyToClipboard(){
                this.clipboardText = 'Copied';
                this.$clipboard(this.address);
            },

            handleSetAddress(){
                WebDollar.Blockchain.Mining.minerAddress = this.address;
                Notification.addAlert(undefined, "success", "Mining Address Changed", "You're mining now on " + this.address ,5000);
            },

            handleTransferSuccess(){
                this.closeModal();
            },

        },

        mounted() {

            if (typeof window === 'undefined') return;


        },

    }

</script>

<style>
    .miningAddress{
        display: block!important;
        font-size: 12px;
        line-height: 30px;
        padding-top: 7px;
    }

    .addressMainModal .modifyPadding{
        padding: 0!important;
    }

    .balanceText{
        display: grid;
        grid-template-columns: 1fr 100px;
        grid-row-gap: 10px;
        padding-bottom: 24px;
    }

    .balanceAmount{
        font-size: 14px;
        text-align: left;
    }

    .balanceContent, .copyButton, .actionButton, .headerModal, .transferList{
        -webkit-user-select: none;  /* Chrome all / Safari all */
        -moz-user-select: none;     /* Firefox all */
        -ms-user-select: none;      /* IE 10+ */
        user-select: none;
    }

    .balanceContent{
        padding: 45px 10px 20px 10px!important
    }

    .balanceContent svg{
        width: 20px;
        height: 20px;
        padding: 0!important;
    }

    .balanceTitle{
        text-align: right;
        font-size: 14px;
        padding-right: 10px;
    }

    .balanceAmount .balanceContent{
        padding: 0;
    }

    @media (max-width: 1000px){

        .balanceText{
            grid-template-columns: 1fr;
        }

    }

    @media (max-width: 600px){

        .balanceContent{
            padding: 10px!important
        }
    }

</style>

