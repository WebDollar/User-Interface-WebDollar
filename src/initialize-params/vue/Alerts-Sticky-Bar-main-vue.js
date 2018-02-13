var Vue = require('vue/dist/vue.min.js');

import AlertsStickyBar from 'components/alerts/Alerts-Sticky-Bar.vue';

//for safari workaround
export default (params)=> {

    if (document.getElementById('WebDollarAlertsStickyBar') === null)
        document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", `<div id="WebDollarAlertsStickyBar" > </div>`);

    new Vue({
        el: '#WebDollarAlertsStickyBar',
        render: h => h(AlertsStickyBar)
    })
};