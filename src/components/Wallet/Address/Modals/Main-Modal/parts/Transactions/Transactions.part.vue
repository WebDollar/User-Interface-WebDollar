<template>

    <div class="transferList" ref="refTransferList" >

        <p class="title">Transactions WEBD</p>

        <div class="headerTable">

            <span class="headerElement">From</span>
            <span class="headerElement">To</span>


        </div>

        <ul class="transferListContainer">

            <transaction v-for="(key, index) in transactions"
                     :transaction = "key"
                     :key="'transaction'+index"
            >

            </transaction>

        </ul>

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
            let data = WebDollar.Blockchain.Transactions.subscribeTransactionsChanges(address, (data)=>{
                this._addTransaction (data.transaction);
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
    }

    .transferListElement{
        font-size: 12px;
        color: #fff;
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-column-gap: 15px;
        white-space: nowrap ;
        text-align: left;
        background-color: #151515;
        padding: 5px 10px;
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
    }

    .transferListContainer .source{
        color: #c5c5c5;
    }

    .transferList .headerTable{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .headerElement{
        display: inline-block;
        text-align: center;
        color: #d4d4d4;
        margin-top: 15px;
        font-size: 14px;
    }

</style>