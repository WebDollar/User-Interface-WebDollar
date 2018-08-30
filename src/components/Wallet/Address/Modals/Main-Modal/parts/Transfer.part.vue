<template>
    <div class="transferList">

        <div class="offlineTransfer" v-if="this.offlineTransaction">

            <div class="step step1" :class="this.steps[0].passed ? 'passed' : ''">

                <div class="title" @click="backToStepOne()">
                    1. Action Type
                </div>

                <div class="stepContent" v-if="this.steps[0].contentOpen">

                    <span>
                        Do you want to create a new transaction or to propagate a already created transaction?
                    </span>

                    <div class="buttons">

                        <div class="modalButton" @click="choseActionType(true)">
                            Create
                        </div>

                        <div class="modalButton" @click="choseActionType(false)">
                            Propagate
                        </div>

                    </div>

                </div>

            </div>

            <div class="step step2" :class="this.steps[1].passed ? 'passed' : ''">

                <div class="title" @click="backToStepTwo()">
                    2. Internet Connection
                </div>

                <div class="stepContent" v-if="this.steps[1].contentOpen">

                    <span v-if="this.steps[1].error">
                        Your internet connection if <span class="hilight" :class="this.checkInternetConnection() ? '' : 'hilightRed'">{{ this.checkInternetConnection() ? 'Online' : 'Offline'}}</span>,
                        In order to {{ this.steps[2].typeCreate ? 'create' : 'propagate' }} the offline transaction first you should {{ this.choseInternetInstruction() }} internet and then recheck the connection by pressing the following button.
                    </span>

                    <div class="modalButton fullWidthButton" @click="validateInternetConnection()">
                        Check Connection
                    </div>

                </div>

            </div>

            <div class="step step3" :class="this.steps[2].passed ? 'passed' : ''" v-if="this.steps[1].passed">

                <div class="title">
                    {{ this.steps[2].typeCreate ? '3. Offline Transaction' : '3. Propagate Online Transaction'}}
                </div>

                <div class="stepContent" v-if="this.steps[2].contentOpen && !this.steps[2].typeCreate">

                    <span v-if="this.steps[2].error">
                        eroare
                    </span>

                    <label class="myLabel">

                        <input ref="importedTransaction" type="file" v-on:change="this.handleImportTransaction" multiple size="50" />

                        <div class="modalButton fullWidthButton">
                            Propagate Transactions
                        </div>

                    </label>

                </div>

            </div>

        </div>

        <div class="transfer" @keyup.enter="handleCreateTransaction(undefined,offlineTransaction)" v-if="!this.offlineTransaction || (this.steps[2].contentOpen && this.steps[2].typeCreate)">
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
                    <input v-model="toAmount" @keyup="this.handleChangeToAmount" type="number" class="amount" placeholder="WEBD Amount"/>
                    <input v-model="fee" @keyup="this.handleChangeToFee" class="amount" type="number" placeholder="Fee"/>
                </div>
            </div>

            <span class="editError editError2" v-html="this.errorToAmountMessage" :class="this.errorToAmountMessage ? '' : 'hide'"></span>

            <button class="button marginBottomButton" @click="handleCreateTransaction(undefined,offlineTransaction)" :class="this.successMessage ? 'hide' : ''" >
                {{ this.offlineTransaction ? 'CREATE TRANSACTION' : 'SEND WEBD' }}
            </button>

            <span v-if="!this.offlineTransaction" class="offlineTransaction" @click="switchToOfflineTransfer()">
                Offline Transaction
            </span>
        </div>

    </div>
</template>

