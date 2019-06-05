<template>

    <div class="transferList qrCodeContainer" ref="qrCode">

        <img class="qrCodeImage" src="https://cdn.shopify.com/growth-tools-assets/qr-code/shopify-faae7065b7b351d28495b345ed76096c03de28bac346deb1e85db632862fd0e4.png"/>

    </div>

</template>

<script>

    export default {

        data: () => {

        },


        methods:{


        }

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

</style>