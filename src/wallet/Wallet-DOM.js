import AddressDOM from './address/Address-DOM';


var CSSId = "css"+Math.floor(Math.random()*100000);
var CSS = "<style id='"+CSSId+"'>"+require('./res/wallet.css')+"</style>";
var Html = require('./res/wallet.html');

class WalletDOM{

    constructor(){


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