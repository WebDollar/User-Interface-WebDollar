<template>

    <div class="dashboardWallet" ref="dashboardWallet">

        <icon v-show="!this.opened && isSendingMoney" class="miningStatus sendingImg jump" icon='chevron-double-up' :style=""></icon>

        <icon v-show="!this.opened && isReceivingMoney" :style="{
            right: isSendingMoney ? '20px' : '4px',
            marginBottom: isSendingMoney ? '-2px' : '0'}" class="miningStatus receivingImg jump"icon='chevron-double-down'>
        </icon>

        <div id="walletContainer" :ref="'walletContainer'">

            <div id="walletButton" ref="walletMenuButton" @click="this.toggleWallet">
                
                <span id="walletButtonText">
                    <div style="display: inline-block">
                        <icon class="buttonIcon statusWalletIcon" :icon="this.opened ? 'chevron-down' : 'chevron-up'" style="fill: black"></icon>
                        Wallet
                    </div>
                    <show-sum-balances ref="refShowSumBalances" :style="{display: this.isMobile==false ? 'none' : 'inline-block'}" :addresses="this.addresses" :currency="this.currency"> </show-sum-balances>
                </span>
                
            </div>

            <div id="walletMenu" :ref="'walletMenu'">

                <div id="dashboardWallet">

                    <div class="walletController">

                        <div class="btn buttonTextStyle" @click="this.handleAddNewAddress" title="Add new wallet">
                            Add
                        </div>

                        <label class="myLabel" title="Import existing wallet">

                            <input ref="importedAddress" type="file" v-on:change="this.handleImportAddress" multiple size="50" />

                            <div class="btn buttonTextStyle">
                                Import
                            </div>

                        </label>

                        <div class="btn buttonTextStyle" title="Create Offline transaction" v-on:click.stop="showOfflineTransactions">
                            Offline
                        </div>

                    </div>

                    <div class="walletSection walletsContainer" :style="{height: this.walletContentHeight+'px'}">

                        <div id="allWallets">

                            <Address v-for="(walletAddress, index) in this.addresses"
                                :isMiningAddress="miningAddress === walletAddress.address"
                                :key="walletAddress.address"
                                :id="'address'+walletAddress.address"
                                :ref="'address'+index"
                                :address="walletAddress.address"
                                style="padding-right: 20px"
                                @onPendingTransactionsChanges="handlePendingTransactionsChanges"
                            >

                            </Address>

                        </div>

                    </div>
                </div>
            </div>
        </div>

        <offline-transactions-modal ref="refOfflineTransactionsModal" :address="this.miningAddress"  />

    </div>

</template>



