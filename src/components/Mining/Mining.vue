<template>
    <div id="dashboardMining" class="walletSection">

        <div id="miningController">
            <p class="miningPowerText">Mining <br/> <span class="secondWord">Power</span></p>
            <strong id="threadsNumber" :style="{background: this.workers ? 0 : '#d23c25'}">{{this.workers}}</strong>

            <div type="button" class="miningBar">
                <slider ref="refMiningSlider" @sliderChanged="this.changeWorkers" />
            </div>

            <div class="miningDetails" v-on:click="toggleMiningInfo()">
                <div class="miningLabelContainer">
                    <p class="miningTypeIndicator">
                        {{this.started ? ((this.hashesPerSecond <= 1) ? 'PoS Mining ' : 'PoW Mining ') : 'Not Started'}}
                    </p>
                    <icon icon="mining" v-if="this.started && this.hashesPerSecond > 0" class="isImining miningAnimation" alt="Mining" text="Mining Indication"/>
                    <svg :style="{display: (!this.started || this.hashesPerSecond == 0) ? 'inline-block' : 'none'}" version="1.1" class="miningLoader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                      <path fill="#fec02c" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                        <animateTransform attributeType="xml"
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="0.6s"
                          repeatCount="indefinite"/>
                        </path>
                    </svg>
                    <p class="miningProgressIndicator">
                         {{this.started ? (this.hashesPerSecond <= 1 ? (this.hashesPerSecond == 1 ? 'Staking...' : 'You need 100 WEBD or wait for PoW ⓘ') : this.hashesPerSecond + ' hash/sec ') : 'No Mining Power'}}
                    </p>
                </div>
            </div>
            <div class="hoverInfo miningInfo" :ref="'miningInfo'" v-on:click="toggleMiningInfo()">

                <div class="infoText helpCursor" style="letter-spacing: 0.1px" title="Proof-of-Work (PoW) Mining Information">
                    WebDollar knows two types of mining. The types cycle in a pattern of 30 blocks (20 minutes). The first 10 blocks are Proof-of-Work. Followed by 20 blocks of Proof-of-Stake.
                </div>

                <div class="infoTitle helpCursor" title="Proof-of-Stake (PoW) Mining Information">
                    Proof-of-Work Mining
                </div>

                <div class="infoText helpCursor" style="letter-spacing: 0.1px" title="Proof-of-Work (PoW) Mining Information">
                    PoW mining needs processing power. The more processing power you have, the more you mine.
                </div>
                
                <div class="infoTitle helpCursor" title="Proof-of-Stake (PoW) Mining Information">
                    Proof-of-Stake Mining
                </div>
                <div class="infoText helpCursor" title="Proof-of-Stake (PoW) Mining Information">
                    PoS mining needs little processing power but needs balance. The more balance you have, the more you mine. You need at least 100 WebDollar for PoS mining.
                </div>
                
            </div>  
            <p class="WEBD">
                <svg :style="{display: this.loaded==false ? 'inline-block' : 'none'}" version="1.1" class="miningLoader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                      <path fill="#fec02c" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                        <animateTransform attributeType="xml"
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="0.6s"
                          repeatCount="indefinite"/>
                        </path>
                </svg>

                <show-sum-balances :showPoolReward="true" :style="{display: this.loaded==false ? 'none' : 'inline-block'}" :addresses="this.addresses" :currency="this.currency" :showPrefix="true" ref="refShowSumBalances" class="showSumBallance"/> <b class="whiteText">WEBD</b>

                <div class="hoverInfo balanceInfo" >
                    <div class="balanceText">

                        <div class="balanceTitle helpCursor" title="Balance available to be spent">
                            Available Balance:
                        </div>
                        <div class="balanceAmount helpCursor" title="Balance available to be spent">
                            <show-sum-balances :addresses="this.addresses" :currency="this.currency" ref="refShowSumAvailableBalances" />
                        </div>

                        <div class="balanceTitle helpCursor" style="letter-spacing: 0.1px" title="The balance you will have at the next block mined by your pool">
                            Potential Balance:
                        </div>
                        <div class="balanceAmount helpCursor" title="The balance you will have at the next block mined by your pool">
                            <show-sum-balances :showPoolReward="true" :addresses="this.addresses" :currency="this.currency" ref="refShowSumPotentialBalances"/>
                        </div>

                    </div>
                </div>
            </p>
        </div>

    </div>
</template>

