<template>

    <div>

        <Modal title="Wallet Address Secure" ref="refModal">

            <div slot="content">

                <div class="descriptionTextPass">

                    Set your password

                </div>

                <div >

                    <div class="inputAndGeneratorPass">
                        <div>
                            <input v-Model="this.walletAddressPassword" class="inputDeleteModalPass"/>
                        </div>
                        <div>
                            <div @click="" class="modalButtonPass generatorButtonPass">
                                Generate
                            </div>
                        </div>
                    </div>

                    <div @click="this.encryptPassword" class="modalButtonPass">
                        Set Password
                    </div>

                </div>

            </div>

        </Modal>

    </div>

</template>

<script>

    var Vue = require('vue/dist/vue.min.js');
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
                walletAddressPassword: ''
            }
        },

        methods: {

            closeModal() {
                this.$refs['refModal'].closeModal();
            },

            showModal(e) {

                if (this.$refs['refModal'].modalOpened === false){
                    console.log("shooow modal");
                    this.$refs['refModal'].showModal();
                }

            },
            copyToClipboard(){

                this.clipboardText = 'Copied';
                this.$clipboard(this.address)

            },

            encryptPassword(){

                var wordsArray = this.walletAddressPassword.split(' ');
                console.log(this.walletAddressPassword);

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
        margin-bottom: 20px;
        transition: all .3s linear;
    }

    .modalButtonPass:hover{
        background-color: #f6ba2c;
        color: #000000;
        transition: all .3s linear;
    }

    .inputAndGeneratorPass{
        width: 90%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 3fr 1fr;
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

</style>

