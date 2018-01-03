<template>

    <div class="dashboardWallet" >

        <div id="walletButton" ref="walletMenuButton" @click="this.toggleWallet" :style="{
                    marginBottom: this.opened ? this.walletButtonMarginOpened+'px': this.walletButtonMarginClosed+'px',
                    top: this.opened ? this.buttonTopDistanceOpen : this.buttonTopDistanceClose}">

            <span id="walletButtonText">
                <icon class="buttonIcon" :icon="this.opened ? 'chevron-down' : 'chevron-up'"></icon>
                Wallet 0.0
            </span>
        </div>

        <div id="walletMenu" ref="walletMenu" :style="{
                    marginBottom: this.opened ? this.walletMarginOpened+'px': this.walletMarginClosed+'px',
                    top: this.opened ? this.buttonTopDistanceOpen : this.buttonTopDistanceClose,
                    marginTop: this.opened ? this.walletMenuMarginTopOpen : this.walletMenuMarginTopClose,
                    height: this.opened ? this.walletMenuHeightOpen : this.walletMenuHeightClosed}">

            <div id="dashboardWallet">

                <div class="walletController">

                    <icon class="btn" icon="plus" @click="this.handleAddNewAddress" />
                    <icon class="btn" icon="lock-open" @click="this.handleLockWallet" />

                </div>

                <div class="walletSection walletsContainer">
                    <div id="allWalets">

                        <Address v-for="walletAddress in this.addresses"

                                     :key="walletAddress"
                                     :id="'address'+walletAddress"
                                     :address="walletAddress"
                                     style="padding-right: 20px"

                        >

                        </Address>

                    </div>
                </div>
            </div>
        </div>

    </div>

</template>



<script>

    import icon from "components/UI/icons/icon.vue"
    import Address from "./Address/Address.vue"
    import BrowserHelpers from "helpers/Browser.helpers"

    export default{

        components:{
            "icon":icon,
            "Address":Address,
        },

        data:  () => {
            return {
                opened: false,
                addresses: [],
                walletButtonMarginOpened: 0,
                walletButtonMarginClosed: 0,
                buttonTopDistanceOpen: 0,
                buttonTopDistanceClose: 0,
                walletMarginOpened: 0,
                walletMarginClosed: 0,
                walletMenuMarginTopOpen: 0,
                walletMenuMarginTopClose: 0,
                walletMenuHeightOpen: 0,
                walletMenuHeightClosed: 0,
            }
        },

        mounted(){

            this.changeScreenBehavior();

                //in browser
              if (typeof window === "undefined") return false;

              WebDollar.Blockchain.Wallet.emitter.on("wallet/address-changes", (address)=>{
                  this.addNewAddress(address);
              });

            WebDollar.Blockchain.Wallet.emitter.on("wallet/address-changes", (address)=>{
                this.addNewAddress(address);
            });

              WebDollar.Blockchain.Wallet.emitter.on("wallet/changes", ()=>{
                  this.loadAllAddresses();
              });

              //onLoad
              BrowserHelpers.addEvent(window, "load", (event) => {
                  this.changeScreenBehavoir();
              });

              //onResize
              BrowserHelpers.addEvent(window, "resize", (event) => {
                  this.changeScreenBehavior()
              });

        },

        methods: {

            changeScreenBehavior(){

                if (window.screenWidth < 831){

                    this.walletButtonMarginOpened = 452;
                    this.walletButtonMarginClosed = 43;

                    this.walletMarginOpened = 42;
                    this.walletMarginClosed = -325;

                    this.buttonTopDistanceOpen = '0';
                    this.buttonTopDistanceClose = 'auto';

                    this.walletMenuMarginTopOpen=this.$refs['walletMenuButton'].clientHeight;
                    this.walletMenuMarginTopClose='0';

                    this.walletMenuHeightOpen='100%';
                    this.walletMenuHeightClosed='358px';

                }else{

                    this.walletButtonMarginOpened = 392;
                    this.walletButtonMarginClosed = 30;

                    this.walletMarginOpened = 34;
                    this.walletMarginClosed = -325;

                    this.buttonTopDistanceOpen = 'auto';
                    this.buttonTopDistanceClose = 'auto';

                    this.walletMenuMarginTopOpen=this.$refs['walletMenuButton'].clientHeight;
                    this.walletMenuMarginTopClose='0';

                    this.walletMenuHeightOpen='358px';
                    this.walletMenuHeightClosed='0';

                }

            },

            toggleWallet(){

                this.opened = !this.opened;

                if(window.screenWidth < 831){
                    if (this.opened===true){
                        document.getElementById('dashboardMining').setAttribute('style', 'display:none');
                    }else{
                        document.getElementById('dashboardMining').setAttribute('style', 'display:block');
                    }
                }else{
                    document.getElementById('dashboardMining').setAttribute('style', 'display:block');
                }

            },

            handleAddNewAddress(){
                WebDollar.Blockchain.Wallet.createNewAddress();
            },

            handleLockWallet(){

            },

            addNewAddress(address){

                if (address === null || address === undefined) return false;

                for (let i=0; i<this.addresses.length; i++)
                    if (address.toString() === this.addresses[i].toString()){
                        return false;
                    }

                this.addresses.push(address);
            },

            loadAllAddresses(){

                this.addresses = [];

                for (let i=0; i<WebDollar.Blockchain.Wallet.addresses.length; i++)
                    this.addresses.push(WebDollar.Blockchain.Wallet.addresses[i].address);

            },

            deleteAddress(address){

                if (address === null || address === undefined) return false;

                for (let i=0; i<this.addresses.length; i++)
                    if (address.toString() === this.addresses.toString()){
                        this.addresses.splice(i,1);
                        return true;
                    }

                return false;
            }

        }

    }

