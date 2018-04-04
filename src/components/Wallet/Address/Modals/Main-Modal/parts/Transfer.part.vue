<template>
    <div class="transferList">

        <p class="title">Transfer WEBD</p>

        <div class="transfer">
            <div >
                <div class="imageAndInput">

                    <div>
                        <img class="walletAddressImage transferWalletAddressImage" :src="this.getAddressPic" :class="this.errorToAddressMessage==='Invalid Address' ? 'hide' : ''" >
                    </div>
                    <div>
                        <input class="address " @keyup="this.handleChangeToAddress" v-model="toAddress" placeholder="Recipient Address"/>
                    </div>

                </div>

                <span class="editError" v-html="this.errorToAddressMessage" :class="this.errorToAddressMessage ? '' : 'hide'"></span>

            </div>

            <div>
                <div class="moneyBox">
                    <input @keyup="this.handleChangeToAmount" v-model.number="toAmount" type="number" class="amount" placeholder="WEBD Amount"/>
                    <input @keyup="this.handleChangeToFee" v-model.number="fee" class="amount" type="number" placeholder="Fee"/>
                </div>
            </div>

            <span class="editError" v-html="this.errorToAmountMessage" :class="this.errorToAmountMessage ? '' : 'hide'"></span>

            <div>
                <span class="transferError" v-html="this.errorMessage" :class="this.errorMessage ? '' : 'hide'"/>
                <span class="transferSuccess" v-html="this.successMessage" :class="this.successMessage ? '' : 'hide'"/>
            </div>

            <button class="button" @click="this.handleCreateTransaction" :class="this.successMessage ? 'hide' : ''" >
                SEND WEBD
            </button>
        </div>

    </div>
</template>

<script>
    export default {

        //@onTransferSuccess
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
                errorToAmountMessage: '',
                successMessage: '',
            }
        },


        computed:{

            getAddressPic(){
                return WebDollar.Blockchain.Wallet.getAddressPic(this.toAddress);
            }

        },

        methods:{

            async handleCreateTransaction(){

                this.handleChangeToAddress();

                if (this.fee === 0) {
                    this.errorMessage = 'Fee should not be 0';
                    return false;
                }

                if (this.fee * WebDollar.Applications.CoinsHelper.WEBD < WebDollar.Applications.CONSTS.MINING_POOL.MINING_FEE_THRESHOLD){
                    this.errorMessage = "Fee is too small, and miners won't process your transaction";
                    return false;
                }

                if (this.errorToAddressMessage !== '' || this.errorToAmountMessage !== '' ) return false;

                let answer = await WebDollar.Blockchain.Transactions.wizard.createTransactionSimple( this.address, this.toAddress, this.toAmount * WebDollar.Applications.CoinsHelper.WEBD, this.fee * WebDollar.Applications.CoinsHelper.WEBD );

                if (answer.result){

                    this.errorMessage = '';
                    console.info("Transaction has been created", answer.message);

                    this.toAddress = '';
                    this.toAmount = '';
                    this.fee = '';

                    this.$emit('onTransferSuccess', answer.message);

                } else {
                    this.errorMessage = answer.message + " <br/> "+ answer.reason;
                    this.successMessage = '';
                }

            },

            handleChangeToAddress(e){

                try {

                    if ( WebDollar.Applications.AddressHelper.getUnencodedAddressFromWIF(this.toAddress) === null ) {
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

                this.errorToAmountMessage = '';

                this.fee = WebDollar.Blockchain.Transactions.wizard.calculateFeeSimple ( this.toAmount * WebDollar.Applications.CoinsHelper.WEBD ) / WebDollar.Applications.CoinsHelper.WEBD;

                try {

                    let balance = WebDollar.Blockchain.blockchain.accountantTree.getBalance(this.address, undefined);

                    if (balance === null) throw "Balance is empty";

                    let total = (this.toAmount + this.fee ) * WebDollar.Applications.CoinsHelper.WEBD;

                    if ( balance < total ) {
                        console.error("Insufficient funds", {balance:balance, toAmount: this.toAmount, fee:this.fee})
                        throw "Insufficient Funds";
                    }

                } catch (exception){

                    if (typeof exception === "string")
                        this.errorToAmountMessage = exception.toString();
                    else
                        this.errorToAmountMessage = exception.message;

                    this.fee = '';
                }

            },

            handleChangeToFee(e){

                this.errorToAmountMessage = '';

            }

        },


    }
</script>

<style>

    .modal .title {
        background-color: #262626;
        padding: 10px 0;
        text-transform: uppercase;
        letter-spacing: 4px;
        line-height: 22px;
        color: #ffc12c;
    }

    .transferError{
        color: red;
    }


    .transferSuccess{
        color: #ffc12c;
        padding: 20px;
        display: block;
    }

    .transferFee{
        color: white;
        text-align: left;
    }

    .transferWalletAddressImage{
        position: relative;
        height: 34.5px!important;
        margin: 0 auto;
        border-radius: 0!important;
    }

    .imageAndInput{
        display: grid;
        grid-template-columns: 35px 1fr;
        background-color: #333;
    }

    .moneyBox{
        display: grid;
        grid-template-columns: 1fr 100px;
        grid-column-gap: 10px;
    }

    .hide{
        display: none!important;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

</style>