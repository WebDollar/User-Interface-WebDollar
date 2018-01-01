var Vue = require('vue')

import Dashboard from './Components/Dashboard.vue';

window.onload = () => {

    new Vue({
        el: '#webDollar',
        render: h => h(Dashboard)
    })

};
