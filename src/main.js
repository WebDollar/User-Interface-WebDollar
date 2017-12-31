import NetworkNativeMap from "maps/Native-Map/Network-Native-Map"
import NetworkGoogleMaps from "maps/Google-Maps/Network-Google-Maps.js"

console.log("hello world");

let exportObject = {
    Network:{
        NativeMap: NetworkNativeMap,
        GoogleMaps: NetworkGoogleMaps,
    }
};


module.exports =  exportObject;

//browser minimized script
if ( typeof global.window !== 'undefined')
    global.window.WebDollar = exportObject;

if ( typeof window !== 'undefined')
    window.WebDollar = exportObject;
