<template>
    <div id="dashboardMining" class="walletSection" >

        <div id="minningController">
            <p class="miningPowerText">Mining <br/> <span class="secondWord">Power</span></p>
            <strong id="threadsNumber" :style="{background: this.miningWorkersCount ? 0 : '#d23c25'}">{{this.miningWorkersCount}}>1</strong>
            <div id="miningDetails">
                <p class="">{{this.statusMining||(this.hashesPerSecond.toString()+' hashes/sec')}} </p>
            </div>
        </div>

        <div type="button" class="walletStartMining">
            <div id="threadsControll">
                <div class="button leftButton" type="button" @click="this.destroyOneMiningWorker"> <p>-</p>
                </div>
                <p class="miningPowerThreads">Threads</p>
                <div class="button rightButton" type="button"  @click="this.createMiningWorker"> <p>+</p>
                </div>
            </div>
        </div>

        <p class="WEBD"> {{ Math.round(this.reward * 10000000) / 10000000 }} <b class="whiteText">WBD MINED</b></p>

    </div>
</template>

<script>

    export default{

        name: 'Mining',

        components: {
        },

        data: function () {
            return {
                hashesPerSecondFuture: 0,
                hashesPerSecond: 0,

                hashesGeneratedBestFuture: '',
                hashesGeneratedBest: '',

                reward: 0,

                hashesPerSecondClearInterval: null,

                miningWorkers: [],
                miningWorkersCount: 0,

                statusMining:'',
            }
        },

        computed:{

            startedMining(){
                return this.$store.state.mining.startedMining;
            },

        },

        props:{
            rewardPerHash: {default: 0.0000052},
        },

        methods:{

            createMiningWorker(){

                if(typeof(Worker) !== "undefined") {


                    let worker = new Worker("/public/WebDollar-dist/WebDollarMinerWorker.js");

                    worker.onmessage = this.puzzleReceivedFromWorker;

                    this.miningWorkers.push(worker);
                    this.miningWorkersCount += 1;

                } else {
                    alert("Sorry! No Web Worker support.");
                }

                if (this.miningWorkersCount === 1) {
                    this.statusMining = 'starting...';
                    this.initializeHashesPerSecondClearInterval();
                }

                this.$store.dispatch('MINING_CHANGE_WORKERS', {workers: this.miningWorkersCount});

            },

            stopAllMiningWorkers(){

                for (let i=this.miningWorkers.length-1; i>=0; i--)
                    this.destroyOneMiningWorker();

            },

            destroyOneMiningWorker(){

                if (this.miningWorkers.length > 0){
                    let minerWorker = this.miningWorkers.pop();
                    minerWorker.terminate();
                    minerWorker = undefined;
                    this.miningWorkersCount -= 1;
                }

                if (this.miningWorkersCount === 0){
                    this.suspendHashesPerSecondClearInterval();
                }

                this.$store.dispatch('MINING_CHANGE_WORKERS', {workers: this.miningWorkersCount});
            },

            initializeHashesPerSecondClearInterval(){
                //Setting HashesPerSecond Clear Interval

                let that = this;
                this.hashesPerSecondClearInterval = setInterval( function(){ that.hashesPerSecondClearTick() }, 1000);
            },

            suspendHashesPerSecondClearInterval(){
                clearInterval(this.hashesPerSecondClearInterval);
                this.statusMining = 'stopped';
            },

            hashesPerSecondClearTick(){
                this.hashesPerSecond = this.hashesPerSecondFuture;
                this.hashesGeneratedBest = this.hashesGeneratedBestFuture;


                this.reward += this.hashesPerSecond * this.rewardPerHash;


                this.hashesPerSecondFuture = 0;
                this.hashesGeneratedBestFuture = '1';

                this.statusMining = '';
            },

            startStopMining(){
                console.log('this.startedMining',this.startedMining);
                if (this.startedMining)  this.stopAllMiningWorkers();
                else this.createMiningWorker();
            },


            puzzleReceivedFromWorker(event) {
                this.hashesPerSecondFuture += event.data.count;

                //console.log(this.hashesGeneratedBest, event.data.hashesGeneratedBest,this.hashesGeneratedBest > event.data.hashesGeneratedBest);

                if (this.hashesGeneratedBestFuture > event.data.hashesGeneratedBest)
                    this.hashesGeneratedBestFuture = event.data.hashesGeneratedBest;

                this.hashesGeneratedBestZeros = event.data.hashesGeneratedBestZeros;

            },

        }

    }

</script>

<style>

    #dashboardMining{
        overflow: hidden;
        position: fixed;
        bottom: 0px;
        height: 30px;
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
        width: 20px;
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
        padding-top: 3px;
        float: right;
        min-width: 300px;
        text-align: center;
        border-left: solid 1px #444444;

        margin-top: 0;
    }

    @media only screen and (max-width : 831px) {
        #dashboardMining{
            height: 90px;
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
            border-top: solid 1px #616161;
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
        }
        .WEBD{
            margin-top: -35px;
            text-align: right;
            margin-right: 10px;
        }
        #threadsNumber{
            width: 30px;
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
            line-height: 34px;
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
            margin-top: -33px;
            font-size:14px;
        }

    }

</style>


