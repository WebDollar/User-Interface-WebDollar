if ((typeof window !== 'undefined' && !window._babelPolyfill) ||
    (typeof global !== 'undefined' && !global._babelPolyfill)) {
    require('babel-polyfill')
}

var Vue = require('vue')

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