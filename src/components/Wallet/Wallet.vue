<template>

    <div class="dashboardWallet" >

        {{this.opened}}
        <div id="walletButton" @click="this.toggleWallet" :style="{marginBottom: this.opened ? '375px': '30px'}">
            <span id="walletButtonText">
                <icon :icon="this.opened ? 'chevron-down' : 'chevron-up'"></icon>
                Wallet 0.0
            </span>
        </div>

        <div id="walletMenu" ref="walletMenu" :style="{marginBottom: this.opened ? '26px': '-320px' }">

            <div id="dashboardWallet">

                <div class="walletController">

                    <icon class="btn" icon="plus" />
                    <icon class="btn" icon="lock-open" />

                </div>

                <div class="walletSection walletsContainer">
                    <div id="allWalets">

                        <Address v-for="walletAddress in this.addresses"

                                     :key="walletAddress.address"
                                     :id="'address'+walletAddress.address"
                                     :walletAddress="walletAddress"
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

    export default{

        components:{
            "icon":icon,
            "Address":Address,
        },

        data:  () => {
            return {
                opened: false,
                addresses: [],
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
          })

        },

        methods: {

            toggleWallet(){

                this.opened = !this.opened;

            },

            addNewAddress(address){

                if (address === null || address === undefined) return false;

                for (let i=0; i<this.addresses.length; i++)
                    if (address.toString() === this.addresses.toString()){
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
        z-index: 100;
        bottom: 0;
        width: 298px!important;
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
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100%;
    }

    .walletController{
        position: relative;
        width: 100%;
        border-bottom: solid 1px #333333;
        background-color: #313131;
    }

    .walletController svg{
        margin-top: 5px;
        display: inline-block;
        padding: 0px 10px 2px 10px;
        background-color: #1f1f1f;
    }

    .walletController svg:hover{
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
        height: 350px;
        margin-bottom:-100px;
        z-index: 900;
        transition: all .3s linear;
        border-top: solid 1px #3d3d3d;
        border-left: solid 1px #444;
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
            z-index: 1200;
            margin-bottom: 90px;
        }
    }

</style>