<script>
    var Vue = require('vue/dist/vue.min.js');

    import icon from "components/UI/icons/icon.vue"
    import Address from "./Address/Address.vue"
    import BrowserHelpers from "helpers/Browser.helpers"
    import ShowSumBalances from "./Address/Balance/Balances/Show-Sum-Balances.vue"
    import Notification from "helpers/Notification.helpers"
    import offlineTransactionsModal from "./Address/Modals/Main-Modal/Address-main.modal.offline.vue"

    export default{

        components:{
            icon,
            "Address": Address,
            ShowSumBalances,
            offlineTransactionsModal
        },

        props: ['addresses', 'currency'],

        data:  () => {
            return {
                opened: false,
                balanceHover: false,
                miningAddress: null,

                isMobile: false,
                screenHeight: null,
                
                sendingMoney:{},
                receivingMoney:{},
            }
        },

        mounted(){

            //in browser
            if (typeof window === "undefined") return false;

            this.changeScreenBehavior();

            WebDollar.StatusEvents.on("blockchain/mining/address", (data)=>{
                this.miningAddress = data.address;
            });
            this.miningAddress = WebDollar.Blockchain.Mining.minerAddress;

            WebDollar.StatusEvents.on("wallet/transfer", (data)=>{
                console.warn(data)
                let walletIndex = this.getMiningWalletIndex();
                this.$refs['address'+walletIndex][0].openPrefilledTransferModal(data.toAddress, data.toAmount, data.toFee);
            });

            //onLoad    
            BrowserHelpers.addEvent(window, "load", (event) => {
                this.initScreenSettings(window)
            });

            //onResize
            BrowserHelpers.addEvent(window, "resize", (event) => {
                this.initScreenSettings(window)
            });

        },

        computed:{

            isSendingMoney(){
                return Object.keys(this.sendingMoney).length !== 0;
            },

            isReceivingMoney(){
                return Object.keys(this.receivingMoney).length !== 0;
            }

        },

        methods: {

            initScreenSettings(window) {    
                this.changeScreenBehavior();
                this.screenHeight = window.screenHeight;
                if (window.screenWidth < 831){
                    this.isMobile = true;
                    this.$refs['walletMenu'].style.height = `${screenHeight}px`;
                    this.$refs['walletContainer'].style.bottom = `${-58-screenHeight+99}px`
                } else {
                    this.isMobile = false;
                    this.$refs['walletMenu'].style.height = `358px`;
                    this.$refs['walletContainer'].style.bottom = `-320px`
                }
            },

            getMiningWalletIndex() {
                if (!this.addresses || this.addresses.length == 0) {
                    throw new Error('No addresses loaded, so unable to select mining wallet.');
                }
                let miningAddressIndex = this.addresses.map((a)=>a.address).indexOf(this.miningAddress);
                if (miningAddressIndex == -1) {
                    miningAddressIndex = 0; // fallback to first wallet index
                }
                return miningAddressIndex
            },

            showOfflineTransactions(){
                this.$refs['refOfflineTransactionsModal'].showModal();
            },

            changeScreenBehavior(){
                if (this.$refs['walletMenuButton'] === undefined) {
                    console.log("not ready..");
                    return;
                }
            },

            toggleWallet(){
                this.opened = !this.opened;
                let ref = this.$refs['walletContainer'];
                if (!ref.style.bottom) {
                    ref.style.bottom =  '-320px';
                }
                if (this.isMobile) {
                    ref.style.bottom == '-47px' ? ref.style.bottom = `${-58-this.screenHeight+99}px`: ref.style.bottom = `-47px`;
                } else {
                    ref.style.bottom == '-320px' ? ref.style.bottom = '0px' : ref.style.bottom = '-320px';
                }
            },

            async handleAddNewAddress(){
                await WebDollar.Blockchain.Wallet.createNewAddress();
                Notification.addAlert(undefined, "success", "Wallet Created", WebDollar.Blockchain.Wallet.addresses[WebDollar.Blockchain.Wallet.addresses.length-1].address + " has been added to your wallet!", 5000);
            },

            async handleImportAddress(){

                // dropzone tutorial https://www.html5rocks.com/en/tutorials/file/dndfiles/

                // Check for the various File API support.
                if ((window.File && window.FileReader && window.FileList && window.Blob) === false){
                    Notification.addAlert(undefined, "error", "Import Error", "The File import is not fully supported in this browser", 5000);
                }

                let fileInput = this.$refs['importedAddress'];

                if ('files' in fileInput) {
                    if (fileInput.files.length === 0) {
                        Notification.addAlert(undefined, "error", "Import Error", "No file selected", 5000);
                    } else {

                        for (let i = 0; i < fileInput.files.length; i++) {

                            let file = fileInput.files[i];
                            let extension = file.name.split('.').pop();

                            if (extension === "webd") {
                                let reader = new FileReader();

                                try {
                                    reader.onload = async (e) => {
                                        let data = JSON.parse(reader.result);
                                        let answer = await WebDollar.Blockchain.Wallet.importAddressFromJSON(data);

                                        if (answer.result === true){
                                            Notification.addAlert(undefined, "success", "Import Success", answer.address + " has been imported!", 5000);
                                        } else {
                                            Notification.addAlert(undefined, "error", "Import Error", answer.message, 5000);
                                        }
                                    };

                                } catch (exception){
                                    Notification.addAlert(undefined, "error", "Import Error","Your Uploaded file is not a valid JSON format", 5000);
                                }

                                reader.readAsText(file);
                            } else {
                                Notification.addAlert(undefined, "error","Import Error", "File not supported!", 5000);
                            }

                        }

                    }
                }

            },


            handlePendingTransactionsChanges(){

                this.receivingMoney = {};
                this.sendingMoney = {};

                let i=-1;
                while (1===1){

                    i++;
                    let element = this.$refs['address'+i];
                    if (element === undefined) break;

                    element = element[0];

                    for (let key in element.receivingMoney)
                        Vue.set(this.receivingMoney, key, element.receivingMoney[key]);

                    for (let key in element.sendingMoney)
                        Vue.set(this.sendingMoney, key, element.sendingMoney[key]);

                }

            },


        }

    }

</script>

