<template>
    <form class="transfer">

        <p class="title">Transfer WEBD</p>

        <input v-model="this.toAddress" class="address" placeholder="Recipient Address"/>

        <input v-model="this.toAmount" class="amount" placeholder="WEBD Amount"/>

        <button type="submit" class="button" @click="this.handleCreateTransaction" >
            SEND WEBD
        </button>

    </form>
</template>

<script>
    export default {

        props:{
            address: {default: null},
        },

        data: () => {
            return {
                toAddress: '',
                toAmount: '',
            }
        },

        methods:{
            handleCreateTransaction(){

                WebDollar.Blockchain.Transactions.createTransactionSimple( this.address, this.toAddress, this.toAmount );

            }
        }

    }
</script>