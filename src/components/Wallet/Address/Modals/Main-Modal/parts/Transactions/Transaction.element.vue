<template>

    <li v-if="transaction !== null" class="transferListElement" :class="!this.confirmed ? 'statusPending' : 'statusConfirmed'">

        <ul class="sources">

            <transaction-from v-for="(fromAddress, index) in transaction.from.addresses"
                              :key="'transactionSource'+index"
                              :fromAddress="fromAddress"
            >
            </transaction-from>

        </ul>

        <ul class="destinations">

            <transaction-to v-for="(toAddress, index) in transaction.to.addresses"
                            :key="'transactionDestination'+index"
                            :toAddress="toAddress"
            >
            </transaction-to>

        </ul>

        <div class="status">

            {{this.confirmed ? 'Confirmed' : 'Pending'}}

        </div>

    </li>

</template>

<script>

    import TransactionFrom from "./Transaction-From.element.vue"
    import TransactionTo from "./Transaction-To.element.vue"

    export default{

        components:{ TransactionFrom, TransactionTo },

        props:{
            transaction : {default: ()=>{return null} },
            confirmed : {default: false },
        }



    }

</script>

<style>

    .sources{
        margin: 0;
        padding: 0!important;
    }

    .statusPending{
        background-color: #423922;
    }

    .statusConfirmed{
        background-color: #1f2f18;
    }

    .status{
        line-height: 26px;
        text-align: center;
    }

</style>