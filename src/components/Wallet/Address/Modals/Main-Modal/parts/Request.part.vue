<template>

    <div class="transferList" ref="refTransferList">

        <div class="transfer requestTransaction">
            <div>
                <div >
                    <input v-model="toAmount" type="number" class="amount" placeholder="WEBD Amount"/>
                </div>

                <span class="editError thisError" v-html="this.errorToAddressMessage" :class="this.errorToAddressMessage ? '' : 'hide'"></span>

                <button class="button marginBottomButton" @click="copyToClipboard" >
                    COPY LINK
                </button>
            </div>
        </div>

    </div>

</template>

<script>

    var Vue = require('vue/dist/vue.min.js');

    import Clipboard from '../../../../../../../node_modules/v-clipboard/dist/index.min'
    import Transaction from "./Transactions/Transaction.element.vue"

    Vue.use(Clipboard);

    export default {

        components:{ Transaction },

        props:{
            address: {default: null},
        },

        data: ()=>{
            return {
                toAmount: undefined,
                errorToAddressMessage: undefined
            }
        },

        mounted(){

            if (typeof window === "undefined") return false;

        },

        methods:{

            copyToClipboard(){

                if( this.toAmount !== undefined){

                    this.errorToAddressMessage = undefined;
                    this.$clipboard('https://webdollar.io/payment/'+this.address+'/'+this.toAmount);

                }
                else
                    this.errorToAddressMessage = 'You need to fill the amount input'
            },

        }

    }
</script>


<style>

    .transferListContainer{
        list-style: none;
        padding: 0;
        max-height: 200px;
        overflow: scroll;
        overflow-x:hidden;
    }

    .transferListContainer::-webkit-scrollbar{
        width:7px;height:7px
    }
    .transferListContainer::-webkit-scrollbar-track{
        background:rgba(100,100,100,0.1)!important;
    }
    .transferListContainer::-webkit-scrollbar-thumb{
        background: rgba(41, 41, 41, 0.5)!important;
        border: solid 1px rgba(31, 31, 31, 0.5)!important;
        border-radius: 4px;
    }

    .transferList::-webkit-scrollbar{
        width:7px;height:7px
    }
    .transferList::-webkit-scrollbar-track{
        background:rgba(100,100,100,0.1)!important;
    }
    .transferList::-webkit-scrollbar-thumb{
        background: rgba(41, 41, 41, 0.5)!important;
        border: solid 1px rgba(31, 31, 31, 0.5)!important;
        border-radius: 4px;
    }

    .transferListElement{
        font-size: 12px;
        color: #fff;
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 1fr 60px;
        white-space: nowrap ;
        text-align: left;
        background-color: #151515;
        padding: 5px 10px;
        border-bottom: solid 1px#262626;
        border-top: solid 1px#262626;
    }

    .transferListElement:hover{
        background-color: #1f1f1f!important;
        transition: all 0.5s ease;
    }

    .destinations{
        list-style: none;
        padding: 0;
    }

    .money, .destinationAddress{
        display: inline-block;
    }

    .destinationAddress{
        width: 70%;
        overflow: hidden;
    }


    .money{
        width: 20%;
        padding-left: 10px;
        display: inline-block;
        float: right;
        text-align: right;
    }

    .currency{
        margin-left: 5px;
    }

    .pairListElement{
        background-color: #333333;
    }

    .transferListContainer .money{
        color:#ffc12c;
        line-height: 26px;
    }

    .transferListContainer .source{
        color: #c5c5c5;
    }

    .transferList .title{
        margin: 10px 0;
    }

    .transferList .headerTable{
        display: grid;
        grid-template-columns: 1fr 1fr 60px;
        background-color: #262626;
        color: #fff!important;
        padding: 5px 0 5px 10px;
    }

    .headerTable span{
        width: 100%!important;
    }

    .headerElement{
        display: inline-block;
        color: #d4d4d4!important;
        font-size: 14px;
        text-align: left;
    }

    .transactionElement{
        display: grid;
        grid-template-columns: 30px 1fr;
    }

    .transactionElement img{
        height: 26px!important;
    }

    .transferList .miningAddress{
        color: #737373 !important;
        padding: 7px 0;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 10px;
        width: 90%;
        margin: 0 auto;
    }

    .noTransactions .transferList .miningAddress{
        letter-spacing: 1px!important;
        width: 90%!important;
    }

    .noTransactions .miningAddress{
        line-height: 18px;
    }

    .requestTransaction{
        margin-top: 10px;
    }

    .thisError{
        padding: 11px 0 5px 3px;
    }

</style>