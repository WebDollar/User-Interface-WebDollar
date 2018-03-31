<template>

    <div class="transferList" ref="refTransferList" >

        Transactions List

        <div class="header">

            <span class="headerElement">Address Source</span>

            <span class="headerElement">Destination</span>

            <div class="headerElement">Amount & currency</div>

        </div>

        <ul class="transferListContainer">

            <transaction v-for="(data, index) in this.transactions"
                     :trannsaction = "data.transaction"
                     :confirmed= "data.confirmed"
                     :key="'transaction'+index"
            >

            </transaction>

        </ul>

    </div>

</template>

<script>

    import Transaction from "./Transaction.element.vue"

    export default {

        components:{ Transaction },

        props:{
            address: {default: null},
        },

        data: ()=>{
            return {
                transactions : [],
            }
        },

        mounted(){

            if (typeof window === "undefined") return false;

            this.transactions = WebDollar.Blockchain.Transactions.listTransactions(this.address);

            console.log("this.transactions", this.transactions);

        }

    }
</script>