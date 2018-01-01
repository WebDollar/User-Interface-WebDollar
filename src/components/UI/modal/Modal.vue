<template>

    <div>
        <div id="WebDollarModalBackground" style="display:none !important;"> </div>
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

        </div>
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
        min-width: 450px;
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
        font-weight: 100;
    }

    #modalBackground{
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
        top: -10px;
        right: 10px!important;
        font-size: 40px;
        display: block;
        color: #ffc12c;
        cursor: pointer;
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

    .modal b{
        margin-left: 0;
    }

    .modal .twoColums{
        border-bottom: solid 1px #313131;
        background-color: #151515;
    }

    .modal .ballance{
        color: #ffc12c!important;
        font-size: 24px;
        margin-top: 20px;
    }

    .modal .transfer{
        padding: 0 10px;
    }

    .modal .transfer input{
        border: none;
        background-color: #333333;
        padding: 10px 0 10px 10px;
        margin: 10px 0;
        color: #fff
    }

    .modal .transfer .adress{
        width: 100%;
        display: block;
    }

    .modal .transfer .amount {
        width: 100%;
    }

    .modal .transfer .title{
        background-color: #1f1f1f;
        padding-top: 30px;
        text-transform: uppercase;
        letter-spacing: 4px;
        padding-bottom: 20px;
        color: #d4d4d4;
    }

    .modal .transfer .button{
        margin-top: 10px;
        background-color: #ffc12c;
        color: #1f1f1f;
        margin-bottom: 15px;
        width: 100%;
        font-size: 14px;
        border: none;
        padding: 15px 0 15px 0;
        border-radius: 5px;
        transition: all 0.5s ease;
    }

    .modal .transfer .button:hover{
        background-color: #fbdb8d;
        color: #000000;
        transition: all 0.5s ease
    }

    .twoColums{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .adressActions{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        border-bottom: solid 1px #313131;
        border-top: solid 3px #000;
    }

    .adressActions .actionButton{
        display: inline-block;
        background-color: #333;
        color: #ffc12c;
        padding: 5px;
        padding-top: 8px;
        border-left: solid 1px #6d6d6d;
        border-collapse: collapse;
        transition: all 0.5s ease
    }

    .adressActions .actionButton:hover{
        background-color: #232222;
        color: #ffdd8c;
        transition: all 0.5s ease
    }

    .adressActions .actionButton:first-child{
        border-left:none;
    }

    .activeActionButton{
        background-color: #ffc12c!important;
        color: #000!important;
    }

    .twoColums .section{
        overflow: hidden;
        padding: 20px;
        color: #D5D5D5;
    }

    .twoColums .section:first-child{
        border-right: solid 1px #313131;
    }

    .copyToClipboard{
        background-color: #353535;
        border-radius: 5px;
        padding: 7px 0 5px 0;
        border: solid 1px #777;
        font-size: 12px;
        padding: 7px 0 5px 0;
        width: 150px;
        margin: 0 auto;
        transition: all 0.5s ease
    }

    .copyToClipboard:hover{
        background-color: #000;
        transition: all 0.5s ease
    }

    @media (min-width:600px)  {

        width: 100%;
        max-width: none;
        min-width: none;

    }

</style>