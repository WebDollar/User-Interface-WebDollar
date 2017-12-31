import NetworkNativeMap from "maps/Native-Map/Network-Native-Map"
import NetworkGoogleMaps from "maps/Google-Maps/Network-Google-Maps.js"
import BrowserHelpers from "helpers/Browser.helpers"
import InitializeParams from "initialize-params/Initialize-Params"

console.log("hello world");

let exportObject = {
    Network:{
        NativeMap: NetworkNativeMap,
        GoogleMaps: NetworkGoogleMaps,
    },
    Helpers:{
        BrowserHelpers: BrowserHelpers,
    },
    InitializeParams: InitializeParams,
};


module.exports =  exportObject;

//browser minimized script
if ( typeof global.window !== 'undefined')
    global.window.WebDollar = exportObject;

if ( typeof window !== 'undefined')
    window.WebDollar = exportObject;

