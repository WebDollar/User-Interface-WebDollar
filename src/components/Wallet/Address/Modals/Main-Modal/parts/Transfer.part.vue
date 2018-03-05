<template>
    <div class="transfer">

        <p class="title">Transfer WEBD</p>

        <input v-model="this.toAddress" class="address" placeholder="Recipient Address"/>

        <input @keyup="this.handleChangeToAmount" v-model="toAmount" class="amount" placeholder="WEBD Amount"/>

        <span style="color: white; text-align: left">
            Fee <strong>{{ fee }}</strong> WEBD
        </span>

        <button class="button" @click="this.handleCreateTransaction" >
            SEND WEBD
        </button>

    </div>
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
                fee: '',
            }
        },

        methods:{

            handleCreateTransaction(){

                WebDollar.Blockchain.Transactions.createTransactionSimple( this.address, this.toAddress, this.toAmount, this.fee );

            },

            handleChangeToAmount(e){
                this.fee = WebDollar.Blockchain.Transactions.calculateFeeSimple ( this.toAmount );
            }

        },


    }
</script>