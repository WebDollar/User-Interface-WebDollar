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

                document.getElementById("WebDollarModalBackground").setAttribute('style', 'display:none !important');
                this.$refs['modal'].setAttribute('style', 'display:none !important');

            },

            showModal(){

                document.getElementById("WebDollarModalBackground").setAttribute('style', 'display:block !important');
                document.getElementById("WebDollarModalBackground").onclick=this.closeModal;

                this.$refs['modal'].setAttribute('style', 'display:block !important');

            }

        }

    }

</script>



<style>

    .modal{
        width: 50%;
        height: auto;
        border-radius: 5px;
        max-width: 550px;
        position: fixed;
        margin: 0 auto;
        border: solid 1px #313131;
        left: 0;
        right: 0;
        text-align: center;
        background-color: #1f1f1f;
        display: none;
        z-index: 1600;
        top: 50%;
        transform: translateY(-50%);
    }

    .modal #walletID{
        word-wrap: break-word;
        display: block;
        line-height: 12px;
        margin: 10px 0;
    }

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

    .modal .close{
        position: fixed;
        top: -5px;
        right: 10px!important;
        font-size: 40px;
        display: block;
        color: #ffc12c;
        cursor: pointer;
    }

    .modal .footer{

    }

    .modal .title{
        background-color: #262626;
        padding: 10px 0;
        text-transform: uppercase;
        letter-spacing: 4px;
        line-height: 22px;
        color: #ffc12c;
    }

    .modal .footer .button{
        display: inline;
        cursor: pointer;
    }

    /* Small Devices, Tablets */
    @media only screen and (max-width : 768px) {
        .modal{
            width: 100%;
        }
    }

</style>