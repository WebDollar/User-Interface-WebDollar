<template>
    <div class="alertStickyBar" style="'color: '+this._textColor">
        <icon class="btn" :icon="this._icon" :width="5" :height="5" />
        <b :style="{color: this._textColor}">{{ this.statusMessage }}</b>
    </div>
</template>

<script>

    import icon from "components/UI/icons/icon.vue"

    export default{

        components:{
            icon,
        },

        computed:{
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
        }

    }

</script>


<style>

    .alertStickyBar{
        text-align: center;
    }

</style>