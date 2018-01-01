<template>

    <div class="dashboardWallet" >

        <div id="walletButton" @click="this.toggleWallet" :style="{marginBottom: this.opened ? this.walletButtonMarginOpened+'px': this.walletButtonMarginClosed+'px'}">
            <span id="walletButtonText">
                <icon class="buttonIcon" :icon="this.opened ? 'chevron-down' : 'chevron-up'"></icon>
                Wallet 0.0
            </span>
        </div>

        <div id="walletMenu" ref="walletMenu" :style="{marginBottom: this.opened ? this.walletMarginOpened+'px': this.walletMarginClosed+'px' }">

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
                walletButtonMarginOpened: 375,
                walletButtonMarginClosed: 30,
                walletMarginOpened: 26,
                walletMarginClosed: -325,
            }
        },

        mounted(){

            //in browser
          if (typeof window === "undefined") return false;

          WebDollar.Blockchain.Wallet.emitter.on("wallet-address-changes", (address)=>{
              this.addNewAddress(address);
          });

          WebDollar.Blockchain.Wallet.emitter.on("wallet-changes", ()=>{
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

                    this.walletButtonMarginOpened = 392;
                    this.walletButtonMarginClosed = 94;
                    this.walletMarginOpened = 34;
                    this.walletMarginClosed = -325;

                }else{

                    this.walletButtonMarginOpened = 392;
                    this.walletButtonMarginClosed = 30;
                    this.walletMarginOpened = 34;
                    this.walletMarginClosed = -325;

                }

            },

            toggleWallet(){

                this.opened = !this.opened;

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

    /* Small Devices, Tablets */
    @media only screen and (max-width : 831px) {
        #walletMenu{
            width: 100%;
            margin-bottom: 94px;
        }
        #walletButton{
            width: 100%!important;
            border-radius: 0;
            margin-bottom: 93px;
            margin-bottom: 90px;
        }
    }

</style>