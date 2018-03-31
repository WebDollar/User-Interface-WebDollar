<template>

    <li class="transferListElement">

        <span class="source" title="Address Source"> {{this.transaction.from.addresses[0].unencodedAddress.toString("hex")}}</span>

        <ul class="destinations">

            <transaction-destination v-for="(toAddress, index) in this.transaction.to.addresses"
                   :key="'transactionDestination'+index"
                   :toAddress="toAddress"
            >
            </transaction-destination>

        </ul>

    </li>


</template>

<script>

    import TransactionDestination from "./Transaction-Destination.element.vue"

    export default{

        components:{ TransactionDestination },

        props:{
            transaction : {default: null },
            confirmed : {default: null },
        }



    }

</script>