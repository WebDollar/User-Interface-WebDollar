<template>

    <div>

        <div ref="refClipboardCopy"></div>

        <Modal title="Wallet Address Secure" ref="refPassModal">

            <div slot="content">

                <div >

                    <span class="info">If you will lose your password you won't be able to access your WEBD.</span>

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

    import Modal from "components/UI/modal/Modal.vue";
    let Clipboard = require("./../../../../../node_modules/clipboard");

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
                walletAddressPassword: '',
                errorMessage: ''
            }
        },

        methods: {

            closeModal() {
                this.walletAddressPassword = "";
                this.$refs['refPassModal'].closeModal();
            },

            showModal(e) {

                if (this.$refs['refPassModal'].modalOpened === false){
                    this.$refs['refPassModal'].showModal();
                }

            },

            copyToClipboard(){

                this.$clipboard(this.walletAddressPassword.trim());

            },

            generateRandomPassword(){

                let wordsArray = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
                this.walletAddressPassword = '';

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

                if (this.walletAddressPassword === null || this.walletAddressPassword === undefined)
                    alert('Your password is invalid');

                let okPassword = true;
                let wordsArray = [];
                let wordsArraySize = 0;

                this.walletAddressPassword = this.walletAddressPassword.trim();
                if (0 < this.walletAddressPassword.length) {
                    wordsArray = this.walletAddressPassword.split(' ');
                    wordsArraySize = wordsArray.length;
                }

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

                    await this.setPassword(wordsArray);
                }


            },

            async setPassword(wordsArray){

                let response = await WebDollar.Blockchain.Wallet.encryptAddress(this.address, wordsArray);

                if (response === true) {
                    this.closeModal();
                    this.copyToClipboard();
                    alert('You have set a new password which is copyed now in your clipboard!');
                }

                return response;
            }

        },

        mounted() {

            if (typeof window === 'undefined')
                return;

            console.log(this.$refs['refClipboardCopy']);

            this.walletAddressPassword = "MAMA MERE";
            new Clipboard( this.$refs['refClipboardCopy'], {
                text: ()  => {
                    return this.walletAddressPassword;
                }
            });


            this.$refs['refClipboardCopy'].click();

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

    .info{
        color: #ffd36c;
        padding-bottom: 20px;
        text-transform: uppercase;
        display: block;
        font-size: 12px;
    }

</style>

