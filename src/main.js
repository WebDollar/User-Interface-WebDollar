import NetworkNativeMap from "maps/Native-Map/Network-Native-Map"
import NetworkGoogleMaps from "maps/Google-Maps/Network-Google-Maps.js"
import BrowserHelpers from "helpers/Browser.helpers"
import InitializeParams from "initialize-params/Initialize-Params"

import Mining from "mining/Mining"
import Wallet from "wallet/Wallet"

require('./main-vue');

let exportObject = {
    Network:{
        NativeMap: NetworkNativeMap,
        GoogleMaps: NetworkGoogleMaps,
    },

    Wallet: Wallet,
    Mining:Mining,

    Helpers:{
        BrowserHelpers: BrowserHelpers,
    },
    InitializeParams: InitializeParams,
};


module.exports =  exportObject;

//browser minimized script
if ( typeof global.window !== 'undefined')
    global.window.WebDollarUserInterface = exportObject;

if ( typeof window !== 'undefined')
    window.WebDollarUserInterface = exportObject;

