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

             WebDollar.Blockchain.emitter.on("blockchain/status-webdollar", (data)=>{

                 switch (data.message){
                     case "Ready":
                         this.loadedFirstTime = true;

                         this.deleteAlert(["error-firewall","error-internet"]);

                         break;
                     case "Error Synchronizing":

                         if (WebDollar.Blockchain._onLoadedResolver !== "done") {
                             this.addAlert("error-firewall", "error", "Check your Firewall, Router, Anti-virus or Internet");
                             this.delete("error-internet");
                         }
                         else
                             this.addAlert("error-internet", "error","Internet is no longer working. Check your internet or refresh");

                         break;

                     case "No Internet Access":
                         this.addAlert("error-internet", "error","Internet is no longer working. Check your internet or refresh");
                         break;
                 }



             });

             WebDollar.Blockchain.emitter.on("validation/status", (data)=> {

                 switch (data.message) {
                     case "IndexedDB is not supported":
                         this.addAlert("indexedDB-error", "error", "IndexedDB is not supported on your browser. Install a different browser");
                         break;

                     case "IndexedDB - PouchDB doesn't work":
                         this.addAlert("pouchDB-error", "error", "PouchDB doesn't work "+data.dbName+" . Clear your Website Data from browser");
                         break;

                     case "Incognito mode":
                         this.addAlert("incognito-warning", "warning", "Incognito - your WALLET will not be saved");
                         break;

                     case "WebAssembly not supported":
                         this.addAlert("web-assembly-warning", "warning", "WebAssembly is not supported. You use an old browser or one that doesn't support WebAssembly. Install Chrome/Firefox/Safari and mining increases with 70%");
                         break;

                     case "ASM.JS not supported":
                         this.addAlert("web-assembly-warning", "error", "ASM.JS is not supported. Mining is not available on your machine. Please update your browser");
                         break;
                 }

             });

         },

         methods:{


             addAlert(statusId, statusType, statusMessage, timeoutDelete){

                 this.alertUniqueIds += 1;

                 let alert = {
                     statusUniqueId: this.alertUniqueIds,
                     statusId: statusId,
                     statusType: statusType,
                     statusMessage: statusMessage,
                 };

                 this.alerts.push(alert);

                 if (typeof timeoutDelete === "number")
                    setTimeout(()=>{

                        for (let i=0; i<this.alerts.length; i++)
                            if (this.alerts[i] === alert)
                                this.alerts[i].splice(i,1);
                    }, timeoutDelete)

             },

             deleteAlert(statusId){

                 if (Array.isArray(!statusId)) statusId = [statusId];

                 for (let i=0; i<statusId.length; i++){

                     for (let j=this.alerts.length-1; j>=0; j--)
                         if (this.alerts[j].statusId === statusId[i] ){
                             this.alerts.splice(i,1);
                             break;
                         }
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