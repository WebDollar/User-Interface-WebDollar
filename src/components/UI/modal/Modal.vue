<template>

    <div v-if="this.modalOpened">
        <div class="modalBackground" @click="this.closeModal"> </div>
        <div class="modal" ref="refModal">
            <div class="modalBody">
                <div class="close" @click="this.closeModal">
                    x
                </div>

                <div class="headerModal">
                    <div class="title">
                        {{this.title}}
                    </div>
                </div>

                <div class="content modifyPadding">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    import icon from "components/UI/icons/icon.vue"

    export default{

        name: "Modal",

        data: () => {
            return {
                modalOpened: false,
                promise: null,
                resolver: null,
            }
        },

        props:{

            title: {default: 'Modal Title'},
            buttons: {default: ()=>{return [{text:"cancel"}]}}

        },

        methods:{

            closeModal(e){

                if ( e !== undefined) e.stopPropagation();

                this.modalOpened = false;
                this.resolver(true)

            },

            showModal(e){

                if (e !== undefined) e.stopPropagation();

                this.modalOpened = true;
                return this.promise = new Promise((resolver)=>{
                    this.resolver = resolver
                })
            },

        }

    }

</script>



<style>

    ::-webkit-scrollbar{
        width:7px;height:7px
    }
    ::-webkit-scrollbar-track{
        background:rgba(100,100,100,0.1)
    }
    ::-webkit-scrollbar-thumb{
        background: rgba(41, 41, 41, 0.5);
        border: solid 1px rgba(31, 31, 31, 0.5);
        border-radius: 4px;
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance:textfield;
    }

    .modal input:focus, .modal textarea:focus{
        outline: none;
    }

    .modal .content{
        padding: 20px;
        padding-top: 30px;
        margin: 0!important;
    }

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
        z-index: 1600;
        top: 50%;
        transform: translateY(-50%);
    }

    .modal #walletID{
        word-wrap: break-word;
        display: block;
        vertical-align: middle;
        height:40px;
        line-height: 12px;
        -webkit-user-select: all!important;  /* Chrome all / Safari all */
        -moz-user-select: all!important;     /* Firefox all */
        -ms-user-select: all!important;      /* IE 10+ */
        user-select: all!important;
        margin: 10px 0;
        top: 50%;
        transform: translateY(10%);
        font-weight: 100;
    }

    .modalBackground{
        position: fixed;
        height: 100%;
        width: 100%;
        display: block;
        z-index: 1000;
        top:0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.83);
    }

    .modal .close{
        position: fixed;
        top: -10px;
        right: 10px!important;
        color: #ffc12c;
        cursor: pointer;
        width: 20px;
        height: 20px;    font-size: 22px;
        display: none!important;
        margin-top: 7px;
    }

    .modal .title{
        background-color: #262626;
        padding: 10px 0;
        text-transform: uppercase;
        letter-spacing: 4px;
        line-height: 22px;
        color: #ffc12c;
        display: none;
    }

    .modal .footer .button{
        display: inline;
        cursor: pointer;
    }

    .modal b{
        margin-left: 0;
    }

    .modal .twoColumns{
        border-bottom: solid 1px #313131;
        background-color: #151515;
    }

    .modal .balance{
        color: #ffc12c!important;
        font-size: 20px;
        line-height: 50px;
        margin: 5px 0;
    }

    .modal .transfer{
        padding: 0 10px;
    }


    .modal .transfer input{
        border: none;
        background-color: #333333;
        padding: 11px 0 11px 10px;
        color: #fff;
        width: 100%;
        border-radius: 5px;
        box-sizing: border-box!important;
    }

    .modal .transfer .imageAndInput{
        margin: 10px 0;
    }

    .modal .transfer .address{
        width: 100%;
        display: block;
        box-sizing: border-box!important;
    }

    .transactionElement .amount {
        width: auto!important;
        box-sizing: border-box!important;
        display: inline-block;
        color: #ffc12c!important;
    }

    .transactionElement .currency {
        width: auto!important;
        box-sizing: border-box!important;
        display: inline-block;
        color: #ffc12c!important;
    }

    .modal .transfer .title{
        background-color: #1f1f1f;
        padding-top: 20px;
        text-transform: uppercase;
        letter-spacing: 4px;
        padding-bottom: 20px;
        color: #d4d4d4;
    }

    .modal .transfer .button{
        background-color: #ffc12c;
        color: #1f1f1f;
        width: 100%;
        font-weight: bolder;
        font-size: 16px;
        border: none;
        margin-top: 10px;
        padding: 10px 0 10px 0;
        border-radius: 5px;
        transition: all 0.5s ease;
    }

    .modal .transfer .button:hover{
        background-color: #fbdb8d;
        color: #000000;
        transition: all 0.5s ease
    }

    .twoColumns{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .addressActions{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        border-bottom: solid 1px #313131;
    }

    .addressActions .actionButton{
        display: inline-block;
        background-color: #333;
        color: #ffc12c;
        padding: 5px;
        cursor: pointer;
        padding-top: 8px;
        border-left: solid 1px #424242;
        border-collapse: collapse;
        transition: all 0.5s ease
    }

    .addressActions .actionButton:hover{
        background-color: #232222;
        color: #ffdd8c;
        transition: all 0.5s ease
    }

    .addressActions .actionButton:first-child{
        border-left:none;
    }

    .activeActionButton{
        background-color: #ffc12c!important;
        color: #000!important;
    }

    .twoColumns .section{
        overflow: hidden;
        padding: 20px;
        color: #D5D5D5;
    }

    .twoColumns .section:first-child{
        border-right: solid 1px #313131;
    }

    .modalButton2{
        background-color: #353535;
        border-radius: 5px;
        padding: 7px 0 5px 0;
        border: solid 1px #777;
        font-size: 12px;
        cursor: pointer;
        padding: 7px 0 5px 0;
        width: 150px;
        margin: 0 auto;
        margin-top: 10px;
        transition: all 0.5s ease
    }

    .modalButton2:hover{
        background-color: #000;
        transition: all 0.5s ease
    }

    .modalButton2Success{
        color: #149008;
        font-size: 12px;
        margin-top: 16px;
    }

    .buttonSpace{
        margin-top: 20px;
    }

    /*.balanceContent .miningAddress{*/
        /*padding-top: 10px;*/
    /*}*/

    @media (max-width: 1000px){

        .balanceText{
            grid-template-columns: 1fr;
            padding-bottom: 0!important;
        }

        .balanceText div{
            text-align: center!important;
        }

        .balanceTitle{
            text-align: center;
        }

        .balanceAmount{
            text-align: center!important;
        }

        .WEBD .balanceAmount{
            text-align: left;
        }

        .balanceContent .miningAddress{
            margin-top: 10px;
        }

        .balanceContent{
            padding: 51px 10px 15px 10px;
        }

        .twoColumns .section{
            padding-top: 40px!important;
        }

    }

    @media (max-width:831px){

        #walletID{
            font-size: 12px!important;
            line-height: 14px!important;
        }

        .close{
            font-size: 22px;
            margin-top: 7px;
            right: 30px!important;
            display: none!important;
        }

    }

    @media (max-width:600px)  {

        .modal .title{
            display: block;
        }

        .modal .transfer .title{
            padding: 10px;
        }

        .modal{
            width: 95%;
            max-width: none;
            min-width: none;
            max-height: 100%;
            overflow-y: auto;
        }

        .twoColumns .section:first-child {
            border-bottom: solid 1px #313131;
            border-right: none;
        }
        .modal .balance{
            margin-top: 0;
        }
        .addressActions .actionButton{
            line-height: 50px;
            font-size: 20px;
            border-bottom: solid 1px #000;
            padding: 0;
        }
        .modal .transfer input{
            padding: 10px 0 10px 10px;
            font-size: 16px;
            margin: 5px 0;
            box-sizing: border-box!important;
        }
        .modal .transfer .button{
            line-height: 26px;
            font-size: 20px;
            margin-bottom: 20px;
            margin-top: 30px;
        }
        .modal .title{
            padding: 20px 0;
        }
        .modal .close{
            top:0;
            right: 30px!important;
            display: block!important;
        }
        .modal .twoColumns{
            width: 100%;
            grid-template-columns: 1fr;
        }
        .modal{
            min-width: auto;
        }

        .balanceText{
            display: inline-block;
            margin-top: 0px;
            padding-bottom: 0;
        }

        .walletAddress b {
            font-size: 20px!important;
            line-height: 25px!important;
            margin-left: 4px!important;
        }

        .walletAddress b {
            font-size: 20px!important;
            line-height: 25px!important;
            margin-left: 4px!important;
            vertical-align: top;
            margin-top: 16px;
        }

        #walletID{
            height: auto;
            line-height: 32px!important;
        }

        #allWallets .walletAddress img{
            margin-top: 0;
        }

        .modalButton2{
            padding: 10px 0!important;
        }

        .modifyPadding .twoColumns .section{
            padding: 10px 5px 20px 0;
        }

        .modal .transfer .button{
            margin-top: 10px!important;
        }

        #allWallets .walletAddress .imageAndInput img {
            height: 38px !important;
        }

        .modal .transfer .address {
            padding: 10px 0 10px 20px;
        }

        .balanceContent .miningAddress{
            padding: 0!important;
        }

    }

    @media (max-width: 400px){

        .modal .transfer input {
            padding: 10px 0 10px 10px;
        }

        .addressActions .actionButton {
            line-height: 40px;
        }

        .addressActions{
            border: none;
        }

        .modal .title {
            padding: 10px 0;
        }

        .modal .close {
            top: -1px;
            right: 10px!important;
        }

    }

</style>
