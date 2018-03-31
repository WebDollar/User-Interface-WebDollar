<template>

    <div v-if="this.address !== null && this.address !== undefined">

        <Modal title="Wallet Address" ref="refModal" class="addressMainModal">

            <div slot="content">

                <div class="twoColumns">

                    <div class="section">

                        <div >
                            <img class="walletAddressImage" :src="this.getAddressPic" >
                            <b style="color:gray" id="walletID" >{{this.address.toString()}}</b>
                        </div>

                        <div @click="copyToClipboard" :class=" this.clipboardText!='Copied' ? 'modalButton2' : 'modalButton2Success' ">
                            {{this.clipboardText}}
                        </div>

                    </div>

                    <div class="section">

                        <div class="balanceText" style="font-size: 20px">
                            Balance
                        </div>

                        <b class="fontColor">
                            <show-balance :address="this.address" currency="0x01"/>
                        </b>
                        <b class="amountCurrency">WEBD</b>

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
                    <div @click="this.showBuy" :class="[ this.partActivated === 'buy/sell' ? 'actionButton activeActionButton' : 'actionButton' ]">
                        Buy/Sell
                    </div>
                </div>

                <transfer :address="this.address" :style="{display: this.partActivated === 'transfer' ? 'block': 'none'}" @onTransferSuccess="this.handleTransferSuccess"/>

                <transactions :address="this.address" :style="{display: this.partActivated === 'transactions' ? 'block': 'none'}" />

                <buy :style="{display: this.partActivated === 'buy' ? 'block': 'none'}" />

                <sell :style="{display: this.partActivated === 'sell' ? 'block': 'none'}" />

            </div>


        </Modal>

    </div>

</template>

<script>

    var Vue = require('vue/dist/vue.min.js');

    import Modal from "components/UI/modal/Modal.vue"
    import Clipboard from '../../../../../../node_modules/v-clipboard/dist/index.min'
    import ShowBalance from "components/Wallet/Address/Balance/ShowBalance.vue"
    import icon from "components/UI/icons/icon.vue"

    import Transactions from "./parts/Transactions/Transactions.part.vue"
    import Transfer from "./parts/Transfer.part.vue"
    import Buy from "./parts/Buy.part.vue"
    import Sell from "./parts/Sell.part.vue"

    Vue.use(Clipboard)

    export default {

        props: {
            address: {default: null},
            isMiningAddress: {default: false},
        },

        components: {
            ShowBalance,
            "Modal": Modal,
            "show-balance":ShowBalance,
            "transactions": Transactions,
            "transfer": Transfer,
            "buy": Buy,
            "sell": Sell,
            "icon":icon,
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
            },

            handleTransferSuccess(){
                this.showTransactions();
            }

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
    }

    .addressMainModal .modifyPadding{
        padding: 0!important;
    }

    .balanceText{
        margin-top: 15px;
    }

</style>

