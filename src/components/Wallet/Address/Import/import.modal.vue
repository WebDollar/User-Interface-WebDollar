<template>

    <div>

        <Modal title="Wallet Address" ref="refModal">

            <!--<div slot="content">-->

                <!--<div class="twoColums">-->

                    <!--<div class="section">-->

                        <!--<div style="font-size: 20px">-->
                            <!--Address-->
                        <!--</div>-->

                        <!--<b style="color:gray" id="walletID" >{{this.address.toString()}}</b>-->

                        <!--<div @click="copyToClipboard" :class=" this.clipboardText!='Copied' ? 'copyToClipboard' : 'copyToClipboardSuccess' ">-->
                            <!--{{this.clipboardText}}-->
                        <!--</div>-->

                    <!--</div>-->

                    <!--<div class="section">-->

                        <!--<div style="font-size: 20px">-->
                            <!--Balance-->
                        <!--</div>-->

                        <!--<b class="ballance" style="color:gray"> <ShowBalance :address="this.address" currency="0x01"/>WEBD</b>-->

                    <!--</div>-->

                <!--</div>-->

                <!--<div class="adressActions">-->
                    <!--<div @click="this.showTransfer" :class="[ this.isTransfer ? 'actionButton activeActionButton' : 'actionButton' ]">-->
                        <!--Transfer-->
                    <!--</div>-->
                    <!--<div @click="this.showBuy" :class="[ this.isBuy ? 'actionButton activeActionButton' : 'actionButton' ]">-->
                        <!--Buy-->
                    <!--</div>-->
                    <!--<div @click="this.showSell" :class="[ this.isSell ? 'actionButton activeActionButton' : 'actionButton' ]">-->
                        <!--Sell-->
                    <!--</div>-->
                    <!--<div @click="this.showTransactions" :class="[ this.isTransactionList ? 'actionButton activeActionButton' : 'actionButton' ]">-->
                        <!--Transactions-->
                    <!--</div>-->
                <!--</div>-->

                <!--<form class="transfer" :style="{display: this.isTransfer ? 'block': 'none'}">-->

                    <!--<p class="title">Transfer WEBD</p>-->

                    <!--<input class="adress" placeholder="Recipient Adress"/>-->
                    <!--&lt;!&ndash;{{this.toAddress||''.toString() }}&ndash;&gt;-->

                    <!--<input class="amount" placeholder="WEBD Amount"/>-->
                    <!--&lt;!&ndash;{{this.toAmount||0.0.toString() }}&ndash;&gt;-->

                    <!--<button type="submit" class="button">-->
                        <!--SEND WEBD-->
                    <!--</button>-->
                <!--</form>-->

                <!--<form class="buy" :style="{display: this.isBuy ? 'block': 'none'}">-->

                    <!--<p class="title">Temporary unavailable</p>-->

                <!--</form>-->

                <!--<form class="sell" :style="{display: this.isSell ? 'block': 'none'}">-->

                    <!--<p class="title">Temporary unavailable</p>-->

                <!--</form>-->

            <!--</div>-->


        </Modal>

    </div>

</template>

<script>
    var Vue = require('vue')

    import ImExModal from "../Import/import.modal.vue"
    import Clipboard from './../../../../../node_modules/v-clipboard'

    Vue.use(Clipboard)

    export default {

        props: {

            address: {default: null},
            toAddress: {default: null},
            toAmount: {default: 0.0},
        },

        components: {
            "ImExModal":ImExModal,
        },

        data: () => {
            return {
                isTransfer: false,
                isSell: false,
                isBuy: false,
                isTransactionList: false,
                clipboardText: 'Copy to Clipboard',
            }
        },

        methods: {

            showTransfer() {
                this.isTransfer = true;
                this.isSell = false;
                this.isBuy = false;
                this.isTransactionList=false;
            },
            showBuy() {
                this.isTransfer = false;
                this.isSell = false;
                this.isBuy = true;
                this.isTransactionList = false;
            },
            showSell() {
                this.isTransfer = false;
                this.isSell = true;
                this.isBuy = false;
                this.isTransactionList = false;
            },
            showTransactions(){
                this.isTransfer = false;
                this.isSell = false;
                this.isBuy = false;
                this.isTransactionList = true;
            },
            closeModal() {
                this.$refs['refModal'].closeModal();
            },

            showModal(e) {
                if (this.$refs['refModal'].modalOpened === false){
                    this.$refs['refModal'].showModal();
                }
            },
            copyToClipboard(){
                this.clipboardText = 'Copied';
                this.$clipboard(this.address)
            }

        },

        mounted() {

            this.clipboardText = 'Copy to Clipboard';

            if (typeof window === 'undefined') return;

        },

    }

</script>

