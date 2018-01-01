var Vue = require('vue')

import Dashboard from './Components/Dashboard.vue';

window.onload = () => {

    new Vue({
        el: '#app',
        render: h => h(Dashboard)
    })

};
