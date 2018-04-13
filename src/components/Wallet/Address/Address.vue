<template>

    <div class="walletAddress hoverAddress">

        <div class="addressIdentityBox" v-on:click.stop="handleTransferFunds">
            <img class="walletAddressImage" :src="this.getAddressPic" >
            <icon v-if="this.isMiningAddress" class="btn actuallMiningAddress isImining" alt="Mining" text="Mining Address" icon="mining" style="display: inline-block" />

            <b class="fontColor">
                <show-balance :address="this.address" currency="0x01"/>
            </b>
            <b class="amountCurrency currencyName">WEBD</b>

            <div id="transactionAddressStatus">
                <icon v-show="Object.keys(this.sendingMoney).length !== 0" class="walletMiningStatus walletSendingImg" icon='chevron-double-up'></icon>
                <icon v-show="Object.keys(this.receivingMoney).length !== 0" class="walletMiningStatus walletReceivingImg" icon='chevron-double-down'></icon>
            </div>
        </div>

        <div class="actionsBox hoverAddress" :style="{marginBottom: this.opened ? this.walletButtonMarginOpened+'px': this.walletButtonMarginClosed+'px'}">
            <div class="addressButton" v-on:click.stop="handleExport">
                <icon class="btn" alt="Secure Wallet" text="Download Address" icon="download"/>
            </div>

            <div class="addressButton" v-on:click.stop="handleLock">
                <icon class="btn" alt="Secure Wallet" text="Lock Address" :icon="this.addressLocked ? 'lock-open' : 'lock-closed'" />
            </div>

            <div class="addressButton" v-on:click.stop="handleDelete">
                <icon class="btn" alt="Secure Wallet" text="Delete Address" icon="x" />
            </div>
        </div>

        <address-main-modal ref="refAddressMainModal" :address="this.address" :isMiningAddress="this.isMiningAddress" />
        <lock-modal ref="refLockModal" :address="this.address" />
        <delete-modal ref="refDeleteModal" :address="this.address" />

    </div>
</template>


<script>

    import Vue from "vue";
    import FileSaver from './../../../../node_modules/file-saver'
    import icon from "components/UI/icons/icon.vue"
    import AddressMainModal from "./Modals/Main-Modal/Address-main.modal.vue"
    import LockModal from "./Modals/Lock.modal.vue"
    import DeleteModal from "./Modals/Delete.modal.vue"
    import ShowBalance from "components/Wallet/Address/Balance/ShowBalance.vue"

    export default{

        //@onPendingTransactionsChanges
        props:{
            address:{default:''},
            isMiningAddress: {default: false}
        },

        components:{ AddressMainModal, LockModal, DeleteModal, ShowBalance, icon },

        computed: {

            getAddressPic(){
                return WebDollar.Blockchain.Wallet.getAddressPic(this.address);
            }

        },

        data: () => {
            return {
                addressLocked: false,

                sendingMoney: {},
                receivingMoney: {},

                subscriptionTransactions: null,

                transactions: {},
            }
        },

        async mounted(){

            if (typeof window === 'undefined') return;

            if (await WebDollar.Blockchain.Wallet.isAddressEncrypted(this.address).result){
                this.addressLocked = true;
            }

            //subscribe to transactions changes
            let data = WebDollar.Blockchain.Transactions.subscribeTransactionsChanges(this.address, (data)=>{

                if (data.transaction !== undefined)
                    this._addTransaction (data.transaction);
                else
                    Vue.delete(this.transactions, data.txId);

            });

            if (data !== null && data.result) {
                this.subscription = data.subscription;
                this._addTransactions(data.transactions);
            }

        },

        methods:{

            formatMoneyNumber(n, decimals=0) {
                return parseInt(n).toFixed(decimals).replace(/./g, function(c, i, a) {
                    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                });
            },

            handleTransferFunds(e){

                this.$refs['refAddressMainModal'].showModal(e);

            },

            async handleExport(e){

                let answer = await WebDollar.Blockchain.Wallet.exportAddressToJSON(this.address);

                if (answer.result){

                    let addressFile = new Blob([JSON.stringify(answer.data)], {type: "application/json;charset=utf-8"});
                    let fileName = "WEBD$" + WebDollar.Blockchain.Wallet.getUnencodedAddress(this.address).toString("hex") + ".webd";
                    FileSaver.saveAs(addressFile, fileName);

                } else {
                    alert(answer.message)
                }

            },

            handleLock(e){

                this.$refs['refLockModal'].showModal(e);

            },

            handleDelete(e){

                this.$refs['refDeleteModal'].showModal(e);

            },



            _addTransaction(transaction){
                // in case it is a new transaction
                Vue.set(this.transactions, transaction.txId, transaction);

                this._processTransactions();
            },

            _addTransactions(transactions){

                for (let key in transactions)
                    this._addTransaction(transactions[key]);

            },

            _processTransactions(){

                this.receivingMoney = {};
                this.sendingMoney = {};

                for (let key in this.transactions){

                    let transaction = this.transactions[key] ;

                    if (transaction.confirmed) {

                        Vue.delete(this.receivingMoney, key);
                        Vue.delete(this.sendingMoney, key);

                    } else {

                        // check if it is receiving or sending

                        let found = false;
                        transaction.from.addresses.forEach((address)=>{

                            if (!found && address.address === this.address)
                                found = true;
                        });

                        if (found) {
                            Vue.set(this.sendingMoney, key, transaction);
                            continue;
                        }

                        transaction.to.addresses.forEach((address)=>{

                            if (!found && address.address === this.address)
                                found = true;

                        });

                        if (found)
                            Vue.set(this.receivingMoney, key, transaction );
                    }
                }

                this.$emit("onPendingTransactionsChanges", this.receivingMoney, this.sendingMoney );

            }
        }

    }
