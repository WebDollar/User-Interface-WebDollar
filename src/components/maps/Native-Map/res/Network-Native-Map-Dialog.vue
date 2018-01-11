<template>
    <!-- Popup Description -->
    <div class="map-dialog ">
        <div class="map-dialog-description">
            <div>
                <img class="icon-myself" src="https://forum.noxiousnet.com/plugins/nodebb-plugin-emoji-one/static/images/1f60e.png">
                <img class="icon-browser" src="http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/48/Browser-icon.png">
                <img class="icon-terminal" src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/terminal-icon.png">
            </div>
            <div class="map-dialog-description-text"></div>
        </div>
    </div>
</template>

<script>

    export default{

    }

</script>



<style>
    .map-dialog-description {
        color: #ffc107;
        height: 100px;
        width: 200px;
        margin: 0;
        background-color: rgba(38, 41, 43, 0.66);
        border-radius: 3px;
        display: block;
        padding: 8px;
        opacity: 0;
        will-change: opacity;
        transition: 0.3s opacity;
        text-align: center;
        pointer-events: none;
        position: relative;
        margin-left: -100px;
        left: 50%;
        top: 100px;
        z-index: 100;
    }

    @media (max-height: 800px) {
        .map-dialog-description {
            top: 40px;
        }
    }

    .map-dialog {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        text-align: center;
        pointer-events: none;
    }

    .map-dialog-description img {
        width: 24px;
        display: inline-block;
    }

</style>