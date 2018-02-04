<template>

    <div>

        <Modal title="Wallet Address Secure" ref="refPassModal">

            <div slot="content">

                <div >

                    <div class="inputAndGeneratorPass">
                        <div>
                            <input placeholder="Your 12 words Password" v-model="walletAddressPassword" class="inputDeleteModalPass"/>
                        </div>
                        <div>
                            <div @click="this.generateRandomPassword" class="modalButtonPass generatorButtonPass">
                                Generate random password
                            </div>
                        </div>
                    </div>

                    <span class="errorMessage">{{this.errorMessage}}</span>

                    <div @click="this.createPassword" class="modalButtonPass">
                        Set Password
                    </div>

                </div>

            </div>

        </Modal>

    </div>

</template>

<script>

    let Vue = require('vue/dist/vue.min.js');
    import Modal from "components/UI/modal/Modal.vue";

    import Clipboard from './../../../../../node_modules/v-clipboard';

    Vue.use(Clipboard);

    export default {

        props: {
            address: {default: null},
            toAddress: {default: null},
            toAmount: {default: 0.0},
        },

        components: {
            "Modal":Modal,
        },

        data: () => {
            return {
                clipboardText: 'Copy to Clipboard',
                walletAddressPassword: '',
                errorMessage: ''
            }
        },

        methods: {

            closeModal() {
                this.$refs['refPassModal'].closeModal();
            },

            showModal(e) {

                if (this.$refs['refPassModal'].modalOpened === false){
                    this.$refs['refPassModal'].showModal();
                }

            },

            copyToClipboard(){

                this.clipboardText = 'Copied';
                this.$clipboard(this.walletAddressPassword);

            },

            generateRandomPassword(){

                let wordsArray = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z'];
                this.walletAddressPassword = [];

                for (let i = 0; i < 12; ++i){

                    let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
                    let index = this.walletAddressPassword.lastIndexOf(randomWord);

                    if (index === -1){
                        this.walletAddressPassword += randomWord;
                        if (i < 11)
                            this.walletAddressPassword += " ";
                    } else {
                        i--;
                    }
                }

            },

            async createPassword(){

                let okPassword = true;
                let wordsArray = this.walletAddressPassword.split(' ');
                let wordsArraySize = wordsArray.length;

                if (wordsArraySize !== 12){

                    this.errorMessage = "The password should contain 12 words, but you have " + wordsArraySize + " words.";
                    okPassword = false;

                }

                if (okPassword === true){

                    for (let i = 0; i < wordsArraySize; i++){

                        let index = wordsArray.lastIndexOf(wordsArray[i]);

                        if  (index !== i){

                            this.errorMessage = "The password should contain different words, but you are repeating '"+wordsArray[i]+"' word.";
                            okPassword = false;

                        }

                    }

                }

                if(okPassword === true){

                    this.errorMessage = '';
                    let oldPassword = undefined;

                    if (await WebDollar.Blockchain.Wallet.isAddressEncrypted(this.address)) {

                        let response = prompt("Please enter your last password(12 words separated by space");
                        oldPassword = response.split(' ');

                        if (oldPassword.length !== 12) {
                            alert('Your old have ' + oldPassword.length + ' words! It should have 12.');
                            return;
                        }
                    }

                    let response = await this.setPassword(oldPassword, wordsArray);
                    if (response === false)
                        alert('Your old password is incorrect!!!');
                    else
                        this.walletAddressPassword = "";
                }

            },

            async setPassword(oldPassword, wordsArray){

                this.copyToClipboard();
                let response = await WebDollar.Blockchain.Wallet.encryptAddress(this.address, oldPassword, wordsArray);
                this.closeModal();

                if (response === true)
                    alert('Your password was saved in clipboard');

                return response;
            }

        },

        mounted() {

            if (typeof window === 'undefined') return;

        },

    }

</script>

<style>
    .descriptionTextPass{
        color: #bdbdbd;
        padding: 30px 10px;
    }

    .inputDeleteModalPass{
        width: 100%;
        width: -webkit-fill-available;
        background-color: #2d2d2d;
        border: none;
        margin: 0 auto;
        left: 0;
        right: 0;
        color: #ccc;
        padding: 7px 0;
        font-weight: 100;
        font-size: 14px;
        padding-left: 5px;
    }

    .modalButtonPass{
        background-color: #131313;
        color: #969696;
        font-size: 12px;
        width: 140px;
        font-weight: bolder;
        border-radius: 5px;
        letter-spacing: 2px;
        text-transform: uppercase;
        padding: 8px 20px;
        margin: 0 auto;
        cursor: pointer;
        border: solid 1px #5f5d5d;
        transition: all .3s linear;
    }

    .modalButtonPass:hover{
        background-color: #f6ba2c;
        color: #000000;
        transition: all .3s linear;
    }

    .inputAndGeneratorPass{
        width: 100%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr;
        border: solid 1px #5f5d5d;
        margin-bottom: 20px;
    }

    .generatorButtonPass{
        margin: 0!important;
        width: 100%!important;
        border-radius: 0!important;
        border: none;
        height: 15px!important;
        padding: 8px 0!important;
    }

    .errorMessage{
        color: #de604d;
        padding-bottom: 20px;
        display: block;
    }

</style>

