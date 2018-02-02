<template>

    <div class="dashboardWallet" ref="dashboardWallet">

        <div id="walletButton" ref="walletMenuButton" @click="this.toggleWallet" :style="{
                    marginBottom: this.opened ? this.walletButtonMarginOpened+'px': this.walletButtonMarginClosed+'px',
                    top: this.opened ? this.buttonTopDistanceOpen : this.buttonTopDistanceClose,
                    borderTopLeftRadius: this.opened ? this.walletButtonRadiusLeftOpen+'px' : this.walletButtonRadiusLeftClose+'px',
                    borderTopRightRadius: this.opened ? this.walletButtonRadiusRightOpen+'px' : this.walletButtonRadiusRightClose+'px'}">

            <span id="walletButtonText">
                <icon class="buttonIcon" :icon="this.opened ? 'chevron-down' : 'chevron-up'"></icon>
                Wallet
                <ShowSumBalances :addresses="this.addresses" :currency="this.currency" ref="showSumBalances" />
            </span>
        </div>

        <div id="walletMenu" ref="walletMenu" :style="{
                    marginBottom: this.opened ? this.walletMarginOpened+'px': this.walletMarginClosed+'px',
                    top: this.opened ? this.buttonTopDistanceOpen : this.buttonTopDistanceClose,
                    marginTop: this.opened ? this.walletMenuMarginTopOpen : this.walletMenuMarginTopClose,
                    height: this.opened ? this.walletMenuHeightOpen : this.walletMenuHeightClosed}">

            <div id="dashboardWallet">

                <div class="walletController">

                    <div class="btn" @click="this.handleAddNewAddress">
                        Add Address
                    </div>
                    <label class="myLabel">

                        <input ref="importedAddress" type="file" v-on:change="this.importAddress" multiple size="50" />

                        <div class="btn">
                            Import Address
                        </div>

                    </label>

                </div>

                <div class="walletSection walletsContainer" :style="{
                    height: this.walletContentHeight}">
                    <div id="allWalets">

                        <Address v-for="walletAddress in this.addresses"

                                     :key="walletAddress.address"
                                     :id="'address'+walletAddress.address"
                                     :address="walletAddress.address"
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
    var Vue = require('vue/dist/vue.min.js');

    import icon from "components/UI/icons/icon.vue"
    import Address from "./Address/Address.vue"
    import BrowserHelpers from "helpers/Browser.helpers"
    import ShowSumBalances from "components/Wallet/Address/Balance/ShowSumBalances.vue"

    export default{

        components:{
            "icon":icon,
            "Address":Address,
            "ShowSumBalances":ShowSumBalances,
        },

        data:  () => {
            return {
                opened: false,
                addresses: [],
                currency: "0x01",

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
                walletContentHeight: 315,
                walletButtonRadiusLeftOpen: 0,
                walletButtonRadiusLeftClose: 0,
                walletButtonRadiusRightOpen: 0,
                walletButtonRadiusRightClose: 0
            }
        },

        mounted(){

                //in browser
              if (typeof window === "undefined") return false;

              this.changeScreenBehavior();

              WebDollar.Blockchain.Wallet.emitter.on("wallet/address-changes", (address)=>{
                  console.log("wallet/address-changes", address)
                  this.addNewAddress(address);
              });

              WebDollar.Blockchain.Wallet.emitter.on("wallet/changes", ()=>{
                  this.loadAllAddresses();
              });

              //onLoad
              BrowserHelpers.addEvent(window, "load", (event) => {
                  this.changeScreenBehavior();
                  this.walletResizeFix();
              });

              //onResize
              BrowserHelpers.addEvent(window, "resize", (event) => {
                  this.changeScreenBehavior();
                  this.walletResizeFix();
              });

              this.loadAllAddresses();

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

                    this.walletContentHeight= window.outerHeight-90;

                    this.walletButtonRadiusLeftOpen= 0;
                    this.walletButtonRadiusLeftClose= 15;

                    this.walletButtonRadiusRightOpen= 0;
                    this.walletButtonRadiusRightClose= 15;

                }else{

                    this.walletContentHeight= 315;

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

                    this.walletButtonRadiusLeftOpen= 60;
                    this.walletButtonRadiusLeftClose= 60;

                    this.walletButtonRadiusRightOpen= 0;
                    this.walletButtonRadiusRightClose= 0;

                }

            },

            toggleWallet(){

                this.opened = !this.opened;

                if(window.screenWidth < 831){
                    if (this.opened===true)
                        document.getElementById('dashboardMining').setAttribute('style', 'display:none');
                    else
                        document.getElementById('dashboardMining').setAttribute('style', 'display:block');

                }else
                    document.getElementById('dashboardMining').setAttribute('style', 'display:block');


            },

            walletResizeFix(){

                if(window.screenWidth < 831)
                    if (this.opened===true)
                        document.getElementById('dashboardMining').setAttribute('style', 'display:none');
                    else
                        document.getElementById('dashboardMining').setAttribute('style', 'display:block');

                else
                    document.getElementById('dashboardMining').setAttribute('style', 'display:block');


            },

            handleAddNewAddress(){
                WebDollar.Blockchain.Wallet.createNewAddress();
            },

            async importAddress(){

                // dropzone tutorial https://www.html5rocks.com/en/tutorials/file/dndfiles/

                // Check for the various File API support.
                if ((window.File && window.FileReader && window.FileList && window.Blob) === false){
                    alert('The File APIs are not fully supported in this browser.');
                }

                let fileInput = this.$refs['importedAddress'];

                if ('files' in fileInput) {
                    if (fileInput.files.length === 0) {
                        alert ( "Select one or more files." );
                    } else {

                        for (let i = 0; i < fileInput.files.length; i++) {

                            let file = fileInput.files[i];
                            let extension = file.name.split('.').pop();

//                            console.log(file);
//                            console.log(extension);

                            if (extension === "webd") {
                                let reader = new FileReader();

                                try {
                                    reader.onload = async (e) => {

                                        //console.log(reader.result);
                                        let data = JSON.parse(reader.result);

                                        let answer = await WebDollar.Blockchain.Wallet.importAddressFromPrivateKey(data);

                                        if (answer.result === true){
                                            console.log("Address Imported", answer.address);
                                        } else {
                                            alert(answer.message);
                                        }


                                    };

                                } catch (exception){
                                    alert("Your Uploaded file is not JSON");
                                }

                                reader.readAsText(file);
                            } else {
                                alert ( "File not supported!" )
                            }

                        }


                    }
                }



            },

            addNewAddress(address){

                if (address === null || address === undefined) return false;

                for (let i=0; i<this.addresses.length; i++)
                    if (address.toString() === this.addresses[i].address.toString()){
                        return false;
                    }

                this.addAddressToWalletWatch(address);
            },

            loadAllAddresses(){

                for (let index in this.addresses){
                    WebDollar.Blockchain.Balances.unsusbribeBalancesChanges(this.addresses[index ].subscription);
                    this.addresses[ index ].subscription = null;
                    console.log("unsubscribe....");
                }


                this.addresses = [];

                for (let i=0; i<WebDollar.Blockchain.Wallet.addresses.length; i++) {
                    this.addAddressToWalletWatch(WebDollar.Blockchain.Wallet.addresses[i].address);
                }

            },

            addAddressToWalletWatch(address){

                let data = WebDollar.Blockchain.Balances.subscribeBalancesChanges(address, (data)=>{

                    for (let i=0; i<this.addresses.length; i++)
                        if (this.addresses[i].address === address ){

                            this.addresses[i].balances = data.balances;
                            this.addresses[i] = Object.assign( {}, this.addresses[i], { });
                            this.$refs['showSumBalances'].refreshSum(this.addresses, this.currency);

                            break;
                        }

                    // immutable array
                    // this.addresses = Object.assign( {}, this.addresses, { });

                    this.$forceUpdate();

                });

                if (data !== null) {

                    let element =  {address: address, balances: data.balances, subscription: data.subscription};
                    this.addresses.push (element);

                }

            },

            deleteAddress(address){

                if (address === null || address === undefined) return false;

                for (let keyAddress in this.addresses)
                    if (address.toString() === this.addresses[keyAddress].address.toString()){

                        WebDollar.Blockchain.Balances.unsusbribeBalancesChanges(this.addresses[keyAddress].subscription);
                        this.addresses.splice(i,1);
                        return true;
                    }

                return false;
            }

        }

    }

