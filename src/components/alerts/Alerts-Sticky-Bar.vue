<script>

    import Notification from "helpers/Notification.helpers"

     export default{

         name: "alerts-sticky-bar",

         data: () => {
             return {
                 loadedFirstTime: false,

                 alertUniqueIds: 0,
                 alerts: [],
             }
         },

         computed:{

             _showStatus(){
                 return this.alerts.length > 0;
             },
         },

         mounted(){

             if (typeof window === "undefined") return;

             Notification.setVueInstance(this);

             WebDollar.Applications.AdvancedMessages.alert = (message,title,type,timeout)=>{

                 Notification.addAlert(undefined, "error", "Protocol Error", message ,43200);

             }

             WebDollar.StatusEvents.on("blockchain/status", (data)=>{

                 switch (data.message){

                     case "Blockchain Ready to Mine":

                         this.loadedFirstTime = true;
                         Notification.deleteAlert(["error-firewall","error-internet"]);
                         break;

                     case "Error Synchronizing":

                         if (WebDollar.Blockchain.loaded !== true) {
//                             Notification.deleteAlert("error-internet");
//                             Notification.deleteAlert("error-firewall");
                             Notification.addAlert("error-firewall", "error", "Firewall Error", "Check your Firewall, Router, Anti-virus or Internet",43200);
                         }
                         else {
//                             Notification.deleteAlert("error-internet");
//                             Notification.deleteAlert("error-firewall");
                             Notification.addAlert("error-internet", "error", "Connection Error" ,"Internet is no longer working. Check your internet or refresh",43200);
                         }

                         break;

                     case "No Internet Access":

//                         Notification.deleteAlert("error-internet");
//                         Notification.deleteAlert("error-firewall");
                         this.addAlert("error-internet", "error", "Internet Error", "Internet is no longer working. Check your internet or refresh",43200);
                         break;
                 }

             });

             WebDollar.StatusEvents.on("blockchain/logs", (data)=> {

                 switch (data.message) {
                     case "IndexedDB Error":
//                         Notification.deleteAlert("indexedDB-error-reason");
                         Notification.addAlert("indexedDB-error-reason", "error", "IndexDB Error", "IndexedDB returned an error <b>"+data.reason+"</b>", 43200);
                         break;

                     case "Network Adjusted Time Error":
//                         Notification.deleteAlert("network-adjusted-time-error");
                         Notification.addAlert("network-adjusted-time-error", "error", "Network Time Error", "Network Adjusted Time didn't work <b>"+data.reason+"</b>", 43200);

                         break;

                     case "Network Adjusted Time Success":
//                         Notification.deleteAlert("network-adjusted-time-error");
                         break;

                     case "You mined way too many blocks":

                         Notification.addAlert("too-many-blocks-mined", "warn", "Fork Warning", "You mined way too many blocks. You are not sync. Refresh in 15 sec", 900);
                         WebDollar.Blockchain.Mining.stopMining();

                         break;
                 }

             });

             WebDollar.StatusEvents.on("validation/status", (data)=> {

                 switch (data.message) {
                     case "IndexedDB is not supported":
                         if (Notification.checkIfExistsAlert("indexedDB-error")) break;

                         Notification.addAlert("indexedDB-error", "error",  "IndexDB Error", "<b>IndexedDB is not supported</b> on your browser. Install a different browser", 43200);
                         break;

                     case "IndexedDB - PouchDB doesn't work":
                         if (Notification.checkIfExistsAlert("pouchDB-error")) break;

                         Notification.addAlert("pouchDB-error", "error", "PouchDB Error", "<b>PouchDB doesn't work</b> "+data.dbName+" . Clear your Website Data from browser. <b style='text-decoration: underline; color:blue'>Click Here</b>", 43200, "/clearIndexedDB");
                         break;

                     case "Wallet is not loaded successfully":

                         Notification.addAlert("pouchDB-error", "error", "PouchDB Error", "<b>Wallet was not loaded</b> There might big a problem with your browser <b style='text-decoration: underline; color:blue'>Refresh</b> or contact us!", 43200, "/");

                         break;

                     case "IndexedDB - Wallet couldn't be imported":
                         if (Notification.checkIfExistsAlert("wallet-error")) break;

                         Notification.addAlert("wallet-error", "error", "Wallet Error", "<b>Wallet couldn't be imported</b> "+data.dbName+" Try refresh or Erase your Wallet. <b style='text-decoration: underline; color:blue'>Click Here</b>", 43200, "/clearIndexedDB");
                         break;

                     case "Incognito mode":
                         Notification.addAlert("incognito-warning", "warn", "Incognito Warning", "Incognito - your <b>WALLET will not be saved</b>", 43200);
                         break;

                     case "WebAssembly not supported":
                         if (Notification.checkIfExistsAlert("web-assembly-warning")) break;

                         Notification.addAlert("web-assembly-warning", "warn", "Performance Warning", "<b>WebAssembly is not supported</b>. You use an old browser or one that doesn't support WebAssembly. Install Chrome/Firefox/Safari and mining increases with 70%", 43200);
                         break;

                     case "ASM.JS not supported":
                         if (Notification.checkIfExistsAlert("asm.js-warning")) break;

                         Notification.addAlert("asm.js-warning", "error", "AsmJS Error", "<b>ASM.JS is not supported</b>. Mining is not available on your machine. Please update your browser", 43200);
                         break;
                 }

             });

         }

     }

</script>