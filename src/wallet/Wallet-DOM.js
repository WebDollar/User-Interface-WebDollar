import AddressDOM from './address/Address-DOM';
import FontsDOM from "UI/fonts/Fonts-DOM"

var CSSId = "css"+Math.floor(Math.random()*100000);
var CSS = "<style id='"+CSSId+"'>"+require('./res/wallet.css')+"</style>";
var Html = require('./res/wallet.html');

class WalletDOM{

    constructor(){


    }

    addCSS(type){

        if (document.getElementById(CSSId) !== null) return false;

        let parent = document.getElementsByTagName("head")[0];

        parent.insertAdjacentHTML( 'beforeend',CSS);

        AddressDOM.addCSS(type);
    }

    addHTML(divId){

        let parent = document.getElementById(divId);

        let html = Html;

        console.log("parent", parent);

        if (parent === null) {

            parent = document.getElementsByTagName("body")[0];

            parent.insertAdjacentHTML( 'beforeend',`<div id="${divId}"> </div>`);
            parent = document.getElementById(divId);

        } else{

        }

        parent.insertAdjacentHTML( 'beforeend', html);

        //add icons
        parent = document.querySelector("#dashboardWallet .walletController");

        FontsDOM.addHTML(parent, "plus", "walletControllerPlus");
        FontsDOM.addHTML(parent, "lock-open", "walletControllerLock");

    }



    /*
        It will refresh the wallet list by adding new elements
    */
    refreshWalletList(walletAddresses){

        let allWallets = document.getElementById("allWalets");

        //remove previous elements

        while (allWallets.firstChild)
            allWallets.removeChild(allWallets.firstChild);

        for (let i=0; i<walletAddresses.length; i++){
            AddressDOM.addHTML(allWallets, walletAddresses[i]);
        }

    }

}

export default new WalletDOM();