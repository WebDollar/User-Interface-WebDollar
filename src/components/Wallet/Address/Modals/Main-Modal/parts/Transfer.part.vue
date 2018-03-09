<template>
    <div class="transfer">

        <p class="title">Transfer WEBD</p>

        <input @keyup="this.handleChangeToAddress" v-model="toAddress" class="address" placeholder="Recipient Address"/>
        <span class="toAddressError" v-html="this.errorToAddressMessage" ></span>

        <input @keyup="this.handleChangeToAmount" v-model="toAmount" class="amount" placeholder="WEBD Amount"/>

        <span class="transferFee">
            Fee <strong>{{ fee }}</strong> WEBD
        </span>

        <div>
            <span class="transferError" v-html="this.errorMessage"/>
            <span class="transferSuccess" v-html="this.successMessage"/>
        </div>

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

                errorMessage: '',
                errorToAddressMessage: '',
                successMessage: '',
            }
        },

        methods:{

            handleCreateTransaction(){

                this.handleChangeToAddress();

                if (this.errorToAddressMessage !== '') return false;

                let answer = WebDollar.Blockchain.Transactions.createTransactionSimple( this.address, this.toAddress, this.toAmount, this.fee );

                if (!answer.result){
                    this.errorMessage = answer.message + " <br/> "+ answer.reason;
                    this.successMessage = '';
                } else {
                    this.errorMessage = '';
                    this.successMessage = answer.message;
                }

            },

            handleChangeToAddress(e){

                try {
                    if (WebDollar.Applications.AddressHelper.validateAddressChecksum(this.toAddress) === null) {
                        this.errorToAddressMessage = 'Invalid Address';
                        return false;
                    }

                } catch (exception){
                    this.errorToAddressMessage = 'Invalid Address';
                    return false;
                }

                this.errorToAddressMessage = '';

            },

            handleChangeToAmount(e){

                this.fee = WebDollar.Blockchain.Transactions.calculateFeeSimple ( this.toAmount );

            }

        },


    }
</script>

<style>
    .transferError{
        color: red;
    }

    .toAddressError{
        color:red;
    }

    .transferSuccess{
        color: yellow;
    }

    .transferFee{
        color: white;
        text-align: left;
    }
</style>