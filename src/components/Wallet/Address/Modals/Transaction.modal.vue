<template>

    <div v-if="this.address !== null && this.address !== undefined">

        <Modal title="Wallet Address" ref="refModal">

            <div slot="content">

                <div class="twoColums">

                    <div class="section">

                        <div style="font-size: 20px">
                            Address
                        </div>

                        <b style="color:gray" id="walletID" >{{this.address.toString()}}</b>

                        <div @click="copyToClipboard" :class=" this.clipboardText!='Copied' ? 'copyToClipboard' : 'copyToClipboardSuccess' ">
                            {{this.clipboardText}}
                        </div>

                    </div>

                    <div class="section">

                        <div style="font-size: 20px">
                            Balance
                        </div>

                        <b class="ballance" style="color:gray"> <ShowBalance :address="this.address" currency="0x01"/>WEBD</b>

                    </div>

                </div>

                <div class="adressActions">
                    <div @click="this.showTransfer" :class="[ this.isTransfer ? 'actionButton activeActionButton' : 'actionButton' ]">
                        Transfer
                    </div>
                    <div @click="this.showBuy" :class="[ this.isBuy ? 'actionButton activeActionButton' : 'actionButton' ]">
                        Buy
                    </div>
                    <div @click="this.showSell" :class="[ this.isSell ? 'actionButton activeActionButton' : 'actionButton' ]">
                        Sell
                    </div>
                    <div @click="this.showTransactions" :class="[ this.isTransactionList ? 'actionButton activeActionButton' : 'actionButton' ]">
                        Transactions
                    </div>
                </div>

                <form class="transfer" :style="{display: this.isTransfer ? 'block': 'none'}">

                    <p class="title">Transfer WEBD</p>

                    <input class="adress" placeholder="Recipient Adress"/>
                    <!--{{this.toAddress||''.toString() }}-->

                    <input class="amount" placeholder="WEBD Amount"/>
                    <!--{{this.toAmount||0.0.toString() }}-->

                    <button type="submit" class="button">
                        SEND WEBD
                    </button>
                </form>

                <div class="transferList" :style="{display: this.isTransactionList ? 'block': 'none'}">

                    <!--<div class="header">-->

                    <!--<span class="headerElement">-->
                    <!--Adress Source-->
                    <!--</span>-->

                    <!--<span class="headerElement">-->
                    <!--Destination-->
                    <!--</span>-->

                    <!--<div class="headerElement">-->
                    <!--Ammount & currency-->
                    <!--</div>-->

                    <!--</div>-->

                    <ul class="transferListContainer">

                        <li class="transferListElement">

                            <span class="source" title="Adress Source"> dadsa dasdasdasdas das das</span>

                            <ul class="destinations">
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">dsad dsaas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">ds dsad a dasadas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                            </ul>

                        </li>
                        <li class="transferListElement pairListElement">

                            <span class="source" title="Adress Source"> dadsa dasdasdasdas das das</span>

                            <ul class="destinations">
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">dsad dsaas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">ds dsad a dasadas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                            </ul>

                        </li>
                        <li class="transferListElement">

                            <span class="source" title="Adress Source"> dadsa dasdasdasdas das das</span>

                            <ul class="destinations">
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">dsad dsaas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">ds dsad a dasadas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                            </ul>

                        </li>
                        <li class="transferListElement pairListElement">

                            <span class="source" title="Adress Source"> dadsa dasdasdasdas das das</span>

                            <ul class="destinations">
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">dsad dsaas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">ds dsad a dasadas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                            </ul>

                        </li>
                        <li class="transferListElement">

                            <span class="source" title="Adress Source"> dadsa dasdasdasdas das das</span>

                            <ul class="destinations">
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">dsad dsaas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">ds dsad a dasadas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                            </ul>

                        </li>
                        <li class="transferListElement pairListElement">

                            <span class="source" title="Adress Source"> dadsa dasdasdasdas das das</span>

                            <ul class="destinations">
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">dsad dsaas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">ds dsad a dasadas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                            </ul>

                        </li>
                        <li class="transferListElement">

                            <span class="source" title="Adress Source"> dadsa dasdasdasdas das das</span>

                            <ul class="destinations">
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">dsad dsaas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                                <li class="destinationElement">
                                    <span class="destinationAdress" title="Adress Destination">ds dsad a dasadas dasd as das dasd as</span>
                                    <div class="money" title="Ammount & Currency">
                                        <span class="ammount">20</span><span class="currency">WEBD</span>
                                    </div>
                                </li>
                            </ul>

                        </li>

                    </ul>

                </div>

                <form class="buy" :style="{display: this.isBuy ? 'block': 'none'}">

                    <p class="title">Temporary unavailable</p>

                </form>

                <form class="sell" :style="{display: this.isSell ? 'block': 'none'}">

                    <p class="title">Temporary unavailable</p>

                </form>

            </div>


        </Modal>

    </div>

</template>

<script>
    var Vue = require('vue/dist/vue.min.js');

    import Modal from "components/UI/modal/Modal.vue"
    import Clipboard from './../../../../../node_modules/v-clipboard'
    import ShowBalance from "components/Wallet/Address/Balance/ShowBalance.vue"

    Vue.use(Clipboard)

    export default {

        props: {

            address: {default: null},
            toAddress: {default: null},
            toAmount: {default: 0.0},
        },

        components: {
            "Modal": Modal,
            "ShowBalance":ShowBalance,
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

