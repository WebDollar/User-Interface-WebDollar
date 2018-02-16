
import BrowserHelpers from "helpers/Browser.helpers"
import InitializeParams from "initialize-params/Initialize-Params"

let exportObject = {

    helpers:{
        browserHelpers: BrowserHelpers,
    },
    initializeParams: InitializeParams,
};


if (!process.env.BROWSER)
    module.exports =  exportObject;

//browser minimized script
if ( typeof global.window !== 'undefined')
    global.window.WebDollarUserInterface = exportObject;

if ( typeof window !== 'undefined')
    window.WebDollarUserInterface = exportObject;