<script>

    import Notification from "helpers/Notification.helpers"
    import BrowserHelpers from "helpers/Browser.helpers"
    import FileSaver from './../../../../../../../node_modules/file-saver'

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
                offlineTransaction:false,
                errorMessage: '',
                errorToAddressMessage: '',
                errorToAmountMessage: '',
                successMessage: '',
                steps:[{
                        passed:true,
                        contentOpen:true
                    },
                    {
                        passed:false,
                        contentOpen:false,
                        error:false
                    },
                    {
                        passed:false,
                        contentOpen:false,
                        typeCreate:true,
                        error:false
                    }]
            }
        },

        mounted(){

            if (typeof window === 'undefined') return;

        },

        computed:{

            getAddressPic(){

                return WebDollar.Blockchain.Wallet.getAddressPic(this.toAddress);

            }

        },

        methods:{

            async handleCreateTransaction(e,offline=false){

                this.toAmount = Number(this.toAmount);
                this.fee = Number(this.fee);

                this.handleChangeToAddress();

                if (this.fee === 0) {
                    this.errorToAmountMessage = 'Fee should not be 0';
                    return false;
                }

                if (this.fee * WebDollar.Applications.CoinsHelper.WEBD < WebDollar.Applications.CONSTS.MINING_POOL.MINING.FEE_THRESHOLD){
                    this.errorToAmountMessage = 'Fee is too small, and miners won\'t process your transaction';
                    return false;
                }

                if (this.errorToAddressMessage !== '' || this.errorToAmountMessage !== '' ) return false;

                let amountToSend = parseInt(this.toAmount * WebDollar.Applications.CoinsHelper.WEBD);
                let feeToSend = parseInt(this.fee * WebDollar.Applications.CoinsHelper.WEBD);
                let answer;

                if (offline){

                    answer = await WebDollar.Blockchain.Transactions.wizard.validateTransaction( this.address, this.toAddress, amountToSend, feeToSend );

                    if (answer.result){

                        let data = {
                            transaction: answer.transaction.serializeTransaction(),
                            signature: answer.signature
                        };

                        this.handleExportTransaction(data);

                        this.toAddress = '';
                        this.toAmount = '';
                        this.fee = '';

                        this.$emit('onTransferSuccess', answer.message);

                    } else {
                        this.errorMessage = answer.message;
                        this.successMessage = '';
                    }

                }
                else{

                    answer = await WebDollar.Blockchain.Transactions.wizard.createTransactionSimple( this.address, this.toAddress, amountToSend, feeToSend );

                    if (answer.result){

                        Notification.addAlert("error-firewall", "warn", "Transaction Created", "Transaction to "+ this.toAddress + " with " +  BrowserHelpers.formatMoneyNumber(amountToSend)+"WEBD has been created.",5000);

                        this.toAddress = '';
                        this.toAmount = '';
                        this.fee = '';

                        this.$emit('onTransferSuccess', answer.message);

                    } else {
                        this.errorMessage = answer.message;
                        this.successMessage = '';
                    }

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

            decimalPlaces(num) {
                var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                if (!match) { return 0; }
                var decimalsNumber= Math.max(
                    0,
                    (match[1] ? match[1].length : 0)
                    - (match[2] ? +match[2] : 0));

                if (decimalsNumber>4) return parseFloat(num).toFixed(4);
                    else return num;
            },

            handleChangeToAmount(e){

                this.toAmount = this.decimalPlaces(this.toAmount);

                this.errorToAmountMessage = '';

                this.fee = WebDollar.Blockchain.Transactions.wizard.calculateFeeSimple ( this.toAmount * WebDollar.Applications.CoinsHelper.WEBD) / WebDollar.Applications.CoinsHelper.WEBD;

                try {

                    let balance = WebDollar.Blockchain.blockchain.accountantTree.getBalance(this.address, undefined);

                    if (balance === null) throw "Balance is empty";

                    let total = (parseFloat(this.toAmount) + this.fee ) * WebDollar.Applications.CoinsHelper.WEBD;

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

                if (this.fee===0 || this.fee===undefined || this.errorToAmountMessage!==''){

                    this.fee = 10;

                }

            },

            handleChangeToFee(e){

                this.fee = this.decimalPlaces(this.fee);

                this.errorToAmountMessage = '';

            },

            switchToOfflineTransfer(){

                this.offlineTransaction = !this.offlineTransaction;

            },

            choseActionType(value){

                this.steps[1].passed = true;
                this.steps[1].contentOpen = true;
                this.steps[0].contentOpen = false;

                if(value)
                    this.steps[2].typeCreate=true;
                else
                    this.steps[2].typeCreate=false;

            },

            checkInternetConnection(){

                return navigator.onLine

            },

            choseInternetInstruction(){

                if (this.steps[2].typeCreate){

                    if(this.checkInternetConnection)
                        return 'disconnect from the';

                }else{

                    if(this.checkInternetConnection)
                        return 'connect to the';

                }

                return false;

            },

            validateInternetConnection(){

                if (this.steps[2].typeCreate && !this.checkInternetConnection){

                    this.steps[2].passed = true;
                    this.steps[2].contentOpen = true;
                    this.steps[1].contentOpen = false;

                    this.steps[1].error = false;
                    return true;
                }

                if (!this.steps[2].typeCreate && this.checkInternetConnection){

                    this.steps[2].passed = true;
                    this.steps[2].contentOpen = true;
                    this.steps[1].contentOpen = false;

                    this.steps[1].error = false;
                    return true;
                }

                this.steps[1].error = true;

                return false;

            },

            backToStepOne(){

                this.steps[1].passed = false;
                this.steps[1].contentOpen = false;
                this.steps[1].error = false;

                this.steps[2].passed = false;
                this.steps[2].contentOpen = false;

                this.steps[0].contentOpen = true;

            },

            backToStepTwo(){

                if(!this.steps[0].contentOpen){

                    this.steps[1].passed = true;
                    this.steps[1].contentOpen = true;
                    this.steps[1].error = false;

                    this.steps[2].passed = false;
                    this.steps[2].contentOpen = false;

                    this.steps[0].passed = true;
                    this.steps[0].contentOpen = false;

                }

            },

            async handleImportTransaction(){

                // dropzone tutorial https://www.html5rocks.com/en/tutorials/file/dndfiles/

                // Check for the various File API support.
                if ((window.File && window.FileReader && window.FileList && window.Blob) === false){
                    Notification.addAlert(undefined, "error", "Import Error", "The File import is not fully supported in this browser", 5000);
                }

                let fileInput = this.$refs['importedTransaction'];

                if ('files' in fileInput) {
                    if (fileInput.files.length === 0) {
                        Notification.addAlert(undefined, "error", "Import Error", "No file selected", 5000);
                    } else {

                        for (let i = 0; i < fileInput.files.length; i++) {

                            let file = fileInput.files[i];
                            let extension = file.name.split('.').pop();

                            if (extension === "txt") {
                                let reader = new FileReader();

                                try {
                                    reader.onload = async (e) => {

                                        //console.log(reader.result);
                                        let data = JSON.parse(reader.result);

                                        let myTransaction = await WebDollar.Blockchain.Transactions.wizard.deserializeValidateTransaction(data.transaction);

                                        let answer = await WebDollar.Blockchain.Transactions.wizard.propagateTransaction( data.signature , myTransaction );

                                        if (answer.result === true){

                                            this.toAddress = '';
                                            this.toAmount = '';
                                            this.fee = '';

                                            this.backToStepOne();
                                            this.switchToOfflineTransfer();

                                            this.$emit('closeModal');

                                            Notification.addAlert(undefined, "success", "Import Success", " Transaction has been propagated!", 5000);

                                        } else {
                                            Notification.addAlert(undefined, "error", "Import Error", answer.message, 5000);
                                        }

                                    };

                                } catch (exception){
                                    Notification.addAlert(undefined, "error", "Import Error","Your Uploaded file is not a valid JSON format", 5000);
                                }

                                reader.readAsText(file);
                            } else {
                                Notification.addAlert(undefined, "error","Import Error", "File not supported!", 5000);
                            }

                        }


                    }
                }

            },

            handleExportTransaction(data){

                let transactionData = new Blob( [JSON.stringify(data)], {type: "application/text;charset=utf-8"});

                let fileName = "transaction"+".txt";
                FileSaver.saveAs(transactionData, fileName);

                Notification.addAlert("error-firewall", "warn", "Offline Transaction", "The offline transaction to "+ this.toAddress + " has been created and saved on your device.",5000);

            },

        },

    }
</script>

<style>

    .modal .title {
        background-color: #262626;
        padding: 10px 0;
        text-transform: capitalize;
        letter-spacing: 2px;
        line-height: 18px;
    }

    .step, .step .title{
        display: block;
    }

    .step .title{
        text-align: left;
        padding-left: 10px!important;
        font-size: 16px;
        color: #757575;
        cursor: pointer;
    }

    .passed .title{
        color: #ffc12c
    }

    .offlineTransaction{
        cursor: pointer;
        text-align: center;
        color: #fff;
        display: block;
        margin-bottom: 15px;
        margin-top: 15px;
        font-size: 14px;
        letter-spacing: 1px;
        transition: all 0.5s ease;
    }

    .offlineTransfer{
        color: #fff;
    }

    .offlineTransaction:hover{
        color: #ffc12c;
        transition: all 0.5s ease;
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
        height: 36.5px!important;
        margin: 0 auto;
        border-radius: 0!important;
    }

    .imageAndInput{
        display: grid;
        grid-template-columns: 36px 1fr;
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

    .transfer .button{
        cursor: pointer;
    }

    .stepContent .buttons{
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 10px 0 0 0;
    }

    .stepContent .modalButton{
        background-color: #ffc12c;
        color: #000;
        letter-spacing: 1px;
        border: none;
        text-align: center;
        width: 90%;
        margin-bottom: 10px;
        box-sizing: border-box!important;
        transition: all 0.5s ease;
    }

    .stepContent .fullWidthButton{
        width: auto;
        margin: 0 10px;
        margin-top: 10px!important;
        margin-bottom: 10px!important;
        display: block;
    }

    .stepContent .modalButton:hover{
        background-color: #fff560;
        transition: all 0.5s ease;
    }

    .stepContent{
        text-align: left;
    }

    .stepContent span{
        padding: 10px 15px;
        font-size: 12px;
        display: block;
        width: auto;
        line-height: 18px!important;
        color: #d4d4d4!important;
    }

    .stepContent .hilight{
        color: #ffc12c!important;
        display: inline-block;
        padding: 2px;
    }

    .stepContent .hilightRed{
        color: #dc5f48!important;
    }

    .marginBottomButton{
        margin-bottom: 10px;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    @media only screen and (max-width: 600px){

        .imageAndInput{
            display: grid;
            grid-template-columns: 38px 1fr;
            background-color: #333;
        }

        .modal .transfer .address {
            padding: 6px 0 4px 10px;
        }

    }

</style>