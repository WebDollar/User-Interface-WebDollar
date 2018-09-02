<template>
    <div class="transferList">

        <div class="offlineTransfer" v-if="this.offlineTransaction">

            <h2>Offline Transaction</h2>

            <div class="step step1" :class="this.steps[0].passed ? 'passed' : ''">

                <div class="title" @click="backToStepOne()">
                    1. Chose Action Type
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
                    2. Secure Offline transaction
                </div>

                <div class="stepContent" v-if="this.steps[1].contentOpen">

                     <span v-if="this.steps[1].error===2 && this.steps[2].typeCreate">
                        You're not in private mode. In order to create a offline transaction, you should use incognito mode for higher level of security.
                    </span>

                    <span v-if="this.steps[1].error===1">
                        You're not sync with the network yet. In order to {{ this.steps[2].typeCreate ? 'create' : 'propagate' }}, you should be synchronized.
                    </span>

                    <span v-if="this.steps[1].error===3">
                        Your internet connection is "<span class="hilight" :class="this.internetConnection ? '' : 'hilightRed'">{{ this.internetConnection ? 'Online' : 'Offline'}}</span>",
                        In order to {{ this.steps[2].typeCreate ? 'create' : 'propagate' }} the offline transaction, you should first {{ this.choseInternetInstruction() }} internet and then recheck the connection, by pressing the following button to verify you are "{{ !this.internetConnection ? 'Online' : 'Offline'}}".
                    </span>

                    <div class="modalButton fullWidthButton" @click="validateSecurity()">
                        Check Security
                    </div>

                </div>

            </div>

            <div class="step step3" :class="this.steps[2].passed ? 'passed' : ''" v-if="this.steps[1].passed">

                <div class="title">
                    {{ this.steps[2].typeCreate ? '3. Wallet & Transaction' : '3. Propagate Online Transaction'}}
                </div>

                <div class="stepContent" v-if="this.steps[2].contentOpen && !this.steps[2].typeCreate">

                    <span v-if="this.steps[2].error">
                        eroare
                    </span>

                    <label class="myLabel">

                        <input ref="importedTransaction" type="file" v-on:change="this.handleImportTransaction" multiple size="50" />

                        <div class="modalButton fullWidthButton">
                            Chose tx file to propagate
                        </div>

                    </label>

                </div>

                <div class="stepContent" v-if="this.steps[2].contentOpen && this.steps[2].typeCreate">

                    <span v-if="this.steps[2].error">
                        eroare
                    </span>

                    <label v-if="!this.importedAddress" class="myLabel">

                        <input ref="reffImportedAddressOffline" type="file" v-on:change="this.handleImportAddressOffline" multiple size="50" />

                        <div class="modalButton fullWidthButton">
                            Import your wallet
                        </div>

                    </label>

                </div>

            </div>

        </div>

        <div class="transfer" @keyup.enter="handleCreateTransaction(undefined,offlineTransaction)" v-if="!this.offlineTransaction || (this.steps[2].contentOpen && this.steps[2].typeCreate && this.importedAddress)">
            <div >
                <div class="imageAndInput" :class="!this.offlineTransaction ? '' : 'hideTransactionImage'">

                    <div v-if="!this.offlineTransaction">
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
                {{ this.offlineTransaction ? 'EXPORT TRANSACTION' : 'SEND WEBD' }}
            </button>

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
            offlineTransaction: {default:false}
        },

        data: () => {
            return {
                timeLock:0,
                incognitoMode:false,
                syncronizedOnce: false,
                toAddress: '',
                internetConnection:true,
                toAmount: '',
                importedAddress:false,
                fee: '',
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

        async mounted(){

            if (typeof window === 'undefined') return;

            this.incognitoMode = await this.checkIncognito();

            this.checkInternetConnection();

            setTimeout(()=>{ this.checkInternetConnection(); }, 3000);

        },

        computed:{

            getAddressPic(){

                return WebDollar.Blockchain.Wallet.getAddressPic(this.toAddress);

            }

        },

        methods:{

            async handleImportAddressOffline(){

                if(this.internetConnection){

                    this.backToStepTwo();

                }else{

                    // TODO merge with the function for import tx
                    if ((window.File && window.FileReader && window.FileList && window.Blob) === false){
                        Notification.addAlert(undefined, "error", "Import Error", "The File import is not fully supported in this browser", 5000);
                    }

                    let fileInput = this.$refs['reffImportedAddressOffline'];

                    if ('files' in fileInput) {
                        if (fileInput.files.length === 0) {
                            Notification.addAlert(undefined, "error", "Import Error", "No file selected", 5000);
                        } else {

                            for (let i = 0; i < fileInput.files.length; i++) {

                                let file = fileInput.files[i];
                                let extension = file.name.split('.').pop();

                                if (extension === "webd") {
                                    let reader = new FileReader();

                                    try {
                                        reader.onload = async (e) => {

                                            //console.log(reader.result);
                                            let data = JSON.parse(reader.result);

                                            let answer = await WebDollar.Blockchain.Wallet.importAddressFromJSON(data);

                                            if (answer.result === true){
                                                this.importedAddress = answer.address;
                                                Notification.addAlert(undefined, "success", "Import Success", answer.address + " has been imported!", 5000);
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

                }

            },

            async handleCreateTransaction(e){

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

                if (this.offlineTransaction){

                    if(this.internetConnection){

                        this.backToStepTwo();

                    }else{

                        answer = await WebDollar.Blockchain.Transactions.wizard.validateTransaction( this.importedAddress, this.toAddress, amountToSend, feeToSend, undefined, undefined, this.timeLock-1, true );

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
                }
                else{

                    answer = await WebDollar.Blockchain.Transactions.wizard.createTransactionSimple( this.address, this.toAddress, amountToSend, feeToSend );

                    if (answer.result){

                        Notification.addAlert(undefined, "success", "Transaction Created", "Transaction to "+ this.toAddress + " with " +  BrowserHelpers.formatMoneyNumber(amountToSend)+"WEBD has been created.",5000);

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

                if(!this.offlineTransaction){

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

                }

            },

            handleChangeToFee(e){

                this.fee = this.decimalPlaces(this.fee);

                this.errorToAmountMessage = '';

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

                this.internetConnection = navigator.onLine;

            },

            choseInternetInstruction(){

                this.checkInternetConnection();

                if (this.steps[2].typeCreate){

                    if(this.internetConnection)
                        return 'disconnect from the';

                }else{

                    if(!this.internetConnection)
                        return 'connect to the';

                }

                return false;

            },

            validateSecurity() {

                this.checkInternetConnection();
                this.handleChangeToAmount();
                this.handleChangeToFee();

                let propagationError = false;

                if (!this.steps[2].typeCreate && this.internetConnection) {

                    this.steps[2].passed = true;
                    this.steps[2].contentOpen = true;
                    this.steps[1].contentOpen = false;

                    this.steps[1].error = false;
                    return true;

                }else if(!this.steps[2].typeCreate && !this.internetConnection){

                   propagationError = true;

                }

                if(this.incognitoMode){

                    if (WebDollar.Blockchain._synchronized || this.syncronizedOnce) {

                        this.syncronizedOnce = true;
                        this.timeLock = WebDollar.Blockchain.blockchain.blocks.length;

                        if (this.steps[2].typeCreate && !this.internetConnection) {

                            this.steps[2].passed = true;
                            this.steps[2].contentOpen = true;
                            this.steps[1].contentOpen = false;

                            this.steps[1].error = false;
                            return true;

                        }else{

                            this.steps[1].error = 3;
                            return false;

                        }

                    }else{

                        this.steps[1].error = 1;
                        return false;

                    }

                }else{

                    if(propagationError){

                        this.steps[1].error = 3;
                        return false;

                    }

                    this.steps[1].error = 2;
                    return false;

                }

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

                this.validateSecurity();

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

                            if (extension === "tx") {
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

                let fileName = "transaction"+".tx";
                FileSaver.saveAs(transactionData, fileName);

                Notification.addAlert(undefined, "success", "Offline Transaction", 'The offline transaction has been created and saved on your device. For keep your wallet totally safe, this browser tab will be closed in 5 seconds.',5000);

                setTimeout(()=>{ window.close(); }, 5000);

            },

            async checkIncognito() {

                let fs = window.RequestFileSystem || window.webkitRequestFileSystem;

                if (!fs) {
                    console.error("Not incognito mode");
                    return false;
                } else {

                    return await new Promise((resolve)=>{

                        fs(window.TEMPORARY, 100,
                            ()=> resolve(false),
                            ()=> resolve(true),
                        );

                    });

                }


            }

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
        margin: 10px 0;
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

    .hideTransactionImage{
        grid-template-columns: 1fr!important;
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

    .offlineTransfer h2{
        color: #ffffff;
        letter-spacing: 2px;
        font-size: 20px;
        font-weight: 500!important;
        line-height: 40px;
        margin-top: 13px;
        margin-bottom: 10px;
        transition: all .5s linear;
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