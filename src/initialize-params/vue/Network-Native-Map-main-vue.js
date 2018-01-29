
var Vue = require('vue/dist/vue.min.js');

import NetworkNativeMap from 'components/maps/Native-Map/Network-Native-Map.vue';

//for safari workaround
document.addEventListener("DOMContentLoaded", function (event) {

    if (document.getElementById('WebDollarMap') === null)
        return;

    new Vue({
        el: '#WebDollarMap',
        render: h => h(NetworkNativeMap)
    })
});