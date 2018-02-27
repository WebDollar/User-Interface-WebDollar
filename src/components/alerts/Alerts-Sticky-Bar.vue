<template>
    <div v-show="this._showStatus">

        <div class='alertsStickyBar' :style="'background: '+this._backgroundColor " >

            <alert v-for="alert in this.alerts"
                   :key="'alert'+alert.statusUniqueId"
                   :alert="alert"
            >
            </alert>

        </div>
    </div>
</template>

<script>

    import icon from "components/UI/icons/icon.vue"
    import Alert from "./Alert.vue"

     export default{

         name: "alerts-sticky-bar",

         components:{
             icon,
             Alert,
         },

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

             WebDollar.StatusEvents.on("blockchain/status-webdollar", (data)=>{

                 switch (data.message){
                     case "Ready":
                         this.loadedFirstTime = true;

                         this.deleteAlert(["error-firewall","error-internet"]);

                         break;
                     case "Error Synchronizing":

                         if (WebDollar.Blockchain._onLoadedResolver !== "done") {
                             this.deleteAlert("error-internet");
                             this.deleteAlert("error-firewall");
                             this.addAlert("error-firewall", "error", "Check your Firewall, Router, Anti-virus or Internet");
                         }
                         else {
                             this.deleteAlert("error-internet");
                             this.deleteAlert("error-firewall");
                             this.addAlert("error-internet", "error", "Internet is no longer working. Check your internet or refresh");
                         }

                         break;

                     case "No Internet Access":
                         this.deleteAlert("error-internet");
                         this.deleteAlert("error-firewall");
                         this.addAlert("error-internet", "error","Internet is no longer working. Check your internet or refresh");
                         break;
                 }



             });

             WebDollar.StatusEvents.on("blockchain/logs", (data)=> {

                 switch (data.message) {
                     case "IndexedDB Error":
                         this.deleteAlert("indexedDB-error-reason");
                         this.addAlert("indexedDB-error-reason", "error", "IndexedDB returned an error <b>"+data.reason+"</b>");
                         break;
                 }

             });

             WebDollar.StatusEvents.on("validation/status", (data)=> {

                 switch (data.message) {
                     case "IndexedDB is not supported":
                         this.addAlert("indexedDB-error", "error", "<b>IndexedDB is not supported</b> on your browser. Install a different browser");
                         break;

                     case "IndexedDB - PouchDB doesn't work":
                         this.addAlert("pouchDB-error", "error", "<b>PouchDB doesn't work</b> "+data.dbName+" . Clear your Website Data from browser. <b style='text-decoration: underline; color:blue'>Click Here</b>", undefined, "/clearIndexedDB");
                         break;

                     case "IndexedDB - Wallet couldn't be imported":
                         this.addAlert("wallet-error", "error", "<b>Wallet couldn't be imported</b> "+data.dbName+" . Clear your Website Data from browser. <b style='text-decoration: underline; color:blue'>Click Here</b>", undefined, "/clearIndexedDB");
                         break;

                     case "Incognito mode":
                         this.addAlert("incognito-warning", "warning", "Incognito - your <b>WALLET will not be saved</b>b");
                         break;

                     case "WebAssembly not supported":
                         this.addAlert("web-assembly-warning", "warning", "<b>WebAssembly is not supported</b>. You use an old browser or one that doesn't support WebAssembly. Install Chrome/Firefox/Safari and mining increases with 70%");
                         break;

                     case "ASM.JS not supported":
                         this.addAlert("asm.js-warning", "error", "<b>ASM.JS is not supported</b>. Mining is not available on your machine. Please update your browser");
                         break;
                 }

             });

         },

         methods:{


             addAlert(statusId, statusType, statusMessage, timeoutDelete, href){

                 this.alertUniqueIds += 1;

                 let alert = {
                     statusUniqueId: this.alertUniqueIds,
                     statusId: statusId,
                     statusType: statusType,
                     statusMessage: statusMessage,
                     statusHref: href,
                 };

                 this.alerts.push(alert);

                 if (typeof timeoutDelete === "number")
                    setTimeout(()=>{

                        for (let i=0; i<this.alerts.length; i++)
                            if (this.alerts[i] === alert)
                                this.alerts[i].splice(i,1);
                    }, timeoutDelete)

             },

             deleteAlert(arrayStatusId){

                 if (!Array.isArray(arrayStatusId)) arrayStatusId = [arrayStatusId];

                 for (let i=0; i<arrayStatusId.length; i++)

                     for (let j=this.alerts.length-1; j>=0; j--)
                         if (this.alerts[j].statusId === arrayStatusId[i] ){
                             this.alerts.splice(j,1);
                             break;
                         }


             }

         }

     }

</script>

<style>

    .alertsStickyBar{

        position: fixed;
        width: 100%;
        z-index: 1000;
        text-align: center;

    }

</style>