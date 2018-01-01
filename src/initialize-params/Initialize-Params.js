import BrowserHelpers from "helpers/Browser.helpers"

import NetworkNativeMap from "maps/Native-Map/Network-Native-Map"
import NetworkNativeMapDOM from "maps/Native-Map/Network-Native-Map-DOM"
import NetworkGoogleMaps from "maps/Google-Maps/Network-Google-Maps.js"

import Mining from "mining/Mining"
import MiningDOM from "mining/Mining-DOM"

import Wallet from "wallet/Wallet"
import WalletDOM from "wallet/Wallet-DOM"

import FontsDOM from "UI/fonts/Fonts-DOM"

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

        // this.loadMining();
        // this.loadWallet();
    }

    loadGlobal(){

        if (document.getElementById("webdollarFont") === null)
            document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend",`<link id="webdollarFont" href="http://192.168.1.2:8080/public/assets/fonts/avenir-light.woff" rel="stylesheet">`);

        if (document.getElementById("webdollarViewPort") === null)
            document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", `<meta id="webdollarViewPort" name="viewport" content="width=device-width, initial-scale=1.0"/>`)

        FontsDOM.addCSS();

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

    async loadMining(){

        if (this.mining.activated === false) return false;

        if (document.getElementById(this.mining.id) === null)
            document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `<div id="${this.mining.id}">`);

        MiningDOM.addCSS(this.mining.style);
        MiningDOM.addHTML(this.mining.id);

    }

    async loadWallet(){

        if (this.wallet.activated === false) return false;

        if (document.getElementById(this.mining.id) === null)
            document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `<div id="${this.mining.id}">`);

        WalletDOM.addCSS(this.wallet.style);
        WalletDOM.addHTML(this.wallet.id);

        Wallet.initializeWallet();

    }

}

export default new InitializeParams();