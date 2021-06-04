<template>

    <div>

        <notifications class="notificationsBox" group="all" position="bottom left" max="5"/>
        <notifications class="notificationsBox" group="error-firewall" position="bottom left"/>
        <notifications class="notificationsBox" group="error-internet" position="bottom left"/>
        <notifications class="notificationsBox" group="indexedDB-error-reason" position="bottom left"/>
        <notifications class="notificationsBox" group="network-adjusted-time-error" position="bottom left"/>
        <notifications class="notificationsBox" group="network-adjusted-time-error" position="bottom left"/>

    </div>

</template>

<script>

    import Notification from "helpers/Notification.helpers"
    import Notifications from '../../../node_modules/vue-notification';

     export default{

         name: "NotificationsX",

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

         methods:{

             checkIfExistsAlert(statusId){

                  for (let j=this.alerts.length-1; j>=0; j--)
                      if (this.alerts[j].statusId === statusId )
                          return true;

                  return false;

             }

         },

         mounted(){

             if (typeof window === "undefined") return;

             Notification.setVueInstance(this);

             WebDollar.Applications.AdvancedMessages.alert = (message,title,type,timeout)=>{

                 Notification.addAlert(undefined, "error", "Protocol Error", message ,10000);

             };

             WebDollar.StatusEvents.on("blockchain/status", (data)=>{

                 switch (data.message){

                     case "Blockchain Ready to Mine":

                         this.loadedFirstTime = true;
                         Notification.deleteAlert(["error-firewall","error-internet"]);
                         break;

                     case "Error Synchronizing":

                         if (WebDollar.Blockchain.loaded !== true) {
                             Notification.deleteAlert("error-internet");
                             Notification.deleteAlert("error-firewall");
                             Notification.addAlert("error-firewall", "error", "Firewall Error", "Check your Firewall, Router, Anti-virus or Internet",86400000);
                         }
                         else {
                             Notification.deleteAlert("error-internet");
                             Notification.deleteAlert("error-firewall");
                             Notification.addAlert("error-internet", "error", "Connection Error" ,"Internet is no longer working. Check your Internet connection or refresh",86400000);
                         }

                         break;

                     case "No Internet Access":

                         Notification.deleteAlert("error-internet");
                         Notification.deleteAlert("error-firewall");
                         this.addAlert("error-internet", "error", "Internet Error", "Internet is no longer working. Check your Internet connection or refresh",86400000);
                         break;
                 }

             });

             WebDollar.StatusEvents.on("blockchain/logs", (data)=> {

                 switch (data.message) {
                     case "IndexedDB Error":
                         Notification.deleteAlert("indexedDB-error-reason");
                         Notification.addAlert("indexedDB-error-reason", "error", "IndexDB Error", "IndexedDB returned an error <b>"+data.reason+"</b>", 86400000);
                         break;

                     case "You mined way too many blocks":
                         Notification.addAlert("too-many-blocks-mined", "warn", "Fork Warning", "You mined way too many blocks. You are not sync. Refresh in 15 sec", 9000);
                         WebDollar.Blockchain.Mining.stopMining();
                         break;
                 }

             });

             WebDollar.StatusEvents.on("validation/status", (data)=> {

                 switch (data.message) {
                     case "IndexedDB is not supported":
                         if (this.checkIfExistsAlert("indexedDB-error")) break;

                         this.alerts.push("indexedDB-error");
                         Notification.addAlert("indexedDB-error", "error",  "IndexDB Error", "<b>IndexedDB is not supported</b> on your browser. Install a different browser", 86400000);
                         break;

                     case "IndexedDB - PouchDB doesn't work":
                         if (this.checkIfExistsAlert("pouchDB-error")) break;

                         this.alerts.push("pouchDB-error");
                         Notification.addAlert("pouchDB-error", "error", "PouchDB Error", "<b>PouchDB doesn't work</b> "+data.dbName+" . Clear your Website Data from browser. <a href='' style='text-decoration: underline; color:blue'>Click Here</a>", 86400000, "/clearIndexedDB");
                         break;

                     case "Wallet is not loaded successfully":

                         Notification.addAlert("pouchDB-error", "error", "PouchDB Error", "<b>Wallet was not loaded</b> There might be a problem with your browser <b style='text-decoration: underline; color:blue'>Refresh</b> or contact us!", 86400000, "/");

                         break;

                     case "IndexedDB - Wallet couldn't be imported":
                         if (this.checkIfExistsAlert("wallet-error")) break;

                         this.alerts.push("wallet-error");
                         Notification.addAlert("wallet-error", "error", "Wallet Error", "<b>Wallet couldn't be imported</b> "+data.dbName+" Try refresh or Erase your Wallet. <b style='text-decoration: underline; color:blue'>Click Here</b>", 86400000, "/clearIndexedDB");
                         break;

                     case "Incognito mode":
                         Notification.addAlert("incognito-warning", "warn", "Incognito Warning", "Incognito - your <b>WALLET will not be saved</b>", 86400000);
                         break;

                     case "WebAssembly not supported":
                         if (this.checkIfExistsAlert("web-assembly-warning")) break;

                         this.alerts.push("web-assembly-warning");
                         Notification.addAlert("web-assembly-warning", "warn", "Performance Warning", "<b>WebAssembly is not supported</b>. You use an old browser or one that doesn't support WebAssembly. Install Chrome/Firefox/Safari/Opera and mining will increse with ~70%", 86400000);
                         break;

                     case "ASM.JS not supported":
                         if (this.checkIfExistsAlert("asm.js-warning")) break;

                         this.alerts.push("asm.js-warning");
                         Notification.addAlert("asm.js-warning", "error", "AsmJS Error", "<b>ASM.JS is not supported</b>. Mining is not available on your machine. Please update your browser", 86400000);
                         break;
                 }

             });

         }

     }

</script>

<style>

    .notificationsBox{
        color: #fff;
        width:450px!important;
        word-break:break-all;
    }

    .notificationsBox span{
        width: 100%!important;
        cursor:pointer;
    }

    .success{
        background: #2ea75e!important;
        border-left-color: #006528!important;
    }

    .error{
        background: #d23c25!important;
        border-left-color: #842b24!important;
    }

    .warn{
        background: #ffb648!important;
        border-left-color: #7b5419!important;
        color: #523f3c!important;
    }

    .vue-notification{
        background: #4a4a4a;
        border-left: 5px solid #5a5a5a;
    }

    .notification-title{
        font-size: 14px;
        text-transform:uppercase;
        margin-bottom:10px;
    }

    .notification-content{
        font-size: 12px;
        text-transform:none;
    }


    .notificationsBox{
        margin-bottom: 40px;
    }

    @media (max-width: 450px){

        .notificationsBox{
            width:100%!important;
        }

    }

</style>
