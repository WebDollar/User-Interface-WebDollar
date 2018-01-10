import BrowserHelpers from "helpers/Browser.helpers"

class GlobalInitialization {

    constructor() {

    }


    initializeGlobalSettings() {

        //-----------------------
        // Int Script
        //-----------------------

        if (document.getElementById("WebdollarFont") === null)
            document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", `<link id="WebdollarFont" href="public/assets/fonts/avenir-light.woff" rel="stylesheet">`);

        if (document.getElementById("WebdollarViewPort") === null)
            document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", `<meta id="WebdollarViewPort" name="viewport" content="width=device-width, initial-scale=1.0"/>`)

        window.screenHeight = window.innerHeight;
        window.screenWidth = window.innerWidth;

        BrowserHelpers.addEvent(window, "resize", (event) => {
            window.screenHeight = window.innerHeight;
            window.screenWidth = window.innerWidth;
        });
    }


}

export default new GlobalInitialization()