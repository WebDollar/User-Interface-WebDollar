if(( typeof window !== 'undefined' && !window._babelPolyfill) ||
    ( typeof global !== 'undefined' && !global._babelPolyfill)) {
    require('babel-polyfill')
}

var Vue = require('vue')

import Dashboard from 'components/Dashboard.vue';

window.onload = () => {

    new Vue({
        el: '#webDollar',
        render: h => h(Dashboard)
    })

};
