var networkCSSId = "css"+Math.floor(Math.random()*100000);
var networkCSS = "<style id='"+networkCSSId+"'>"+require('./res/network-native.css')+"</style>";
var networkMapHtml = require('./res/network-native-map.html');
var networkMapDialogHtml = require('./res/network-native-map-dialog.html');

class NetworkNativeMapDOM{

    constructor(){


    }

    addCSS(type){

        if (document.getElementById(networkCSSId) !== null) return false;

        let parent = document.getElementsByTagName("head")[0];

        parent.insertAdjacentHTML( 'beforeend',networkCSS);
    }

    addHTML(divId){

        let parent = document.getElementById(divId);

        if (document.getElementsByClassName('map-dialog').length === 0)
            parent.insertAdjacentHTML( 'beforebegin', networkMapDialogHtml );

        //parent.classList.add("mystyle");

        parent.insertAdjacentHTML( 'afterbegin',networkMapHtml);


    }

}

export default new NetworkNativeMapDOM();