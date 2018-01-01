
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

    }

}

export default new WalletDOM();