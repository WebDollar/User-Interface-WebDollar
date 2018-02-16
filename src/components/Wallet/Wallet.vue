<template>

    <div class="dashboardWallet" ref="dashboardWallet">

        <icon v-show="this.sendingMoney" class="miningStatus sendingImg jump" icon='upload' :style="{
            display: this.opened ? 'none': 'block'}"></icon>
        <icon v-show="this.receivingMoney" :style="{
            right: this.sendingMoney ? '20px' : '4px',
            marginBottom: this.sendingMoney ? '-2px' : '0',
            display: this.opened ? 'none': 'block'}" class="miningStatus recivingImg jump" icon='download'></icon>

        <div id="walletButton" ref="walletMenuButton" @click="this.toggleWallet" :style="{
            marginBottom: this.opened ? this.walletButtonMarginOpened+'px': this.walletButtonMarginClosed+'px',
            top: this.opened ? this.buttonTopDistanceOpen : this.buttonTopDistanceClose,
            borderTopLeftRadius: this.opened ? this.walletButtonRadiusLeftOpen+'px' : this.walletButtonRadiusLeftClose+'px',
            borderTopRightRadius: this.opened ? this.walletButtonRadiusRightOpen+'px' : this.walletButtonRadiusRightClose+'px'}">

            <span id="walletButtonText">
                <div style="display: inline-block">
                    <icon class="buttonIcon" :icon="this.opened ? 'chevron-down' : 'chevron-up'" style="fill: black"></icon>
                    Wallet
                </div>
                <show-sum-balances ref="refShowSumBalances" :style="{display: this.isMobile==false ? 'none' : 'inline-block'}" :addresses="this.addresses" :currency="this.currency"/>
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

                        <input ref="importedAddress" type="file" v-on:change="this.handleImportAddress" multiple size="50" />

                        <div class="btn">
                            Import Address
                        </div>

                    </label>

                </div>

                <div class="walletSection walletsContainer" :style="{height: this.walletContentHeight}">

                    <div id="allWalets">

                        <Address v-for="walletAddress in this.addresses"
                             :isMiningAddress="miningAddress === walletAddress.address"
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
    import ShowSumBalances from "./../../components/Wallet/Address/Balance/ShowSumBalances.vue"

    export default{

        components:{
            "icon":icon,
            "Address":Address,
            "ShowSumBalances":ShowSumBalances,
        },

        props: ['addresses', 'currency'],

        data:  () => {
            return {
                opened: false,
                miningAddress: '',

                isMobile:false,
                sendingMoney:false,
                receivingMoney:false,

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


              WebDollar.Blockchain.emitter.on("blockchain/mining/address", (data)=>{
                  this.miningAddress = data.address;
              });
              this.miningAddress = WebDollar.Blockchain.Mining.minerAddressBase;

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

        },

        methods: {

            changeScreenBehavior(){

                if (this.$refs['walletMenuButton'] === undefined) {
                    console.log("not ready..");
                    return;
                }

                if (window.screenWidth < 831){

                    this.isMobile = true;

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

                    this.walletContentHeight= window.outerHeight-110;

                    this.walletButtonRadiusLeftOpen= 0;
                    this.walletButtonRadiusLeftClose= 0;

                    this.walletButtonRadiusRightOpen= 0;
                    this.walletButtonRadiusRightClose= 0;

                }else{

                    this.isMobile=false;

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

            async handleImportAddress(){

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




        }

    }

</script>

<style>

    @keyframes jump {
        0%   {transform: translate3d(0,0,0) scale3d(1,1,1);}
        40%  {transform: translate3d(0,30%,0) scale3d(.7,1.5,1);}
        100% {transform: translate3d(0,100%,0) scale3d(1.5,.7,1);}
    }
    .jump {
        transform-origin: 50% 50%;
        animation: jump .5s linear alternate infinite;
    }

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

    .miningStatus{
        width: 20px;
        height: 20px;
        position: fixed;
        display: block;
        right: 4px;
        bottom: 57px;
        z-index: 1000;
        fill:#262626;
        transition: all 1.2s linear;
    }

    .sendingImg{
        fill:#298bea!important;
    }

    .recivingImg{
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

        #walletMenu{
            width: 100%;
            margin-top: 50px!important;
        }
        #walletButton{
            width: 100%!important;
            border:0;
            height: 50px;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            margin-bottom: 90px;
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
        #allWalets .walletAddress{
            margin: 15px 0 0 10px!important;
        }
        #allWalets .walletAddress img{
            height: 50px!important;
            margin-top: 5px;
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