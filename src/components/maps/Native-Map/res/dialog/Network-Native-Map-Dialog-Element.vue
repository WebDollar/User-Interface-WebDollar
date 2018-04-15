<template>

    <div>
        <div style="display: inline-block; padding-right: 10px">
            <!--<img v-if="nodeType === 'myself' " class="network-dialog-icon icon-myself" src="https://forum.noxiousnet.com/plugins/nodebb-plugin-emoji-one/static/images/1f60e.png">-->
            <!--<img v-if="nodeType === 'browser' " class="network-dialog-icon icon-browser" src="http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/48/Browser-icon.png">-->
            <!--<img v-if="nodeType === 'terminal' " class="network-dialog-icon icon-terminal" src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/terminal-icon.png">-->
            <!--<img class="icon-connected" :src="this.connected === 'connected' ? 'http://icons.iconarchive.com/icons/icons8/windows-8/16/Network-Connected-icon.png' : 'http://icons.iconarchive.com/icons/icons8/windows-8/16/Network-Disconnected-icon.png' ">-->
        </div>
        <div ref="refText" class="map-dialog-description-text" style="display: inline-block;">
            <br>{{country}}, {{city}}<br>
            <small>{{this.getAddress || '&nbsp;'}} </small>
        </div>
    </div>

</template>

<script>

    export default{

        props:{
            nodeType:'',
            status:'',
            country:'',
            city:'',
            address:'',

        },

        computed:{

            getAddress(){

                if (typeof this.address ==="string") return this.address;
                else
                if (typeof this.address === "object" && typeof this.address.addressString === 'string') return this.address.addressString;
                else return "NOT DEFINED";

            }

        }

    }

</script>

<style>

    .icon-connected{
        -webkit-filter: brightness(0) invert(1);
        filter: brightness(0) invert(1);
    }

    .network-dialog-icon {
        width: 16px;
        display: inline-block;
    }

</style>