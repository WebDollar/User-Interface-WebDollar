<template>

    <div class="alertStickyBar" :style="{backgroundColor: this._backgroundColor, display: 'display-inline' }">

        <!--<icon class="btn" :icon="this._icon" :width="5" :height="5" />-->
        <a :href="this.alert.statusHref||''">
            <span class="alertText" v-html="this.alert.statusMessage " :style="{color: this._textColor}"></span>
        </a>

    </div>

</template>

<script>

    import icon from "components/UI/icons/icon.vue"

    export default{

        components:{
            icon,
        },

        props:[
            "alert",
        ],

        computed:{

            _icon(){
                switch (this.alert.statusType){

                    case "error":
                        return "x";

                    case "warning":
                        return "plus";
                }
            },

            _backgroundColor(){

                switch (this.alert.statusType){

                    case "error":
                        return "#840b0b";

                    case "warning":
                        return "#fec02c";
                }

            },

            _textColor(){

                switch (this.alert.statusType){

                    case "error":
                        return "#ffce56";

                    case "warning":
                        return "#000";
                }
            }
        }

    }

</script>


<style>

    .alertStickyBar{
        text-align: center;
    }

    .alertText{
        line-height: 16px!important;
        font-size: 16px!important;
        padding: 5px 0!important;
        display: block!important;
    }

</style>