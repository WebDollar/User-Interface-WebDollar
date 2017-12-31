import BrowserHelpers from "helpers/Browser.helpers"

import NetworkNativeMap from "maps/Native-Map/Network-Native-Map"
import NetworkNativeMapDOM from "maps/Native-Map/Network-Native-Map-DOM"
import NetworkGoogleMaps from "maps/Google-Maps/Network-Google-Maps.js"

import Mining from "mining/Mining"
import MiningDOM from "mining/Mining-DOM"

import Wallet from "wallet/Wallet"
import WalletDOM from "wallet/Wallet-DOM"

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
            id: "dashboardMining",
        };

        this.wallet = {
            activated: true,
            style: "dark",
            id: "dashboardWallet",
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
        this.loadMaps();
        this.loadMining();
        this.loadWallet();
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

        MiningDOM.addCSS(this.mining.style);
        MiningDOM.addHTML(this.mining.id);

    }

    async loadWallet(){

        if (this.wallet.activated === false) return false;

        WalletDOM.addCSS(this.wallet.style);
        WalletDOM.addHTML(this.wallet.id);

    }

}

export default new InitializeParams();