<template>

    <div class="transferList qrCodeContainer" ref="qrCode">

        <vue-q-r-code-component color="#ffc12c" bg-color="#1f1f1f" :text="this.address"></vue-q-r-code-component>
        <!--<img class="qrCodeImage" src="https://cdn.shopify.com/growth-tools-assets/qr-code/shopify-faae7065b7b351d28495b345ed76096c03de28bac346deb1e85db632862fd0e4.png"/>-->

    </div>

</template>

<script>

    import Vue from 'vue'
    import VueQRCodeComponent from 'vue-qrcode-component'
    Vue.component('qr-code', VueQRCodeComponent);

    export default {

        components:{ VueQRCodeComponent },

        props:{
            address: {default: null},
        },

    }


</script>


<style>

    .qrCodeContainer{
        padding: 20px;
    }

    .qrCodeImage{
        border-radius: 0!important;
        width: 100%;
        height: auto!important;
        display: block!important;
        margin: 0 auto;
        position: relative;
    }

    .qrType{
        color: #b6b6b6;
        font-size: 18px;
    }

    .qrCodeContainer .extraInfo{
        margin-bottom: 20px;
    }

    .qrCodeButton{
        width: 100%;
        display: block;
        color: #cdcdcd;
        font-size: 14px;
        padding: 10px 0;
        margin-top: 0;
    }

    .qrCodeContainer img{
        width: 100%!important;
        height: auto!important;
        border-radius: 0!important;
    }

</style>