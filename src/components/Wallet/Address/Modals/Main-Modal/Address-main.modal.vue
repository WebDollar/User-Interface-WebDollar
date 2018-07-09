<template>

    <div v-if="this.address !== null && this.address !== undefined">

        <modal title="Wallet Address" ref="refModal" class="addressMainModal">

            <div slot="content">

                <div class="twoColumns">

                    <div class="section">

                        <div >
                            <img class="walletAddressImage" :src="this.getAddressPic" >
                            <b style="color:gray" id="walletID">{{this.address.toString()}}</b>
                        </div>

                        <div @click="copyToClipboard" class="copyButton" :class=" this.clipboardText!='Copied' ? 'modalButton2' : 'modalButton2Success' ">
                            {{this.clipboardText}}
                        </div>

                    </div>

                    <div class="section balanceContent">

                        <div class="balanceText">

                            <div class="balanceTitle" title="Balance available to be spent">
                                Available Balance:
                            </div>
                            <div class="balanceAmount" title="Balance available to be spent">
                                <show-balance :address="this.address" currency="0x01"/>
                            </div>

                            <div class="balanceTitle" style="letter-spacing: 0.1px" title="The balance you will have at the next block mined by your pool">
                                Potential Balance:
                            </div>
                            <div class="balanceAmount" title="The balance you will have at the next block mined by your pool">
                                <show-balance :showPoolReward="isMiningAddress" :address="this.address" currency="0x01"/>
                            </div>

                        </div>

                        <div class="miningAddress" v-if="isMiningAddress">
                            You are mining on this Address
                        </div>
                        <div  v-if="!isMiningAddress" @click="handleSetAddress" class="modalButton2">
                            Mine on this address
                        </div>

                    </div>

                </div>

                <div class="addressActions">
                    <div @click="this.showTransfer" :class="[ this.partActivated === 'transfer' ? 'actionButton activeActionButton' : 'actionButton' ]">
                        Transfer
                    </div>
                    <div @click="this.showTransactions" :class="[ this.partActivated === 'transactions' ? 'actionButton activeActionButton' : 'actionButton' ]">
                        Transactions
                    </div>
                </div>

                <transfer :address="this.address" :style="{display: this.partActivated === 'transfer' ? 'block': 'none'}" @onTransferSuccess="this.handleTransferSuccess"/>

                <transactions :address="this.address" :style="{display: this.partActivated === 'transactions' ? 'block': 'none'}" />

                <buy :style="{display: this.partActivated === 'buy' ? 'block': 'none'}" />

                <sell :style="{display: this.partActivated === 'sell' ? 'block': 'none'}" />

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
    import Buy from "./parts/Buy.part.vue"
    import Sell from "./parts/Sell.part.vue"

    import Notification from "helpers/Notification.helpers"

    Vue.use(Clipboard);

    export default {

        props: {
            address: {default: null},
            isMiningAddress: {default: false},
        },

        components: {
            ShowBalance,
            Modal,
            Transactions,
            Transfer,
            Buy,
            Sell,
            icon,
            ShowPotentialBalance
        },

        data: () => {
            return {
                partActivated : 'none',

                clipboardText: 'Copy Address',
            }
        },

        computed:{
            getAddressPic(){
                return WebDollar.Blockchain.Wallet.getAddressPic(this.address);
            }
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
                this.$refs['refModal'].closeModal();
            },

            showModal(e) {
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
                this.showTransactions();
            }

        },

        mounted() {

            if (typeof window === 'undefined') return;

            Notification.setVueInstance(this);

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

</style>

