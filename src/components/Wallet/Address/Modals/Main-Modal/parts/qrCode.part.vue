<template>

    <div class="transferList qrCodeContainer" ref="qrCode">

        <div class="extraInfo">
             <span @click="changeQR" class="copyButton modalButton2 qrCodeButton">
                 {{ this.qrType === 'link' ? 'Switch to WEBD Address QR Code' : 'Switch to direct payment link QR Code' }}
             </span>
        </div>

        <img class="qrCodeImage" :src=" this.qrType === 'link' ? 'http://chart.apis.google.com/chart?chs=300x300&cht=qr&chld=|0&chl=http%3A%2F%2Fwww.the-qrcode-generator.com%2F' : 'https://cdn.shopify.com/growth-tools-assets/qr-code/shopify-faae7065b7b351d28495b345ed76096c03de28bac346deb1e85db632862fd0e4.png'"/>

    </div>

</template>

<script>

    export default {

        data: () => {
            return {
                qrType: "link",
            }
        },


        methods:{

            changeQR(){

                if (this.qrType === 'link')
                    this.qrType = 'address';
                else
                    this.qrType = 'link';

            }

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