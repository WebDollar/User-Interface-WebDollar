<template>

    <div class="transferList" ref="refTransferList" >

        <p class="title">Transfer WEBD</p>

        <div class="headerTable">

            <span class="headerElement">Source</span>
            <span class="headerElement">Amount</span>

            <span class="headerElement">Destination</span>
            <div class="headerElement">Amount</div>

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
            }
        },

        mounted(){

            if (typeof window === "undefined") return false;

            let transactions = WebDollar.Blockchain.Transactions.listTransactions(this.address);

            console.log("this.transactions", transactions);

            this._addTransactions(transactions)

        },

        methods:{

            _addTransaction(transaction){

                for (let key in this.transactions){

                    if (key === transaction.key){

                        this.transactions[key] = Object.assign( {}, transaction, { } );
                        return true;

                    }

                }

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
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .headerElement{
        display: inline-block;
        text-align: center;
        color: #d4d4d4;
        margin-top: 15px;
        font-size: 14px;
    }

</style>