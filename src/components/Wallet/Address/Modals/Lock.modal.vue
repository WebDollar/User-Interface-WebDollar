<template>

    <div>

        <Modal title="Delete Adress" ref="refModal">

            <div slot="content">

                <div class="descriptionText">

                    Set your password

                </div>

                <div >

                    <input class="inputDeleteModal"/>

                    <div @click="" class="modalButton">
                        Save
                    </div>

                </div>

            </div>

        </Modal>

    </div>

</template>

<script>
    var Vue = require('vue/dist/vue.min.js');
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
    .descriptionText{

        color: #bdbdbd;
        padding: 30px 10px;

    }

    .inputDeleteModal{
        width: 90%;
        background-color: #2d2d2d;
        border: solid 1px #565656;
        margin: 0 auto;
        left: 0;
        right: 0;
        color: #ccc;
        padding: 7px;
        font-weight: 100;
        text-align: center;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .modalButton{
        background-color: #131313;
        color: #969696;
        font-size: 12px;
        width: 140px;
        border: solid 1px #5f5d5d;
        font-weight: bolder;
        border-radius: 5px;
        letter-spacing: 2px;
        text-transform: uppercase;
        padding: 8px;
        margin: 0 auto;
        margin-bottom: 20px;
        transition: all .3s linear;
    }

    .modalButton:hover{
        background-color: #f6ba2c;
        color: #000000;
        transition: all .3s linear;
    }
</style>
