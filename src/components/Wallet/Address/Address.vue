<template>
    <div class="walletAddress hoverAdress">

        <div class="adressIdentityBox" v-on:click.stop="handleTransferFunds">
            <img class="walletAddressImage" :src="this.getAddressPic" >

            <b><ShowBalance :address="this.address" currency="0x01"/> WEBD</b>
        </div>

        <div class="actionsBox hoverAdress" :style="{marginBottom: this.opened ? this.walletButtonMarginOpened+'px': this.walletButtonMarginClosed+'px'}">
            <div class="addressButton" v-on:click.stop="handleExport">
                <icon class="btn" alt="Secure Wallet" text="Secure Wallet" icon="download" />
            </div>

            <div class="addressButton" v-on:click.stop="handleLock">
                <icon class="btn" alt="Secure Wallet" text="Secure Wallet" icon="lock-open" />
            </div>

            <div class="addressButton" v-on:click.stop="handleDelete">
                <icon class="btn" alt="Secure Wallet" text="Secure Wallet" icon="x" />
            </div>
        </div>

        <TransactionModal ref="refTransactionModal" :address="this.address" />
        <LockModal ref="refLockModal" :address="this.address" />
        <DeleteModal ref="refDeleteModal" :address="this.address" />

    </div>
</template>


<script>

    import FileSaver from './../../../../node_modules/file-saver'
    import icon from "components/UI/icons/icon.vue"
    import TransactionModal from "./Modals/Transaction.modal.vue"
    import LockModal from "./Modals/Lock.modal.vue"
    import DeleteModal from "./Modals/Delete.modal.vue"
    import ShowBalance from "components/Wallet/Address/Balance/ShowBalance.vue"

    export default{

        props:{
            address:{default:''},
        },

        components:{
            "TransactionModal":TransactionModal,
            "ShowBalance":ShowBalance,
            "icon":icon,
            "LockModal":LockModal,
            "DeleteModal":DeleteModal,
        },

        computed: {
            getAddressPic(){
                return WebDollar.Blockchain.Wallet.getAddressPic(this.address);
            }
        },

        methods:{

            handleTransferFunds(e){

                this.$refs['refTransactionModal'].showModal(e);

            },

            handleExport(e){

                var addressFile = new Blob(["cheie prvata"], {type: "text/plain;charset=utf-8"});
                FileSaver.saveAs(addressFile, this.address + ".webd");

            },

            handleLock(e){

                this.$refs['refLockModal'].showModal(e);

            },

            handleDelete(e){

                this.$refs['refDeleteModal'].showModal(e);

            },

        }

    }
</script>

<style>

    #allWalets .walletAddress{
        padding: 0!important;
        padding-right: 0;
        width: 100%;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        margin: 15px 10px;
        transition: all .3s linear;
    }

    #allWalets .walletAddress .adressIdentityBox{
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
        display: none;
        margin-right: 25px;
    }

    .adressIdentityBox{
        display: inline-block;
    }

    .hoverAdress:hover .actionsBox{
        display: inline-block;
    }

</style>