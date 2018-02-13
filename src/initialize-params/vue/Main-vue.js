var Vue = require('vue/dist/vue.min.js');

import Dashboard from 'components/Dashboard.vue';

//for safari workaround
export default (params)=> {

    if (document.getElementById('WebDollar') === null)
        document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `<div id="WebDollar" > </div>`);

    new Vue({
        el: '#WebDollar',
        render: h => h(Dashboard)
    })
}