<template>
    <div class="walletAddress hoverAddress">

        <div class="addressIdentityBox" v-on:click.stop="handleTransferFunds">
            <img class="walletAddressImage" :src="this.getAddressPic" >
            <icon v-if="this.isMiningAddress" class="btn actuallMiningAddress" alt="Mining" text="Mining Address" icon="mining" style="display: inline-block" />

            <b class="fontColor"><ShowBalance :address="this.address" currency="0x01"/> WEBD</b>
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

        <TransactionModal ref="refTransactionModal" :address="this.address" :isMiningAddress="this.isMiningAddress" />
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
            isMiningAddress: {default: false}
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

        data: () => {
            return {
                addressLocked: false
            }
        },

        async mounted(){

            if (typeof window === 'undefined') return;

            if (await WebDollar.Blockchain.Wallet.isAddressEncrypted(this.address).result){
                this.addressLocked = true;
            }

        },

        methods:{

            handleTransferFunds(e){

                this.$refs['refTransactionModal'].showModal(e);

            },

            async handleExport(e){

                let answer = await WebDollar.Blockchain.Wallet.exportPrivateKeyFromAddress(this.address);

                if (answer.result){

                    let addressFile = new Blob([JSON.stringify(answer.data)], {type: "application/json;charset=utf-8"});
                    FileSaver.saveAs(addressFile, this.address + ".webd");

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
        padding-right: 0;
        width: 100%;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        margin: 15px 10px;
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

    .addressIdentityBox{
        display: inline-block;
    }

    .hoverAddress:hover .actionsBox{
        display: inline-block;
    }

    .fontColor{
        color: #f9dc95!important;
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
            margin-left: -55px;
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