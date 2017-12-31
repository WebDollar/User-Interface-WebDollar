import BrowserHelpers from "helpers/Browser.helpers"

class InitializeParams{

    constructor(){

        this.maps = {
            type: "NativeMap",
            style: "dark",
        };


        /**
         * On Window Load
         */
        BrowserHelpers.addEvent(window, "load", (event) => {
            console.log("loooooad");
        });

    }

}

export default new InitializeParams();