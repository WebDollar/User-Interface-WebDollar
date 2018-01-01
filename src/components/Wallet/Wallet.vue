<template>

    <div class="dashboardWallet" >

        <div id="walletButton" onclick="WebDollarUserInterface.Wallet.toggleWallet()" style="margin-bottom: 30px">
            <span id="walletButtonText">
                <i class="fa fa-chevron-up" ></i>
                <spanWalletText>Wallet 0.0</spanWalletText>
            </span>
        </div>

        <div id="walletMenu" ref="walletMenu" style="margin-bottom: -320px">

            <div id="dashboardWallet">

                <div class="walletController">

                    <icon icon="plus" />
                    <icon icon="lock-open" />

                </div>

                <div class="walletSection walletsContainer">
                    <div id="allWalets">


                    </div>
                </div>
            </div>
        </div>

    </div>

</template>



<script>

    import icon from "components/UI/icons/icon.vue"

    export default{

        components:{
            "icon":icon,
        }

    }

</script>







<style>
    #walletButton {
        /*display: none;*/
        margin: 0 auto;
        position: fixed;
        z-index: 100;
        bottom: 0;
        width: 300px!important;
        right: 0;
        text-align: center;
        width: 300px;
        height: 50px;
        border-top-left-radius: 60px;
        cursor: pointer;
        background-color: #fec02c;
        color: #1f1f1f;
        margin-bottom: 20px;
        border: solid 1px #444444;
        border-right: solid 1px #fec02c;
        transition: all .3s linear;
    }

    #walletButton:hover{
        color: #fff;
        transition: all .3s linear;
    }

    .walletSection{
        display: inline-block;
        vertical-align: top;
        height: 315px;
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100%;
    }

    .walletController{
        position: relative;
        width: 100%;
        border-bottom: solid 1px #737373;
        background-color: #313131;
    }

    .walletController .webdollarFont{
        display: inline-block;
        width: 12px;
        padding: 5px 10px;
        border-right: solid 1px #545454;
        background-color: #1f1f1f;
    }

    .walletController .webdollarFont:hover{
        background-color: #000000;
    }

    .allWallets div{
        border: solid 1px #545454;
    }

    #walletButton:hover{
        background-color: #1f1f1f;
        border-right: solid 1px #444444;
        transition: all .3s linear;
    }

    #walletButton span{
        width: 100%;
        line-height: 50px;
        font-size: 20px;
        font-weight: bolder;
        transition: all .3s linear;
    }

    #walletButton span:hover{
        transition: all .3s linear;
    }

    #walletMenu{
        margin: 0 auto;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 300px;
        background-color: #1f1f1f;
        height: 350px;
        margin-bottom:-100px;
        z-index: 900;
        transition: all .3s linear;
        border-top: solid 1px #000000;
        border-left: solid 1px #444;
    }



    /* Small Devices, Tablets */
    @media only screen and (max-width : 768px) {
        #walletMenu{
            width: 100%;
        }
        #walletButton{
            width: 100%!important;
            border-radius: 0;
            z-index: 1200;
        }
    }
</style>