<script>

    import ShowSumBalances from "components/Wallet/Address/Balance/Balances/Show-Sum-Balances.vue"
    import slider from "./slider.vue";
    import ShowBalance from "components/Wallet/Address/Balance/Show-Balance.vue"
    import icon from "components/UI/icons/icon.vue"
    
    export default{

        name: 'Mining',

        components: {
            ShowSumBalances,
            slider,
            ShowBalance,
            icon
        },

        props: [
            'addresses',
            'currency',
            "startAutomatically",
        ],

        data: function () {
            return {
                started: true,
                hashesPerSecond: 2,
                workers: localStorage.getItem("miner-settings-worker-count") || 0,
                minerAddress:'',
                status: '',
                loaded:false,
                stopTimerHandler: null,
                isPos: false,
                _prevWorkers: null,
            }
        },

        computed:{
        },

        mounted() {

            if (typeof window === 'undefined') return;

            WebDollar.StatusEvents.on("mining/hash-rate", (hashesPerSecond)=>{
                this.hashesPerSecond = hashesPerSecond;

            });

            WebDollar.StatusEvents.on("mining/status-changed", (status)=>{

                // this.started = WebDollar.Blockchain.Mining.started;

            });

            WebDollar.StatusEvents.on("mining/reset", ()=>{

                // this.started = WebDollar.Blockchain.Mining.started;

            });

            WebDollar.StatusEvents.on("mining/workers-changed", (workers)=>{

                this.workers = workers;
                if (this.workers !== this.$refs['refMiningSlider'].data) {
                    this.$refs['refMiningSlider'].$refs['slider'].setValue(this.workers);
                }

            });

            this.minerAddress = WebDollar.Blockchain.Mining.minerAddressBase;
            WebDollar.StatusEvents.on("mining/miner-address-changed", (minerAddress)=>{
                this.minerAddress = minerAddress;
            });

            WebDollar.StatusEvents.on("blockchain/status", (data)=>{

                this.status = data.message;

            });

            WebDollar.StatusEvents.on("blockchain/status", (data)=>{

                if (data.message === "Blockchain Ready to Mine") {

                    this.loaded = true;
                    this.$refs['refMiningSlider'].disabled = false;

                    if (this.startAutomatically){
                        let number_of_workers;

                        if (this._prevWorkers !== null && this._prevWorkers !== undefined)
                            number_of_workers = this._prevWorkers;
                        else
                            number_of_workers = localStorage.getItem("miner-settings-worker-count");


                        this.$refs['refMiningSlider'].disableHalving = true;
                        WebDollar.Blockchain.Mining.setWorkers(number_of_workers || 1);
                        this.$refs['refMiningSlider'].disableHalving = false;

                    }

                    console.error('#################################################### s-a synchronizat');

                }

                if (data.message === "Start Synchronizing"){

                    if (this._prevWorkers === null || this._prevWorkers === undefined)
                        this._prevWorkers = localStorage.getItem("miner-settings-worker-count");
                    else
                        this._prevWorkers = WebDollar.Blockchain.Mining.workers.workers;

                }

            });

            WebDollar.StatusEvents.on("blockchain/blocks-count-changed", (blocksLength)=> {

                this.isPos = WebDollar.Blockchain.blockchainGenesis.isPoSActivated( WebDollar.Blockchain.blockchain.blocks.length);

            });


        }
        ,
        methods: {

            toggleMiningInfo() {
                let ref = this.$refs['miningInfo']
                ref.style.right == '0px' ? ref.style.right = '-840px' : ref.style.right = '0px';
            },
        
            changeWorkers(value){

                WebDollar.Blockchain.Mining.setWorkers(value);

                let setWorkersTimer = (value) => {

                    let timer;

                    let last_number_of_workers = localStorage.getItem("miner-settings-worker-count") || 0;
                    if (last_number_of_workers === 0)
                        localStorage.setItem("miner-settings-worker-count", 1);

                    function run() {
                        console.log("A new default mining power was set:", value);
                        localStorage.setItem("miner-settings-worker-count", value);
                    }

                    let time = 20*1000; //default 20 sec

                    if (WebDollar.Applications.VersionCheckerHelper.detectMobileAndTablet()){
                        time = 120*1000;
                    }

                    timer = setTimeout(run, time);

                    return stopTimer;

                    function stopTimer() {
                        if (timer) {
                            clearTimeout(timer);
                            timer = 0;
                        }
                    }
                };
                
                if (this.stopTimerHandler)
                    this.stopTimerHandler();

                this.stopTimerHandler = setWorkersTimer(value);
            },

        }, 

    }

</script>

