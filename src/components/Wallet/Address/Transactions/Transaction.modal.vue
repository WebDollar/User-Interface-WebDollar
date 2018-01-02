<!--<template>-->

    <!--<div v-if="this.address !== null && this.address !== undefined">-->

        <!--<Modal title="Wallet Adress" ref="refModal">-->

            <!--<div slot="content">-->

                <!--<div class="twoColums">-->

                    <!--<div class="section">-->

                        <!--<div style="font-size: 20px">-->
                            <!--Address-->
                        <!--</div>-->

                        <!--<b style="color:gray" id="walletID" >{{this.address.toString()}}</b>-->

                        <!--<div ref="clipboardCopyAddress" class="copyToClipboard"   >-->
                            <!--Copy to Clipboard-->
                        <!--</div>-->

                    <!--</div>-->

                    <!--<div class="section">-->

                        <!--<div style="font-size: 20px">-->
                            <!--Balance-->
                        <!--</div>-->

                        <!--<b class="ballance" style="color:gray">0.0 WEBD</b>-->

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
                <!--</div>-->

                <!--<form class="transfer" :style="{display: this.isTransfer ? 'block': 'none'}">-->

                    <!--<p class="title">Transfer WBD</p>-->

                    <!--<input class="adress" placeholder="Recipient Adress"/>-->
                    <!--&lt;!&ndash;{{this.toAddress||''.toString() }}&ndash;&gt;-->

                    <!--<input class="amount" placeholder="WBD Amount"/>-->
                    <!--&lt;!&ndash;{{this.toAmount||0.0.toString() }}&ndash;&gt;-->

                    <!--<button type="submit" class="button">-->
                        <!--SEND WBD-->
                    <!--</button>-->
                <!--</form>-->

                <!--<form class="buy" :style="{display: this.isBuy ? 'block': 'none'}">-->

                    <!--<p class="title">Buy WBD</p>-->

                    <!--<input class="adress" placeholder="Recipient Adress"/>-->
                    <!--&lt;!&ndash;{{this.toAddress||''.toString() }}&ndash;&gt;-->

                    <!--<input class="amount" placeholder="WBD Amount"/>-->
                    <!--&lt;!&ndash;{{this.toAmount||0.0.toString() }}&ndash;&gt;-->

                    <!--<button type="submit" class="button">-->
                        <!--SEND WBD-->
                    <!--</button>-->
                <!--</form>-->

                <!--<form class="sell" :style="{display: this.isSell ? 'block': 'none'}">-->

                    <!--<p class="title">Sell WBD</p>-->

                    <!--<input class="adress" placeholder="Recipient Adress"/>-->
                    <!--&lt;!&ndash;{{this.toAddress||''.toString() }}&ndash;&gt;-->

                    <!--<input class="amount" placeholder="WBD Amount"/>-->
                    <!--&lt;!&ndash;{{this.toAmount||0.0.toString() }}&ndash;&gt;-->

                    <!--<button type="submit" class="button">-->
                        <!--SEND WBD-->
                    <!--</button>-->
                <!--</form>-->

            <!--</div>-->


        <!--</Modal>-->

    <!--</div>-->

<!--</template>-->

<!--<script>-->

    <!--import Modal from "components/UI/modal/Modal.vue"-->
    <!--const Clipboard = require('clipboard')-->

    <!--export default{-->

        <!--props:{-->

            <!--address: {default: null},-->
            <!--toAddress: {default: null},-->
            <!--toAmount: {default: 0.0},-->
        <!--},-->

        <!--components:{-->
            <!--"Modal":Modal,-->
        <!--},-->

        <!--data:  () => {-->
            <!--return {-->
                <!--isTransfer: false,-->
                <!--isSell: false,-->
                <!--isBuy: false,-->
            <!--}-->
        <!--},-->

        <!--methods:{-->

            <!--showTransfer(){-->
                <!--this.isTransfer = true;-->
                <!--this.isSell = false;-->
                <!--this.isBuy = false;-->
            <!--},-->
            <!--showBuy(){-->
                <!--this.isTransfer = false;-->
                <!--this.isSell = false;-->
                <!--this.isBuy = true;-->
            <!--},-->
            <!--showSell(){-->
                <!--this.isTransfer = false;-->
                <!--this.isSell = true;-->
                <!--this.isBuy = false;-->
            <!--},-->
            <!--closeModal(){-->
                <!--this.$refs['refModal'].closeModal();-->
            <!--},-->

            <!--showModal(){-->
                <!--this.$refs['refModal'].showModal();-->
            <!--},-->

            <!--addressClipboardCopiedSuccessfully(e){-->
                <!--console.log(e);-->
            <!--}-->

        <!--},-->

        <!--mounted(){-->

            <!--if (typeof window === 'undefined') return ;-->

            <!--var clipboard = new Clipboard(this.$refs['clipboardCopyAddress'], {-->
                <!--text: () => {-->
                    <!--return this.address;-->
                <!--}-->
            <!--});-->


            <!--clipboard.on('success', (e) => {-->
                <!--this.addressClipboardCopiedSuccessfully(e);-->
            <!--});-->
            <!--clipboard.on('error', (e) => {-->
                <!--console.log(e);-->
            <!--});-->
        <!--},-->



    <!--}-->

<!--</script>-->

