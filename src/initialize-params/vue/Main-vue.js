var Vue = require('vue/dist/vue.min.js');

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