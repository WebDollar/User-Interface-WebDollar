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

        this.mining = {
            activated: true,
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
        BrowserHelpers.addEvent(window, "load", (event) => {
            console.log("User-Interface-Loaded");
            this.load();

        });

        require('./vue/Main-vue');
        require('./vue/Network-Native-Map-main-vue');

    }

    load(){
        GlobalInitialization.initializeGlobalSettings();
    }



}

export default new InitializeParams();