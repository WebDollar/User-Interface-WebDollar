<template>
    <div v-show="this._showStatus">
        <div class='alertsStickyBar' :style="'background: '+this._backgroundColor " >

            <div class="alertStickyBar" style="'color: '+this._textColor">
                <div v-for="walletAddress in this.addresses"
                         :isMiningAddress="miningAddress === walletAddress.address"
                         :key="walletAddress.address"
                         :id="'address'+walletAddress.address"
                         :address="walletAddress.address"
                         style="padding-right: 20px"
                />
            </div>


        </div>
    </div>
</template>

<script>

    import icon from "components/UI/icons/icon.vue"

     export default{

         name: "alerts-sticky-bar",

         components:{
             icon,
         },

         data: () => {
             return {
                 loadedFirstTime: false,

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

//             WebDollar.Blockchain.emitter.on("blockchain/status-webdollar", (data)=>{
//
//                 switch (data.message){
//                     case "Ready":
//                         this.loadedFirstTime = true;
//
//                         WebDollar.Blockchain.Mining.setWorkers(1);
//
//                         this.statusType = '';
//                         this.statusMessage = '';
//
//                         break;
//                     case "Error Synchronizing":
//
//
//                         if (WebDollar.Blockchain._onLoadedResolver !== "done") {
//
//                             this.statusType = "error";
//                             this.statusMessage="Check your Firewall, Router, Anti-virus or Internet";
//
//
//                         } else {
//                             this.statusType = "error";
//                             this.statusMessage="Internet is no longer working. Check your internet or refresh";
//                         }
//
//                         break;
//
//                     case "No Internet Access":
//                         this.statusType = "error";
//                         this.statusMessage="Internet is no longer working. Check your internet or refresh";
//                         break;
//                 }
//
//
//
//             });


             this.addAlert(undefined, "error", "eroare1")
             this.addAlert(undefined, "error", "eroare2")


         },

         methods:{


             addAlert(statusId, statusType, statusMessage, timeoutDelete){

                 let alert = {
                     statusId: statusId,
                     statusType: statusType,
                     statusMessage: statusMessage,
                 };

                 if (typeof timeoutDelete === "number")
                    setTimeout(()=>{

                        for (let i=0; i<this.alerts.length; i++)
                            if (this.alerts[i] === alert)
                                this.alerts[i].splice(i,1);
                    }, timeoutDelete)

             },

             deleteAlert(statusId){

                 for (let i=this.alerts.length-1; i>=0; i--)
                     if (this.alerts[i].statusId === statusId ){
                        this.alerts.splice(i,1);
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