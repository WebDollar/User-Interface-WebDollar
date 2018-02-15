<template>

    <div class="alertStickyBar" :style="{backgroundColor: this._backgroundColor }">

        <icon class="btn" :icon="this._icon" :width="5" :height="5" />
        <b :style="{color: this._textColor}">{{ this.alert.statusMessage }}</b>

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
                        return "red";

                    case "warning":
                        return "yellow";
                }

            },

            _textColor(){

                switch (this.alert.statusType){

                    case "error":
                        return "yellow";

                    case "warning":
                        return "navy";
                }
            }
        }

    }

</script>


<style>

    .alertStickyBar{
        text-align: center;
    }

</style>