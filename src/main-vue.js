var Vue = require('vue')

import Dashboard from 'components/Dashboard.vue';

window.onload = () => {

    new Vue({
        el: '#webDollar',
        render: h => h(Dashboard)
    })

};
