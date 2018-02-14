<template>
    <div v-show="this._showStatus">
        <div class='alertsStickyBar' :style="'background: '+this._backgroundColor " >

            <div :style="'textAlign: center, margiTop: 5, color: '+this._textColor">
                <icon class="btn" alt="Secure Wallet" text="Download Address" :icon="this._icon" :style="'font-size: 11px'" />
                <b :style="{color: this._textColor}">{{ this.statusMessage }}</b>
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
                 statusType: '',
                 statusMessage: '',
             }
         },


         computed:{

             _showStatus(){
                 return this.statusType !== '';
             },

             _icon(){
                 switch (this.statusType){

                     case "error":
                         return "x";

                     case "warning":
                         return "plus";
                 }
             },

             _backgroundColor(){

                 switch (this.statusType){

                     case "error":
                         return "red";

                     case "warning":
                         return "yellow";
                 }

             },

             _textColor(){

                 switch (this.statusType){

                     case "error":
                         return "yellow";

                     case "warning":
                         return "navy";
                 }
             }

         },

         mounted(){


             if (typeof window === "undefined") return;

             WebDollar.Blockchain.emitter.on("blockchain/status-webdollar", (data)=>{

                 switch (data.message){
                     case "Ready":
                         this.loadedFirstTime = true;

                         WebDollar.Blockchain.Mining.setWorkers(1);

                         this.statusType = '';
                         this.statusMessage = '';

                         break;
                     case "Error Synchronizing":


                         if (WebDollar.Blockchain._onLoadedResolver !== "done") {

                             this.statusType = "error";
                             this.statusMessage="Internet is no longer working. Check your internet or refresh";

                         } else {
                             this.statusType = "error";
                             this.statusMessage="Synchronization failed. Check your Firewall, Router, Anti-virus or Internet";
                         }

                         break;

                     case "No Internet Access":
                         this.statusType = "error";
                         this.statusMessage="Internet is no longer working. Check your internet or refresh";
                         break;
                 }



             });

//             this.statusType = "error";
//             this.statusMessage = "EROARE";


         },

         methods:{



         }

     }

</script>

<style>

    .alertsStickyBar{

        display: inline-block;
        width: 100%;
        margin-bottom: 0;
        min-height: 21px;
        text-align: center;

    }

</style>