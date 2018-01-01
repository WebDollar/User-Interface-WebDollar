<template>

    <div class="modal" ref="modal">

        <div class="close" @click="this.closeModal">
            x
        </div>

        <div class="header">
            <div class="title">
                {{this.title}}
            </div>
        </div>

        <div class="content">
            <slot name="content"></slot>
        </div>

        <!--<div class="footer">-->

        <!--<div v-for="(button, index) in this.buttons"-->

        <!--class="button"-->
        <!--:key="'modalButton'+index"-->
        <!--@click="(button.text === 'cancel' ? closeModal() : button.click() )">-->

        <!--{{button.text}}-->

        <!--</div>-->


        <!--</div>-->

        <div class="modalBackground" ref="modalBackground" > </div>

    </div>

</template>


<script>

    export default{

        name: "Modal",

        props:{

            title: {default: 'Modal Title'},
            buttons: {default: ()=>{return [{text:"cancel"}]}}

        },

        methods:{

            closeModal(){

                this.$refs['modalBackground'].setAttribute('style', 'display:none !important');
                this.$refs['modal'].setAttribute('style', 'display:none !important');

            },

            showModal(){

                this.$refs["modalBackground"].setAttribute('style', 'display:block !important');
                this.$refs["modalBackground"].onclick=this.closeModal;

                this.$refs['modal'].setAttribute('style', 'display:block !important');

            }

        }

    }

</script>



<style>
    .modalBackground{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.82);
        z-index: 1500;
        display: none;
        top:0;
        left: 0;
    }
</style>