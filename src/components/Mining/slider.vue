<template>
    <div>
        <vue-slider id="miningWorkersSlider" class="miningSlider" ref="slider" @callback="this.change" :piecewise="true"
                    :width="this.sliderWidth" :tooltip="false" :min="0" :max="this.logicalProcessors"
                    v-if="this.renderSlider"
                    v-model="value" :disabled="this.disabled"></vue-slider>
    </div>
</template>


<script>

    import vueSlider from 'vue-slider-component';
    import * as NoSleep from 'nosleep.js/dist/NoSleep';


    export default {

        name: 'slider',

        components: {
            "vueSlider": vueSlider
        },

        data() {
            return {
                value: localStorage.getItem("miner-settings-worker-count") || 0,
                disabled:true,
                screenWidth: window.innerWidth,
                logicalProcessors: window.navigator.hardwareConcurrency === undefined ? 4 : window.navigator.hardwareConcurrency * 1,
                sliderWidth: null,
                disableHalving: false,
                renderSlider: false,
                noSleep: new NoSleep()
            }
        },

        methods: {
            change(value) {
                localStorage.setItem("miner-settings-worker-count", value)
                if (value > 0) {
                    this.noSleep.enable();
                    console.log('Enabled screen sleep prevention.')
                } else {
                    this.noSleep.disable();
                    console.log('Disabled screen sleep prevention.')
                }
                this.$emit('sliderChanged', value);
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
                    this.sliderWidth = window.innerWidth-180;
                }else{
                    this.sliderWidth = 330;
                }
                this.$refs["slider"].refresh();

            });

            this.screenWidth = window.innerWidth;
            if (window.innerWidth<550){
                this.sliderWidth = window.innerWidth-180;
            }else{
                this.sliderWidth = 330;
            }
            this.renderSlider = true;
            this.logicalProcessors = window.navigator.hardwareConcurrency === undefined ? 4 : window.navigator.hardwareConcurrency * 1;
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