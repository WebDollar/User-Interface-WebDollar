var CSSId = "css"+Math.floor(Math.random()*100000);
var CSS = "<style id='"+CSSId+"'>"+require('./res/network-native.css')+"</style>";
var Html = require('./res/network-native-map.html');
var DialogHtml = require('./res/network-native-map-dialog.html');

class NetworkNativeMapDOM{

    constructor(){


    }

    addCSS(type){

        if (document.getElementById(CSSId) !== null) return false;

        let parent = document.getElementsByTagName("head")[0];

        parent.insertAdjacentHTML( 'beforeend',CSS);
    }

    addHTML(divId){

        let parent = document.getElementById(divId);

        if (document.getElementsByClassName('map-dialog').length === 0)
            parent.insertAdjacentHTML( 'beforebegin', DialogHtml );

        //parent.classList.add("mystyle");

        parent.insertAdjacentHTML( 'afterbegin',Html);


    }

}

export default new NetworkNativeMapDOM();