</script>

<style>

    #myWalletImport{
        display: none;
    }

    .vue-slider-component.vue-slider-horizontal .vue-slider-dot{
        left:-5px;
    }

    #walletButtonText{
        color: #1f1f1f;
    }

    .mainAddress{
        background-color: #fec02c14;
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
        background-color: #fec02c;
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
        display: grid;
        grid-template-columns: 1fr 1fr;
        position: relative;
        width: 100%;
        border-bottom: solid 1px #333333;
        background-color: #313131;
    }

    .walletController .btn{
        text-align: center;
        color: #b5b5b5;
        cursor: pointer;
        padding: 8px 19px 6px 19px!important;
    }

    .walletController .btn:hover{
        background-color: #44403f;
        transition: all .3s linear;
    }

    .walletController .btn:first-child{
        border-right: solid 1px #3c3b3b;
    }

    .allWallets div{
        border: solid 1px #545454;
    }

    #walletButton:hover{
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
        border-top: solid 1px #3d3d3d;
        border-left: solid 1px #444;
        transition: all .3s linear;
    }

    .buttonIcon{
        display: inline-block;
        margin-right: 10px;
    }

    .dashboardWallet{
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer */
        -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
        -webkit-user-select: none; /* Chrome, Safari, and Opera */
        -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
    }

    #walletButton .buttonIcon{
        fill: #000;
        transition: all .3s linear;
    }

    .walletAddress b{
        font-weight:100;
    }

    label.myLabel input[type="file"] {
        position: fixed;
        top: -1000px;
    }

    /* Small Devices, Tablets */
    @media only screen and (max-width : 831px) {
        #walletMenu{
            width: 100%;
            margin-top: 40px!important;
        }
        #walletButton{
            width: 100%!important;
            border:0;
            height: 40px;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            margin-bottom: 90px;
        }
        #walletButton span{
            line-height: 40px;
            font-size: 22px;
        }
        .walletController .btn{
            padding: 10px 19px 6px 19px!important;
            margin-left: 10px;
        }
        .webdollarFont{
            width: 24px!important;
        }
        #allWalets .walletAddress{
            margin: 15px 0 0 10px!important;
        }
        #allWalets .walletAddress img{
            height: 60px!important;
        }
        .walletAddress b{
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