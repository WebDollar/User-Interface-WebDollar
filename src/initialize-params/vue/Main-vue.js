if ((typeof window !== 'undefined' && !window._babelPolyfill) ||
    (typeof global !== 'undefined' && !global._babelPolyfill)) {
    require('babel-polyfill')
}

var Vue = require('vue')

import Dashboard from 'components/Dashboard.vue';

//for safari workaround
document.addEventListener("DOMContentLoaded", function (event) {
    if (document.getElementById('WebDollar') === null)
        document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `<div id="WebDollar" > </div>`);

    new Vue({
        el: '#WebDollar',
        render: h => h(Dashboard)
    })
});