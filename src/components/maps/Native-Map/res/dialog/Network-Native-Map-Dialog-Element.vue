<template>

    <div>
        <div style="display: inline-block; padding-right: 10px">
            <icon v-if="nodeType === 'myself' " icon="sun-glasses" style="padding-right: 10px"> </icon>
            <icon v-if="nodeType === 'browser' " icon="network" style="padding-right: 10px"></icon>
            <icon v-if="nodeType === 'terminal' " icon="terminal" style="padding-right: 10px"> </icon>
            <icon v-if="nodeType === 'terminal-waitlist' " icon="terminal" style="padding-right: 10px"> </icon>
            <icon v-if="nodeType === 'browser-waitlist' " icon="network" style="padding-right: 10px"> </icon>
            <img alt="icon" class="icon-connected" :src="this.connected === 'connected' ? 'https://icons.iconarchive.com/icons/icons8/windows-8/16/Network-Connected-icon.png' : 'https://icons.iconarchive.com/icons/icons8/windows-8/16/Network-Disconnected-icon.png' ">
        </div>
        <div ref="refText" class="map-dialog-description-text" style="display: inline-block;">
            <br>{{country}}, {{city}}<br>
            <small>{{this.getAddress || '&nbsp;'}} </small>
        </div>
    </div>

</template>

<script>

    import icon from "components/UI/icons/icon.vue"

    export default{

        components: { icon },

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