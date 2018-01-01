const md5 = require('md5');

var CSSId = "cssAddress"+Math.floor(Math.random()*100000);
var CSS = "<style id='"+CSSId+"'>"+require('./res/address.css')+"</style>";
var Html = require('./res/address.html');


class AddressDOM{

    constructor(){


    }

    addCSS(type){

        if (document.getElementById(CSSId) !== null) return false;

        let parent = document.getElementsByTagName("head")[0];

        parent.insertAdjacentHTML( 'beforeend',CSS);
    }

    addHTML(parent, address){

        let html = Html;

        parent.insertAdjacentHTML( 'beforeend', html);

        parent.children[parent.children.length-1].children[0].src=`https://www.gravatar.com/avatar/${md5(address.toString())}?d=retro&f=y`

    }

}

export default new AddressDOM();