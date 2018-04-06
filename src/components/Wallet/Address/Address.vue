<template>

    <div class="walletAddress hoverAddress">

        <div class="addressIdentityBox" v-on:click.stop="handleTransferFunds">
            <img class="walletAddressImage" :src="this.getAddressPic" >
            <icon v-if="this.isMiningAddress" class="btn actuallMiningAddress" alt="Mining" text="Mining Address" icon="mining" style="display: inline-block" />

            <b class="fontColor">
                <show-balance :address="this.address" currency="0x01"/>
            </b>
            <b class="amountCurrency">WEBD</b>

            <div id="transactionAddressStatus">
                <icon v-show="Object.keys(this.sendingMoney).length !== 0" class="walletMiningStatus walletSendingImg" icon='upload'></icon>
                <icon v-show="Object.keys(this.receivingMoney).length !== 0" class="walletMiningStatus walletReceivingImg" icon='download'></icon>
            </div>
        </div>

        <div class="actionsBox hoverAddress" :style="{marginBottom: this.opened ? this.walletButtonMarginOpened+'px': this.walletButtonMarginClosed+'px'}">
            <div class="addressButton" v-on:click.stop="handleExport">
                <icon class="btn" alt="Secure Wallet" text="Download Address" icon="download" />
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
        grid-template-columns: 1fr 150px;
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
        left: -1px;
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
        margin-right: 10px;
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
        margin-right: 20px;
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
        margin-left: 8px;
        margin-top: 7px;
        position: relative;
    }

    .walletReceivingImg{
        fill:#219411!important;
        margin-left: 2px;
        margin-top: 9px;
        position: relative;
        display: inline-block;
        vertical-align: top;
    }

    @media only screen and (max-width : 831px) {

        .actionsBox{
            display: block;
        }

        .addressButton{
            padding: 17px 14px;
            margin: 0 5px;
        }

        .actuallMiningAddress{
            margin-left: -45px;
        }

    }

    @media only screen and (max-width: 600px){

        .amountCurrency{
            display: none!important;
        }



    }

    @media only screen and (max-width : 400px) {

        .addressButton{
            margin: 0;
        }

        .webdollarFont {
            width: 16px!important;
        }

    }

</style>