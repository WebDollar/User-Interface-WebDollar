<template>

    <div class="transferList" ref="refTransferList" >

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

                <transaction v-for="(key, index) in transactions"
                             :transaction = "key"
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

    export default {

        components:{ Transaction },

        props:{
            address: {default: null},
        },

        data: ()=>{
            return {
                transactions : {},
                subscription: null,
            }
        },

        mounted(){

            if (typeof window === "undefined") return false;

            //subscribe to transactions changes
            let data = WebDollar.Blockchain.Transactions.subscribeTransactionsChanges(this.address, (data)=>{

                if (data.transaction !== undefined){
                    this._addTransaction (data.transaction);
                }
                else
                    Vue.delete(this.transactions, data.txId );

                this.$forceUpdate();

            });

            if (data !== null && data.result) {
                this.subscription = data.subscription;
                this._addTransactions(data.transactions);
            }

        },

        methods:{

            _addTransaction(transaction){

                // in case it is a new transaction
                Vue.set(this.transactions, transaction.txId, transaction);

            },

            _addTransactions(transactions){

                for (let key in transactions){
                    this._addTransaction(transactions[key]);
                }

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
    }

    .noTransactions .transferList .miningAddress{
        letter-spacing: 1px!important;
        width: 90%!important;
    }

</style>