<template>
    <div id="dashboardMining" class="walletSection" >

        <div id="minningController">
            <p class="miningPowerText">Mining <br/> <span class="secondWord">Power</span></p>
            <strong id="threadsNumber" :style="{background: this.workers ? 0 : '#d23c25'}">{{this.workers}}</strong>

            <div type="button" class="miningBar">
                <slider ref="refMiningSlider" @sliderChanged="this.changeWorkers" />
            </div>

            <div id="miningDetails">
                <p class="" :style="{display: this.hashesPerSecond==0 && this.started==true ? 'none' : 'inline-block'}">{{this.started ? this.hashesPerSecond + ' hash/sec' : 'not started'}} </p>
                <svg :style="{display: this.hashesPerSecond==0 && this.started==true ? 'inline-block' : 'none'}" version="1.1" id="miningLoader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
            </div>
            <p class="WEBD">
                <svg :style="{display: this.loaded==false ? 'inline-block' : 'none'}" version="1.1" id="miningLoader" class="miningLoader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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

                <show-sum-balances :style="{display: this.loaded==false ? 'none' : 'inline-block'}" :addresses="this.addresses" :currency="this.currency" ref="refShowSumBalances" /> <b class="whiteText">WEBD</b>

                <div class="hoverBalanceInfo" >
                    <div class="balanceText">

                        <div class="balanceTitle helpCursor" style="letter-spacing: 0.5px;" title="Balance available to be spent">
                            Current Balance:
                        </div>
                        <div class="balanceAmount helpCursor" title="Balance available to be spent">
                            <show-sum-balances :addresses="this.addresses" :currency="this.currency" ref="refShowSumAvailableBalances" />
                        </div>

                        <div class="balanceTitle helpCursor" title="The balance you will have at the next block mined by your pool">
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

    export default{

        name: 'Mining',

        components: {
            ShowSumBalances,
            slider,
            ShowBalance,
        },

        props: [
            'addresses',
            'currency',
            "startAutomatically",
        ],

        data: function () {
            return {
                started: false,
                hashesPerSecond: 0,
                workers: localStorage.getItem("miner-settings-worker-count") || 0,
                minerAddress:'',
                status: '',
                loaded:false,
                stopTimerHandler: null,

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

                this.started = WebDollar.Blockchain.Mining.started;

            });

            WebDollar.StatusEvents.on("mining/reset", ()=>{

                this.started = WebDollar.Blockchain.Mining.started;

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

        }
        ,
        methods: {
        
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
            }

        }


    }

</script>

<style>

    .hoverBalanceInfo{
        position: fixed;
        float: right;
        background-color: #383838;
        color: #fff;
        border-top: solid 1px #3a3939;
        border-left: solid 1px #3a3939;
        height: 80px;
        width: 300px;
        bottom: 37px;
        right: -300px;
        z-index: 1;
        transition: all 0.5s ease;
    }

    .WEBD:hover + .hoverBalanceInfo, .hoverBalanceInfo:hover{
        right: 0px;
        transition: all 0.5s ease
    }

    #miningLoader{
        vertical-align: top;
        width: 24px;
        height: 24px;
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
        z-index: 95;
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

    .minningController p{
        font-size: 20px;
        margin-right: -4px;
    }

    #miningDetails{
        vertical-align: top;
        display: inline-block;
        line-height: 32px;
        margin-top: 1px;
        margin-left: 35px;
    }

    #miningDetails p{
        margin-top: 0;
        font-size: 12px;
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
        /*border-top: solid 1px #7b7b7b;*/
        display: block;
        /*padding-top: 10px;*/
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

    #minningController{
        width: 100%;
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

    #miningDetails p{
        display: inline-block;
    }

    .miningBar{
        display: inline-block;
        width: 330px;
        margin-left: 0;
    }

    .miningLoader{
        margin-top: 5px;
    }

    @media only screen and (max-width : 831px) {

        .hoverBalanceInfo{
            display: none;
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
        #minningController, .walletStartMining, .WEBD{
            display: inline-block;
            width: 100%;
        }
        #minningController{
            background-color: #0000;
            margin-bottom: 0;
            height: 33px;
            border-top: none;
            margin-top: 50px;
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
        #miningDetails{
            line-height: 41px;
            color: #969696;
            float: right;
            margin-right: 15px;
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
        #minningController{
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


