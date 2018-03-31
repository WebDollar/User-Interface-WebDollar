<template>
    <div class="transfer">

        <p class="title">Transfer WEBD</p>

        <div>
            <div >
                <img class="walletAddressImage transferWalletAddressImage" :src="this.getAddressPic" >
                <input class="transferWalletAddressEdit address " @keyup="this.handleChangeToAddress" v-model="toAddress" placeholder="Recipient Address"/>
            </div>
            <span class="editError" v-html="this.errorToAddressMessage" ></span>
        </div>

        <div>
            <input @keyup="this.handleChangeToAmount" v-model="toAmount" class="amount" placeholder="WEBD Amount"/>
            <span class="editError" v-html="this.errorToAmountMessage" ></span>
        </div>

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

                if (this.errorToAddressMessage !== '' || this.errorToAmountMessage !== '' ) return false;

                let answer = await WebDollar.Blockchain.Transactions.wizard.createTransactionSimple( this.address, this.toAddress, this.toAmount, this.fee );

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

                try {

                    let balance = WebDollar.Blockchain.blockchain.accountantTree.getBalance(this.address, undefined);

                    if (balance === null) throw "Balance is empty";

                    if ( balance.isLessThan(this.toAmount)  )
                        throw "Insufficient Funds";

                } catch (exception){

                    if (typeof exception === "string")
                        this.errorToAmountMessage = exception.toString();
                    else
                        this.errorToAmountMessage = exception.message;

                    this.fee = '';
                    return ;
                }

                this.fee = WebDollar.Blockchain.Transactions.wizard.calculateFeeSimple ( this.toAmount );

            }

        },


    }
</script>

<style>
    .transferError{
        color: red;
    }

    .editError{
        color:red;
    }

    .transferSuccess{
        color: yellow;
    }

    .transferFee{
        color: white;
        text-align: left;
    }

    .transferWalletAddressImage{
        position: absolute;
        left: 10px;
        height: 30px;
    }

    .transferWalletAddressEdit{
        margin-left: 40px !important;
        width: 90% !important;;
    }

</style>