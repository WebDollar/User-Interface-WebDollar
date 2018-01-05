<template>
    <div id="dashboardMining" class="walletSection" >

        <div id="minningController">
            <p class="miningPowerText">Mining <br/> <span class="secondWord">Power</span></p>
            <strong id="threadsNumber" :style="{background: this.workers ? 0 : '#d23c25'}">{{this.workers}}</strong>
            <div id="miningDetails">
                <p class="">{{this.started ? this.hashesPerSecond + ' hashes/sec' : 'not started'}} </p>
            </div>
        </div>

        <div type="button" class="walletStartMining">
            <div id="threadsControll">
                <div class="button leftButton" type="button" @click="this.destroyOneMiningWorker"> <p>-</p>
                </div>
                <p class="miningPowerThreads">Threads</p>
                <div class="button rightButton" type="button"  @click="this.createOneMiningWorker"> <p>+</p>
                </div>
            </div>
        </div>

        <p class="WEBD"> <ShowBalance :address="this.minerAddress" currency="1"/>  <b class="whiteText">WBD MINED</b></p>

    </div>
</template>

<script>

    import ShowBalance from "components/Wallet/Address/Balance/ShowBalance.vue";

    export default{

        name: 'Mining',

        components: {
            "ShowBalance":ShowBalance,
        },

        data: function () {
            return {

                started: false,
                hashesPerSecond: 0,

                workers: 0,
                minerAddress:'',
            }
        },

        computed:{
        },

        props:{

        },

        mounted() {

            if (typeof window === 'undefined') return;

            WebDollar.Blockchain.Mining.emitter.on("mining/hash-rate", (hashesPerSecond)=>{
                this.hashesPerSecond = hashesPerSecond;
            });

            WebDollar.Blockchain.Mining.emitter.on("mining/status-changed", (status)=>{

                this.started = WebDollar.Blockchain.Mining.started;

            });

            WebDollar.Blockchain.Mining.emitter.on("mining/reset", ()=>{

                this.started = WebDollar.Blockchain.Mining.started;

            });

            WebDollar.Blockchain.Mining.emitter.on("mining/workers-changed", ()=>{

                this.workers = WebDollar.Blockchain.Mining.workers;

            });

            this.minerAddress = WebDollar.Blockchain.Mining.minerAddress;
            WebDollar.Blockchain.Mining.emitter.on("mining/miner-address-changed", (minerAddress)=>{
                this.minerAddress = minerAddress;
            });

        },

        methods: {

            async startStopMining() {

                if (!WebDollar.Blockchain.Mining.started)
                    WebDollar.Blockchain.Mining.startMining();
                else
                    WebDollar.Blockchain.Mining.stopMining();

                return true;

            },

            destroyOneMiningWorker(){

                WebDollar.Blockchain.Mining.decreaseWorkers(1);

            },

            createOneMiningWorker(){

                WebDollar.Blockchain.Mining.increaseWorkers(1);

            },

        }


    }

</script>

<style>

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
        border-top: solid 1px #444444;
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
        position: absolute;
        display: block;
        margin: 0 auto;
        left: 0;
        right: 0;
        font-size: 20px;
        color: #f20;
        display: inline-block;
        width: 230px;
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
        display: inline-block;
        line-height: 32px;
        margin-left: 10px;
        margin-top: 0;
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

    #allWalets{
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
        padding-bottom: 4px;
        line-height: 25px;
        display: inline-block;
        color: #fff;
        background-color: #d23c25;
        vertical-align: top;
        padding-top: 4px;
        border-right: solid 1px #444;
        margin-right: -4px;
        width: 40px;
    }

    .whiteText{
        color: #c5c5c5;
        margin-left: 10px;
        font-weight: 100;
    }

    #minningController{
        border-top:none;
        padding-bottom: 0;
        margin-bottom: 15px;
        display: inline-block;
    }

    #createWalletAdress{
        border: solid 1px #7b7b7b;
        padding-bottom: 0;
        margin-bottom: 15px;
        display: inline-block;
    }

    #createWalletAdress p:hover{
        background-color: #191919;
        transition: all .3s linear;
    }

    #createWalletAdress p{
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
        border-left: solid 1px #444444;
        padding-top: 6px;
    }

    @media only screen and (max-width : 831px) {
        #dashboardMining{
            height: 45px!important;
            margin-bottom: 0;
        }
        #minningController, .walletStartMining, .WEBD{
            display: block;
            width: 100%;
        }
        #minningController{
            background-color: #0000;
            margin-bottom: 0;
            height: 33px;
            border-top: none;
            margin-top: 50px;
        }
        .walletStartMining{
            margin-top: -86px;
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
            display: none;
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
            width: 63px;
            padding-top: 6px;
            padding-left: 0;
        }
        .WEBD{
            margin-top: -35px;
            text-align: right;
            margin-right: 10px;
        }
        .miningPowerThreads{
            display:none;
        }
        #threadsControll .button{
            float:left;
        }
        .walletStartMining{
            margin-top:-33px;
            margin-left:50px;
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
    }

    @media only screen and (max-width : 451px) {

        #threadsControll .button{
            width: 50px;
        }

        .WEBD{
            margin-top: -35px;
            font-size:14px;
        }

    }

</style>


