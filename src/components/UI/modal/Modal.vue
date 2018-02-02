<template>

    <div v-if="this.modalOpened">
        <div class="modalBackground" @click="this.closeModal"> </div>
        <div class="modal" ref="refModal">

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

        data: () => {
            return {
                modalOpened: false,
            }
        },

        props:{

            title: {default: 'Modal Title'},
            buttons: {default: ()=>{return [{text:"cancel"}]}}

        },

        methods:{

            closeModal(e){

                if(e!=undefined) e.stopPropagation();

                this.modalOpened = false;
                console.log("closeModal2");

            },

            showModal(e){

                if (e !== undefined)
                    e.stopPropagation();

                console.log("showModal");
                this.modalOpened = true;
            },

        }

    }

</script>



<style>

    .modal input:focus, .modal textarea:focus{
        outline: none;
    }

    .content{
        padding: 20px;
        padding-top: 30px;
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
        line-height: 12px;
        margin: 10px 0;
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

    .modal .transfer .address{
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

    .addressActions{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        border-bottom: solid 1px #313131;
        border-top: solid 3px #000;
    }

    .addressActions .actionButton{
        display: inline-block;
        background-color: #333;
        color: #ffc12c;
        padding: 5px;
        padding-top: 8px;
        border-left: solid 1px #6d6d6d;
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

    .copyToClipboardSuccess{
        color: #149008;
        font-size: 14px;
    }

    .transferListContainer{
        list-style: none;
        padding: 0;
        max-height: 200px;
        overflow: scroll;
    }

    .transferListElement{
        font-size: 12px;
        color: #fff;
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-column-gap: 15px;
        white-space: nowrap ;
        text-align: left;
        background-color: #151515;
        padding: 5px 10px;
    }

    .destinations{
        list-style: none;
        padding: 0;
    }

    .money, .destinationAddress{
        display: inline-block;
    }

    .destinationAddress{
        width: 70%;
        overflow: hidden;
    }

    .money{
        width: 20%;
        padding-left: 10px;
        display: inline-block;
        float: right;
        text-align: right;
    }

    .currency{
        margin-left: 5px;
    }

    .pairListElement{
        background-color: #333333;
    }

    .transferListContainer .money{
        color:#ffc12c;
    }

    .transferListContainer .source{
        color: #c5c5c5;
    }

    .transferList .header{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .headerElement{
        display: inline-block;
        text-align: center;
        color: #d4d4d4;
        margin-top: 15px;
        font-size: 14px;
    }

    @media (max-width:831px){

        #walletID{
            font-size: 12px!important;
            line-height: 14px!important;
        }

    }

    @media (max-width:600px)  {

        .modal{
            width: 100%;
            max-width: none;
            min-width: none;
            max-height: 100%;
            overflow-y: auto;
        }
        .twoColums{
            display: inline-block;
        }
        .twoColums .section:first-child {
            border-bottom: solid 1px #313131;
            border-right: none;
        }
        .modal .ballance{
            margin-top: 0;
        }
        .addressActions .actionButton{
            line-height: 50px;
            font-size: 20px;
        }
        .modal .transfer input{
            padding: 15px 0 15px 10px;
            font-size: 16px;
        }
        .modal .transfer .button{
            line-height: 26px;
            font-size: 20px;
            margin-bottom: 50px;
        }
        .modal .title{
            padding: 20px 0;
        }
        .modal .close{
            top:0;
            right: 30px!important;
        }
        .modal .twoColums{
            width: 100%;
            grid-template-columns: 1fr;
        }
        .modal{
            min-width: auto;
        }
    }

</style>