<style>

    @keyframes jump {
        0%   {transform: translate3d(0,0,0) scale3d(1,1,1);}
        40%  {transform: translate3d(0,30%,0) scale3d(.7,1.5,1);}
        100% {transform: translate3d(0,100%,0) scale3d(1.5,.7,1);}
    }
    .jump.sendingImg, .jump.receivingImg {
        fill: #000!important;
        transform-origin: 50% 50%;
        animation: jump .5s ease-in-out alternate infinite;
    }

    #myWalletImport{
        display: none;
    }

    .vue-slider-component.vue-slider-horizontal .vue-slider-dot{
        left:-5px;
    }

    #walletButtonText{
        color: #1f1f1f!important;
    }

    #walletButtonText svg{
        vertical-align: top;
        width: 14px;
        margin-left: 10px;
        margin-top: 5px;
    }

    .mainAddress{
        background-color: #fec02c14;
    }

    #walletContainer {
        position: fixed;
        width: 299px;
        right: 0;
        transition: bottom .3s ease-in-out;
    }

    #walletButton {
        width:100%;
        position: relative;
        z-index: 10;
        display: block;
        text-align: center;
        height: 50px;
        border-top-left-radius: 60px;
        cursor: pointer;
        background-color: #fec02c;
        color: #1f1f1f;
    }

    #walletMenu{
        width: 100%;
        position: relative;
        display: block;
        background-color: #1f1f1f;
        height: 358px;
        z-index: 10;
        border-top: solid 1px #3d3d3d;
        border-left: solid 1px #3d3d3d;
    }

    #walletButton:hover{
        background-color: #fec02c;
        transition: all .3s ease-in-out;
    }

    .walletSection{
        display: inline-block;
        vertical-align: top;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
    }

    .walletController{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        position: relative;
        width: 100%;
        border-bottom: solid 1px #333333;
        background-color: #3e3e3e;
    }

    .walletController .btn{
        text-align: center;
        color: #b5b5b5;
        cursor: pointer;
        padding: 8px 19px 6px 19px!important;
    }

    .walletController .btn:hover{
        background-color: #575757;
        transition: all .3s ease-in-out;
    }

    .walletController .btn:first-child{
        border-right: solid 1px #3c3b3b;
    }

    .allWallets div{
        border: solid 1px #545454;
    }

    #walletButton span{
        width: 100%;
        line-height: 50px;
        font-size: 20px;
    }

    .statusWalletIcon{
        margin-top: 10px!important;
    }

    .buttonIcon{
        display: inline-block;
        margin-right: 10px;
    }

    .editError{
        color: #ff0000 !important;
        padding: 1px 0 10px 11px;
        display: block;
        font-size: 14px;
        text-align: left;
        width: 100%;
    }

    .editError2{
        padding: 10px 0 10px 11px;
    }

    dashboardWallet span{
        width: 100%!important;
        display: block;
        margin: 0;
        letter-spacing: 0!important;
        color: #808080;
    }

    #walletButton .buttonIcon{
        fill: #000;
        transition: all .3s ease-in-out;
    }

    .walletAddress b{
        font-weight:100;
    }

    .miningStatus{
        width: 20px;
        height: 20px;
        position: fixed;
        display: block;
        right: 4px;
        bottom: 57px;
        z-index: 1000;
        fill:#262626;
        transition: all 1.2s ease-in-out;
    }

    .buttonTextStyle{
        font-size: 14px!important;
    }

    .sendingImg{
        fill:#298bea!important;
    }

    .receivingImg{
        fill:#219411!important;
    }

    label.myLabel input[type="file"] {
        position: fixed;
        top: -1000px;
    }

    /* Small Devices, Tablets */
    @media only screen and (max-width : 831px) {

        .miningStatus{
            display: none;
            bottom: 67px;
        }

        #walletContainer {
            width:100%;
            transition: bottom .3s ease-in-out;
        }
        #walletMenu{
            width: 100%;
        }
        #walletButton{
            width: 100%;
            border:0;
            height: 50px;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
        }
        #walletButton span{
            line-height: 50px;
            font-size: 22px;
        }
        .walletController .btn{
            padding: 10px 19px 6px 19px!important;
            margin-left: 10px;
        }
        .webdollarFont{
            width: 20px!important;
        }
        #allWallets .walletAddress{
            margin: 15px 0 0 10px!important;
        }
        #allWallets .walletAddress img{
            height: 60px;
            margin-bottom: 20px;
            margin-top: -20px;
        }
        #allWallets .walletAddress .imageAndInput img{
            margin-top: 0!important;
        }
        .walletAddress b{
            font-size: 22px!important;
            line-height: 60px!important;
        }
        #allWallets .walletAddress b{
            line-height: 0!important;
        }
        .walletController{
            position: relative;
            width: 100%;
            border-bottom: solid 5px #333333;
            background-color: #313131;
            border-top: solid 5px #313131;
        }

        #walletButtonText svg{
            width: 22px;
        }

    }

</style>