<style>

    .hoverInfo{
        position: fixed;
        float: right;
        background-color: #383838;
        color: #fff;
        border-top: solid 1px #3a3939;
        border-left: solid 1px #3a3939;
        padding: 15px 30px 15px 15px;
        box-sizing: border-box!important;
        z-index: 1;
        transition: all 0.5s ease;
        opacity: 0.96;
    }

    .miningLabelContainer {
        margin: auto 5px
    }

    .balanceInfo {
        height: 80px;
        width: 300px;
        bottom: 37px;
        right: -330px;
    }

    .miningInfo {
        height: 200px;
        width: 550px;
        bottom: 37px;
        right: -840px;
    }

    .infoTitle {
        font-size:12px;
        font-weight: 800;
    }

    .infoText {
        font-size: 11px;
        margin-bottom: 20px;
        font-weight: 200;
    }
    .miningTypeIndicator {
        margin-right:5px;
        font-weight: 800;
        font-size: 12px;
    }
    .miningProgressIndicator {
        margin-left:5px;
        font-size: 10px;
        line-height: 10px;
        font-weight:200;
    }

    .WEBD:hover + .balanceInfo, .balanceInfo:hover{
        right: 0px;
        transition: all 0.5s ease
    }

    .miningDetails:hover + .miningInfo, .miningInfo:hover{
        right: 0px;
        transition: all 0.5s ease
    }

    .hoverInfo .balanceTitle{
        text-align: left;
    }

    .hoverInfo .balanceText{
        grid-template-columns: 126px 1fr;
        grid-row-gap: 15px;
    }

    .hoverInfo svg{
        margin: 0;
        width: 16px;
        height: 16px;
        padding: 0;
    }

    #dashboardMining{
        overflow: hidden;
        position: fixed;
        bottom: 0px;
        height: 33px;
        background-color: #262626;
        display: block;
        left: 0;
        padding-bottom: 3px;
        right: 0;
        z-index: 120;
        border-top: solid 1px #3a3939;
    }

    .miningPowerThreads{
        font-size: 14px;
        display: inline-block;
        padding: 0 10px;
        vertical-align: top;
        padding-top: 8px;
        text-transform: uppercase;
        padding-bottom: 5px;
        color: #fff;
        letter-spacing: 5px;
        margin: 0;
    }


    .walletStartMining{
        position: relative;
        display: inline-block!important;
        vertical-align: top;
        left: 0;
        right: 0;
        font-size: 20px;
        color: #f20;
        cursor: pointer;
        text-align: center;
        transition: all .3s linear;
    }

    .walletStartMining a{
        padding-top: 5px;
        display: block;
        color: #000;
    }

    .walletStartMining a:hover{
        color: #ffc12c;
    }

    .walletStartMining:hover{
        background-color: #191919;
        transition: all .3s linear;
    }

    .miningController p{
        font-size: 20px;
        margin-right: -4px;
    }

    .miningDetails{
        display:flex;
        vertical-align: top;
        display: inherit;
        line-height: 32px;
        margin-top: 1px;
        margin-left: 35px;
    }

    .miningDetails p{
        margin-top: 0;
        color: #D5D5D5;
    }

    #threadsControll{
        display: inline-block;
        vertical-align: top;
        width: 100%;
        background-color: #1f1f1f;
    }

    #threadsControll .leftButton {
        float: left;
    }

    #threadsControll .rightButton {
        float: right;
    }

    #threadsControll .button p{
        padding-top: 3px;
        padding-bottom: 4px;
        line-height: 27px;
        margin: 0;
    }

    #allWallets{
        display: block;
    }

    .miningPowerText{
        font-size: 10px;
        display: inline-block;
        padding: 0 10px;
        vertical-align: top;
        padding-top: 5px;
        margin: 0;
        color: #fff;
    }


    .miningPowerText .secondWord{
        height: auto;
        line-height: 10px;
        margin: 0;
        font-weight: bold;
        color: #fff;
        margin-right: -4px;
    }


    #threadsControll .button{
        display: inline-block;
        background-color: #1f1f1f;
        color: #fff;
        font-size: 26px;
        border: solid 1px #565656;
        width: 31px;
        border-top: none;
        border-bottom: none;
        text-align: center;
        cursor: pointer;
        transition: all .3s linear;
    }

    #threadsControll .button:hover{
        background-color: #000;
        transition: all .3s linear;
    }

    #threadsControll .button:first-child{
        margin-top: 0;
    }

    #threadsNumber{
        font-size: 20px;
        padding: 0 10px;
        text-align: center;
        padding-bottom: 8px;
        line-height: 25px;
        display: inline-block;
        color: #fff;
        background-color: #d23c25;
        vertical-align: top;
        padding-top: 6px;
        border-right: solid 1px #3a3939;
        width: 40px;
        padding-left: 0;
        padding-right:0;
    }

    .whiteText{
        color: #c5c5c5;
        font-weight: 100;
        margin-left: 5px;
    }

    #miningController{
        width: 100%;
        height:100%;
        border-top:none;
        padding-bottom: 0;
        margin-bottom: 15px;
        display: inline-block;
        vertical-align: top;
    }

    #createWalletAddress{
        border: solid 1px #7b7b7b;
        padding-bottom: 0;
        margin-bottom: 15px;
        display: inline-block;
    }

    #createWalletAddress p:hover{
        background-color: #191919;
        transition: all .3s linear;
    }

    #createWalletAddress p{
        padding: 10px;
        padding-top: 14px;
        background-color: #353535;
        color: #bbb;
        display: inline-block;
        width: 214px;
        cursor: pointer;
        text-align: center;
        transition: all .3s linear;
    }

    .WEBD{
        display: inline-block;
        margin-left: 20px;
        font-size: 20px;
        color: #fec02c;
        vertical-align: top;
        margin-top: 0;
        float: right;
        min-width: 300px;
        text-align: center;
        border-left: solid 1px #333;
        line-height: 42px;
    }

    .miningDetails p{
        display: inline-block;
    }

    .miningBar{
        display: inline-block;
        width: 330px;
        margin-left: 0;
    }

    .miningAnimation{
        width: 18px !important;
        height: 18px !important;
        margin-top: 6px !important;
        vertical-align: top;
        margin-left: 3px;
        margin-top: 5px;
        margin-right: 4px;
    }

    .miningLoader{
        margin-left: 3px;
        margin-top: 5px;
        margin-right: 4px;
        vertical-align: top;
        width: 24px;
        height: 24px;
    }

    .showSumBallance{
        vertical-align: top;
        display: inline-block;
    }

    @media only screen and (max-width : 831px) {

        .balanceInfo{
            display: none;
        }

        .miningAnimation {
            position: absolute;
            right: -5px;
            top: 0;
        }

        .miningLoader {
            position: absolute;
            right: 0;
            top: 0;
        }

        .miningDetails{
            min-width:102px;
            max-width:102px;
            height:100%;
            position:relative;
            line-height: 13px !important;
            color: #969696;
            float: right;
            margin-right: 15px;
            display:flex;
        }

        .miningInfo {
            width: 100%;
            bottom: 44px;
            height: auto;
        }

        .miningTypeIndicator {
            margin:0;
            display:block !important;
        }
        .miningProgressIndicator {
            margin:0;
            padding-bottom:2px;
        }

        .miningBar{
            padding: 4px 0px;
        }

        .show-balance-span{
            font-size: 20px;
        }

        #dashboardMining{
            margin-bottom: 0;
        }
        #miningController, .walletStartMining, .WEBD{
            display: inline-block;
            
            
        }
        #miningController{
            background-color: #0000;
            margin-bottom: 0;
            height: 33px;
            border-top: none;
            margin-top: 50px;
            height:100%;
        }
        #threadsControll .button p{
            line-height: 43px;
        }
        #threadsControll .button{
            width: 80px;
        }
        .miningPowerThreads{
            line-height: 38px;
            font-size: 16px;
            margin-right: -4px;
        }
    
        .miningPowerText{
            display: none;
        }
        #threadsNumber{
            margin: 0 auto;
            text-align: center;
            float:left;
            position: relative;
            display: block;
            line-height: 34px;
            width: 35px;
            padding-top: 6px;
            padding-left: 0;
        }
        .WEBD{
            text-align: right;
            margin-right: 10px;
            min-width: auto;
            width: auto;
            border:none;
            line-height: 42px;
            display: none;
        }
        .miningPowerThreads{
            display:none;
        }
        #threadsControll .button{
            float:left;
        }
        .walletStartMining{
            margin-top:-29px;
        }
        #threadsControll{
            background-color: #f200;
        }
        #threadsControll .button p {
            line-height: 35px;
            font-size: 35px;
            padding-top: 7px;
        }
        #threadsControll .button:first-child{
            border:none;
        }
        #miningController{
            margin-top:0
        }
        #dashboardMining{
            height:40px;
        }
        .walletStartMining:hover{
            background-color: #f200;
        }

        #walletButton span{
            width: auto!important;
            color: #000;
            margin-left: 10px;
        }

    }

        @media only screen and (max-width : 600px) {

            .whiteText{
                display: none;
            }

        }

        @media only screen and (max-width : 500px) {

        .miningBar{
            width: 50%;
        }


    }

</style>


