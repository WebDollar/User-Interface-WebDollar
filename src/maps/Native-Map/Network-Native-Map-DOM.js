//var networkCSS = require('./res/network-native.css');
var networkMapHtml = require('./res/network-native-map.html');
var networkMapDialogHtml = require('./res/network-native-map-dialog.text');

class NetworkNativeMapDOM{

    constructor(){


    }

    addCSS(){



    }

    addHTML(divId){

        let parent = document.getElementById(divId);
        
        console.log("networkMapDialogHtml",networkMapDialogHtml);;

        if (document.getElementsByClassName('map-dialog').length === 0)
            parent.insertAdjacentHTML( 'beforebegin', networkMapDialogHtml.toString() );

        //parent.classList.add("mystyle");

        parent.insertAdjacentHTML( 'afterbegin',networkMapHtml.toString());


    }

}

export default new NetworkNativeMapDOM();