<template>

    <div class="transferList" ref="refTransferList">

        <div v-show="objectIsEmpty(transactions)" class="noTransactions">

            <span class="miningAddress" style="color: white!important">You don't have any transaction in last 20 blocks</span>

        </div>

        <div v-show="!objectIsEmpty(transactions)">

            <span class="miningAddress" style="color: white!important">Transactions from last 20 blocks</span>

            <div class="headerTable">

                <span class="headerElement fromItem">From</span>
                <span class="headerElement">To</span>
                <span class="headerElement">Status</span>

            </div>


            <ul class="transferListContainer">

                <transaction v-for="(tx, index) in orderedTransactions"
                             :transaction = "tx"
                             :key="'transaction'+index"
                >

                </transaction>

            </ul>

        </div>

    </div>

</template>

<script>

    import Vue from "vue";
    import Transaction from "./Transaction.element.vue"
    import Notification from "helpers/Notification.helpers"

    export default {

        components:{ Transaction },

        props:{
            address: {default: null},
        },

        data: ()=>{
            return {
                transactions : {},
                subscription: null,
                transactionsLength: 0,
            }
        },

        mounted(){

            if (typeof window === "undefined") return false;

            //subscribe to transactions changes
            let data = WebDollar.Blockchain.Transactions.subscribeTransactionsChanges(this.address, (data)=>{

                if (data.transaction !== undefined)
                    this._addTransaction (data.transaction);
                else
                    Vue.delete(this.transactions, data.txId );

                this.$forceUpdate();

            });

            if (data !== null && data.result) {
                this.subscription = data.subscription;
                this._addTransactions(data.transactions);
            }

        },

        computed: {

            orderedTransactions() {

                let sortable = [];
                for (let i in this.transactions) {
                    sortable.push( this.transactions[i] );
                }

                return sortable.sort(function(a, b) {
                    return a._index - b._index;
                });

            }
        },

        methods:{

            _addTransaction(transaction){

                // in case it is a new transaction
                if (this.transactions[transaction.txId] === undefined) {
                    transaction._index =  -( ++this.transactionsLength );
                }

                let oldTransaction = this.transactions[transaction.txId];

                Vue.set(this.transactions, transaction.txId, transaction);

                if (transaction.confirmed && (oldTransaction !== undefined && oldTransaction.confirmed === false)){
                    Notification.addAlert(undefined, "success", "Transaction Confirmed", "Transaction to "+ this.toAddress + " with " +  BrowserHelpers.formatMoneyNumber(amountToSend)+"WEBD has been confirmed.",5000);
                }

            },

            _addTransactions(transactions){

                for (let key in transactions)
                    this._addTransaction(transactions[key]);

            },

            objectIsEmpty(obj) {

                // null and undefined are "empty"
                if (obj == null) return true;

                // Assume if it has a length property with a non-zero value
                // that that property is correct.
                if (obj.length > 0)    return false;
                if (obj.length === 0)  return true;

                // If it isn't an object at this point
                // it is empty, but it can't be anything *but* empty
                // Is it empty?  Depends on your application.
                if (typeof obj !== "object") return true;

                // Otherwise, does it have any properties of its own?
                // Note that this doesn't handle
                // toString and valueOf enumeration bugs in IE < 9
                for (var key in obj) {
                    if (hasOwnProperty.call(obj, key)) return false;
                }

                return true;
            }

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

</style>