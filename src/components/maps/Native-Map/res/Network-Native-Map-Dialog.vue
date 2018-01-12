<template>
    <!-- Popup Description -->
    <div class="map-dialog ">

        <div class="map-dialog-description" ref="refDialogContainer" :style="{opacity: this.display ? 1 : 0}">
            <div>
                <img ref="refIconMyself" class="icon-myself" src="https://forum.noxiousnet.com/plugins/nodebb-plugin-emoji-one/static/images/1f60e.png">
                <img ref="refIconBrowser" class="icon-browser" src="http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/48/Browser-icon.png">
                <img ref="refIconTerminal" class="icon-terminal" src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/terminal-icon.png">
            </div>
            <div ref="refText" class="map-dialog-description-text">
                <b>{{status}}</b>
                <br>{{country}}, {{city}}<br>
                <small>{{address|| '&nbsp;'}} </small>
            </div>
        </div>
    </div>
</template>

<script>

    export default{

        data: () => {
            return {

                display: false,

                status:'',
                country:'',
                city:'',
                address:'',
            }
        },

        methods: {

            _hideAllIcons(exclude){

                this.$refs['refIconMyself'].style.display = 'none';
                this.$refs['refIconBrowser'].style.display = 'none';
                this.$refs['refIconTerminal'].style.display = 'none';

            },

            _setNodeType(nodeType) {

                let icon;

                if (nodeType === 'myself') icon = this.$refs['refIconMyself'];
                else if (nodeType === 'browser') icon = this.$refs['refIconBrowser'];
                else if (nodeType === 'terminal') icon = this.$refs['refIconTerminal'];
                else icon = this.$refs['refIconTerminal'];

                this._hideAllIcons(icon);
                icon.style.display = 'inline-block';

            },

            show(desc) {
                this._setNodeType(desc.nodeType);

                this.status = desc.status;
                this.country = desc.country;
                this.city = desc.city;

                if (typeof desc.address ==="string") this.address = desc.address;
                else
                if (typeof desc.address === "object" && typeof desc.address.addressString === 'string') this.address = desc.address.addressString;
                else this.address = "NOT DEFINED";

                console.log(desc.address);

                this.display = 1;
            },

            hide() {
                this.display = 0;
            },
        }

    }

</script>



<style>
    .map-dialog-description {
        color: #ffc107;
        height: 100px;
        width: 200px;
        margin: 0;
        background-color: rgba(38, 41, 43, 0.66);
        border-radius: 3px;
        display: block;
        padding: 8px;
        opacity: 0;
        will-change: opacity;
        transition: 0.3s opacity;
        text-align: center;
        pointer-events: none;
        position: relative;
        margin-left: -100px;
        left: 50%;
        top: 100px;
        z-index: 100;
    }

    @media (max-height: 800px) {
        .map-dialog-description {
            top: 40px;
        }
    }

    .map-dialog {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        text-align: center;
        pointer-events: none;
    }

    .map-dialog-description img {
        width: 24px;
        display: inline-block;
    }

</style>