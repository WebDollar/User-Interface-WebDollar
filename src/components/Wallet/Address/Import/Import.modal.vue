<template>

    <div>

        <Modal title="Wallet Address" ref="refModal">

            <div slot="content">

                <div class="walletAdress">

                    Adressg qdsgdf qwgdw f qwdf wev w cd sca sd

                </div>

                <div class="twoColums">

                    <div class="section">

                        <div @click="" class="copyToClipboard">
                            Import
                        </div>

                    </div>

                    <div class="section">

                        <div @click="" class="copyToClipboard">
                            Export
                        </div>

                    </div>

                </div>

            </div>

        </Modal>

    </div>

</template>

<script>
    var Vue = require('vue')
    import Modal from "components/UI/modal/Modal.vue"

    import Clipboard from './../../../../../node_modules/v-clipboard'

    Vue.use(Clipboard)

    export default {

        props: {

            address: {default: null},
            toAddress: {default: null},
            toAmount: {default: 0.0},
        },

        components: {
            "Modal":Modal,
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

                console.log("teeest showModal", this.$refs['refModal']);
                console.log("teeest showModal", this.$refs['refModal'].modalOpened);

                if (this.$refs['refModal'].modalOpened === false){
                    console.log("shooow modal");
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

<style>
    .walletAdress{

    }
</style>

