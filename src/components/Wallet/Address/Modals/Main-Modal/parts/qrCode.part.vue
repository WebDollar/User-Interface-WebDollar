<template>

    <div class="transferList qrCodeContainer" ref="qrCode">

        <img class="qrCodeImage" src="http://chart.apis.google.com/chart?chs=300x300&cht=qr&chld=|0&chl=http%3A%2F%2Fwww.the-qrcode-generator.com%2F"/>

    </div>

</template>

<script>

    export default {


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


</style>