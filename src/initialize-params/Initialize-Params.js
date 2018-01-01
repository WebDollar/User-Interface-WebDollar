import BrowserHelpers from "helpers/Browser.helpers"

import NetworkNativeMap from "maps/Native-Map/Network-Native-Map"
import NetworkNativeMapDOM from "maps/Native-Map/Network-Native-Map-DOM"
import NetworkGoogleMaps from "maps/Google-Maps/Network-Google-Maps.js"

class InitializeParams{

    constructor(){

        this.maps = {
            activated: true,
            type: "NativeMap",
            style: "dark",
            id: "map",
        };

        this.mining = {
            activated: true,
            style: "dark",
            id: "webDollar",
        };

        this.wallet = {
            activated: true,
            style: "dark",
            id: "webDollar",
        };


        /**
         * On Window Load
         */
        BrowserHelpers.addEvent(window, "load", (event) => {
            console.log("User-Interface-Loaded");
            this.load();
        });

    }

    load(){
        this.loadGlobal();
        this.loadMaps();
    }

    loadGlobal(){

        //-----------------------
        // Int Script
        //-----------------------

        if (document.getElementById("WebdollarFont") === null)
            document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend",`<link id="WebdollarFont" href="http://192.168.1.2:8080/public/assets/fonts/avenir-light.woff" rel="stylesheet">`);

        if (document.getElementById("WebdollarViewPort") === null)
            document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", `<meta id="WebdollarViewPort" name="viewport" content="width=device-width, initial-scale=1.0"/>`)

        if (document.getElementById("WebDollarModalBackground") === null)
            document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `<div id="WebDollarModalBackground" > </div>`);

        window.screenHeight = window.innerHeight;
        window.screenWidth = window.innerWidth;

        BrowserHelpers.addEvent(window, "resize", (event) => {
            window.screenHeight = window.innerHeight;
            window.screenWidth = window.innerWidth;
        });

    }


    async loadMaps(){

        if (this.maps.activated === false) return false;

        if (document.getElementById(this.maps.id) === null){
            console.log("The element "+this.maps.id+" was not found in your document");
            return false;
        }

        if (this.maps.type === "NativeMap"){

            NetworkNativeMapDOM.addCSS(this.maps.style);
            NetworkNativeMapDOM.addHTML(this.maps.id);

            NetworkNativeMap.createMap(this.maps.id);
            await NetworkNativeMap.initialize();

            NetworkNativeMap.createTestConnections();
        }

    }


}

export default new InitializeParams();