<template>
    <!-- Popup Description -->
    <div class="map-dialog ">

        <div class="map-dialog-description" ref="refDialogContainer" :style="{opacity: this.display ? 1 : 0}">

            <NetworkNativeMapDialogElement v-for="desc in this.desc"

            :key="desc.uuid||desc.index"
            :address="desc.address"
            :status="desc.status"
            :country="desc.country"
            :city="desc.city"
            :nodeType="desc.nodeType"

            style="padding-bottom: 20px"

            >

            </NetworkNativeMapDialogElement>

        </div>
    </div>
</template>

<script>

    import NetworkNativeMapDialogElement from "./Network-Native-Map-Dialog-Element.vue"

    export default{

        components:{
            "NetworkNativeMapDialogElement":NetworkNativeMapDialogElement,
        },

        data: () => {
            return {

                display: false,
                desc: {},
            }
        },

        methods: {

            show(desc) {

                this.desc = desc;

                this.display = 1;
            },

            hide() {
                this.display = 0;
            },
        }

    }

</script>



<style>
    .map-dialog-description {
        color: #ffc107;
        height: auto;
        max-height: 450px;
        width: 300px;
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

</style>