</script>

<style>

    #walletButtonText{
        color: #1f1f1f;
    }

    #walletButton:hover #walletButtonText{
        color: #fff;
    }

    #walletButton {
        margin: 0 auto;
        position: fixed;
        z-index: 85;
        bottom: 0;
        width: 299px!important;
        right: 0;
        text-align: center;
        height: 50px;
        border-top-left-radius: 60px;
        cursor: pointer;
        background-color: #fec02c;
        color: #1f1f1f;
        margin-bottom: 20px;
        border: solid 1px #444444;
        border-right: solid 1px #fec02c;
        transition: all .3s linear;
    }

    #walletButton:hover{
        color: #fff;
        transition: all .3s linear;
    }

    .walletSection{
        display: inline-block;
        vertical-align: top;
        height: 315px;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
    }

    .walletController{
        position: relative;
        width: 100%;
        border-bottom: solid 1px #333333;
        background-color: #313131;
    }

    .walletController .btn{
        display: inline-block;
        padding: 6px 12px 6px 12px;
        background-color: #1f1f1f;
    }

    .walletController .btn:hover{
        background-color: #000000;
    }

    .allWallets div{
        border: solid 1px #545454;
    }

    #walletButton:hover{
        background-color: #1f1f1f;
        border-right: solid 1px #444444;
        transition: all .3s linear;
    }

    #walletButton span{
        width: 100%;
        line-height: 50px;
        font-size: 20px;
        font-weight: bolder;
        transition: all .3s linear;
    }

    #walletButton span:hover{
        transition: all .3s linear;
    }

    #walletMenu{
        margin: 0 auto;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 300px;
        background-color: #1f1f1f;
        height: 358px;
        margin-bottom:-100px;
        z-index: 90;
        transition: all .3s linear;
        border-top: solid 1px #3d3d3d;
        border-left: solid 1px #444;
        transition: all .3s linear;
    }

    .buttonIcon{
        display: inline-block;
        margin-right: 10px;
    }

    #walletButton .buttonIcon{
        fill: #000;
        transition: all .3s linear;
    }

    #walletButton:hover .buttonIcon{
        fill: #fff;
        transition: all .3s linear;
    }

    .walletAdress b{
        font-weight:100;
    }

    /* Small Devices, Tablets */
    @media only screen and (max-width : 831px) {
        #walletMenu{
            width: 100%;
            margin-top: 64px!important;
        }
        #walletButton{
            width: 100%!important;
            border-radius: 0;
            border:0;
            height: 65px;
            margin-bottom: 90px;
        }
        #walletButton span{
            line-height: 65px;
            font-size: 26px;
        }
        .walletController .btn{
            padding: 16px 19px 16px 19px!important;
            margin-left: 10px;
        }
        .webdollarFont{
            width: 24px!important;
        }
        #allWalets .walletAdress{
            margin: 15px 0 0 10px!important;
        }
        #allWalets .walletAdress img{
            height: 60px!important;
        }
        .walletAdress b{
            font-size: 22px!important;
            line-height: 60px!important;
        }
        .walletController{
            position: relative;
            width: 100%;
            border-bottom: solid 5px #333333;
            background-color: #313131;
            border-top: solid 5px #313131;
        }
    }

</style>