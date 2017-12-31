var networkCSS = require('./res/network-native.css');
var networkMapHtml = require('./res/network-native-map.html');
var networkMapDialogHtml = require('./res/network-native-map-dialog.text');

console.log("networkCSS",networkCSS)
console.log("networkMapHtml",networkMapHtml)
console.log("networkMapDialogHtml",networkMapDialogHtml)

// var fs = require('browserify-fs');

import FileHelpers from "helpers/File.helpers"

// FileHelpers.readFileSync(__direc 'res/network-native-map.html', 'utf8').then((answer)=>{
//     console.log("aaasnwer",answer)
// })
//
// var networkMapHtml = FileHelpers.readFileSync('res/network-native-map.html', 'utf8');
// var networkMapDialogHtml = FileHelpers.readFileSync('res/network-native-map-dialog.text');

class NetworkNativeMapDOM{

    constructor(){


    }

    addCSS(){



    }

    addHTML(divId){

        let parent = document.getElementById(divId);
        
        console.log("networkMapDialogHtml",networkMapDialogHtml);
        console.log("networkMapHtml",networkMapHtml);
        console.log("networkMapDialogHtml",networkMapDialogHtml);

        if (document.getElementsByClassName('map-dialog').length === 0)
            parent.insertAdjacentHTML( 'beforebegin', networkMapDialogHtml.toString() );

        //parent.classList.add("mystyle");

        parent.insertAdjacentHTML( 'afterbegin',networkMapHtml.toString());


    }

}

export default new NetworkNativeMapDOM();