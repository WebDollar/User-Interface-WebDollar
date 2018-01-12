<template>
    <div>
        <vue-slider id="miningWorkersSlider" class="miningSlider" ref="slider" @callback="this.change" :piecewise="true"
                    :width="this.screenWidth < 750 ? this.sliderMobileWidth : 330" :tooltip="false" :min="0" :max="this.logicalProcessors"
                    v-model="value" :disabled="this.disabled"></vue-slider>
    </div>
</template>


<script>

    import vueSlider from './../../../node_modules/vue-slider-component';

    export default {
        name: 'slider',

        components: {
            "vueSlider": vueSlider
        },

        data() {
            return {
                value: 0,
                disabled:true,
                screenWidth: window.innerWidth,
                logicalProcessors: 8,
                sliderMobileWidth: 200,
            }
        },

        methods: {
            change(value) {

                console.log("value", value);

                if (value > (this.value||1) *3){

                    value = (this.value||1) *3;
                    this.$refs['slider'].setValue(value);
                    return;

                }

                this.$emit('sliderChanged', value)
            },
            addEvent(object, type, callback) {
                if (object === null || typeof(object) === 'undefined') return;
                if (object.addEventListener) {
                    object.addEventListener(type, callback, false);
                } else if (object.attachEvent) {
                    object.attachEvent("on" + type, callback);
                } else {
                    object["on" + type] = callback;
                }
            },
        },

        mounted() {

            if (typeof window === "undefined") return false;

            this.addEvent(window, "resize", (event) => {

                this.screenWidth = window.innerWidth;

                if (window.innerWidth<550){
                    this.sliderMobileWidth = window.innerWidth-150+'px';
                }else{
                    this.sliderMobileWidth = '100%';
                }

            });

            this.screenWidth = window.innerWidth;
            if (window.innerWidth<550){
                this.sliderMobileWidth = window.innerWidth-150+'px';
            }else{
                this.sliderMobileWidth = '100%';
            }

            this.logicalProcessors = window.navigator.hardwareConcurrency === undefined ? 8 : 2 * window.navigator.hardwareConcurrency;

        }
    }
</script>

<style>

    .miningSlider {
        padding-top: 15px !important;
        padding-bottom: 15px !important;
        padding-left: 20px !important;
        background-color: #262626;
    }

    .vue-slider-component .vue-slider-piecewise {
        background-color: #424242 !important;
    }

    .vue-slider-component .vue-slider-process {
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#fec02c+29,bc0505+100 */
        background: #fec02c !important; /* Old browsers */
        background: -moz-linear-gradient(left, #fec02c 29%, #bc0505 100%) !important; /* FF3.6-15 */
        background: -webkit-linear-gradient(left, #fec02c 29%, #bc0505 100%) !important; /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right, #fec02c 29%, #bc0505 100%) !important; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fec02c', endColorstr='#bc0505', GradientType=1) !important; /* IE6-9 */
    }

</style>