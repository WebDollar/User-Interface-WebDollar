import BrowserHelpers from "helpers/Browser.helpers"

import GlobalInitialization from "./global-initialize/Global-Initialization"

class InitializeParams{

    constructor(){

        this.maps = {
            activated: true,
            type: "NativeMap",
            style: "dark",
            id: "WebDollarMap",
        };

        this.alertsStickyBar = {
            activated: true,
            id: "WebDollarAlertsStickyBar",
        };

        this.mining = {
            activated: true,
            startAutomatically: true,
            style: "dark",
            id: "WebDollar",
        };

        this.wallet = {
            activated: true,
            style: "dark",
            id: "WebDollar",
        };


        /**
         * On Window Load
         */
        document.addEventListener("DOMContentLoaded",  (event) => {

            console.log("User-Interface-Loaded");
            this.load();

        });

    }

    load(){

        GlobalInitialization.initializeGlobalSettings();

        if (process.env.DEV_SERVER){
            this.mining.startAutomatically = false;
        }

        let mainVue = require('./vue/Main-vue').default;
        mainVue(this.mining, this.wallet);

    }

}

export default new InitializeParams();