</script>

<style>

    .isImining {
        -webkit-animation:spin 1s linear infinite;
        -moz-animation:spin 1s linear infinite;
        animation:spin 1s linear infinite;
    }
    @-moz-keyframes spin { 100% { -moz-transform: rotate(60deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(60deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(60deg); transform:rotate(60deg); } }

    .actuallMiningAddress{
        position: relative;
        margin-left: -45px;
        margin-top: -5px;
        margin-right: 30px;
    }

    #allWalets .walletAddress{
        padding: 0!important;
        width: 100%;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        margin: 15px 10px;
        display: grid;
        grid-template-columns: 1fr 126px;
        transition: all .3s linear;
    }

    #allWalets .walletAddress .addressIdentityBox{
        cursor: pointer;
    }

    #allWalets .walletAddress:last-child{
        margin-bottom: 1px;
    }

    #allWalets .walletAddress img{
        height: 40px;
        display: inline-block;
        vertical-align: top;
        border-radius: 100%;
        left: -px;
    }

    #allWalets .walletAddress:hover{
        margin: 15px 20px;
        background-color: #313131;
        transition: all .3s linear;
    }

    .walletAddress b{
        text-align: center;
        display: inline-block;
        color: #fcbd2d;
        line-height: 40px;
        padding-top: 1px;
        margin-left: 7px;
        font-size: 12px;
        vertical-align: top;
    }

    .walletAddress:hover .walletReceivingImg, .walletAddress:hover .walletSendingImg{
        display: none;
    }

    #transactionAddressStatus{
        display: inline-block;
        vertical-align: top;
    }

    .addressButton{
        display:inline-block;
        padding: 7px 12px;
        vertical-align: top;
        height: 27px;
        margin-right: -4px;
        cursor: pointer;
        transition: all .3s linear;
    }

    .addressButton:hover{
        background-color: #1f1f1f;
        transition: all .3s linear;
    }

    .actionsBox{
        float: right;
        text-align:right;
        margin-right: 20px;
        display: block!important;
    }

    .addressIdentityBox{
        display: inline-block;
    }

    .addressIdentityBox .fontColor svg{
        width: 20px;
        height: 20px;
        padding: 10px 0;
    }

    .hoverAddress:hover .actionsBox{
        display: inline-block;
    }

    .fontColor{
        color: #f9dc95!important;
        fill: #f9dc95;
    }

    .walletMiningStatus{
        margin-top: 17px;
        vertical-align: top;
    }

    .walletSendingImg{
        fill:#298bea!important;
        margin-left: 3px;
        margin-top: 7px;
        width: 10px;
        position: relative;
    }

    .currencyName{
        margin-left: 2px!important;
        margin-right: 4px!important;
        display: none!important;
    }

    .walletReceivingImg{
        fill:#219411!important;
        margin-left: 0;
        margin-top: 7px;
        width: 10px;
        position: relative;
        display: inline-block;
        vertical-align: top;
    }

    @media only screen and (max-width : 831px) {

        .actionsBox{
            display: block;
        }

        .addressButton{
            height: 22px;
            padding: 9px;
            margin: 0 5px;
        }

        .actuallMiningAddress{
            margin-left: -45px;
        }

        .walletReceivingImg{
            margin-top: 11px;
        }

        #allWalets .walletAddress{
            grid-template-columns: 1fr 200px;
        }

        .walletSendingImg, .walletReceivingImg{
            margin-top: 11px;
        }

        .addressIdentityBox .fontColor svg{
            width: 30px;
        }

        .currencyName {
            margin-left: 10px!important;
            margin-top: -6px;
        }

    }

    @media only screen and (max-width: 600px){

        .walletSendingImg, .walletReceivingImg{
            margin-top: 7px;
        }

        .amountCurrency{
            display: none!important;
        }

        .walletReceivingImg{
            display: none;
        }

        .addressButton{
            padding: 9px 10px;
        }

        #allWalets .walletAddress{
            grid-template-columns: 1fr 170px;
        }

        .addressIdentityBox .fontColor svg{
            padding: 0;
        }

        .walletAddress b{
            margin-top: 3px;
        }

        #allWalets .walletAddress .imageAndInput img {
            height: 38px !important;
        }
    }

    @media only screen and (max-width : 400px) {

        .addressButton{
            margin: 0;
        }

        .actionsBox .webdollarFont {
            width: 14px!important;
        }

        .walletSendingImg{
            display: none;
        }

        #allWalets .walletAddress{
            grid-template-columns: 1fr 130px;
        }

    }

</style>