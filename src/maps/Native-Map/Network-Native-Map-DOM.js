var networkCSS = require('./res/network-native.css');
var networkMapHtml = require('./res/network-native-map.html');
var networkMapDialogHtml = require('./res/network-native-map-dialog.html');

class NetworkNativeMapDOM{

    constructor(){


    }

    addCSS(){



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