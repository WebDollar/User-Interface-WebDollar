var Vue = require('vue/dist/vue.min.js');

import Dashboard from 'components/Dashboard.vue';
import Notifications from 'vue-notification';

import VueQrcodeReader from "vue-qrcode-reader";

Vue.use(VueQrcodeReader);
Vue.use(Notifications);

//for safari workaround
export default (params)=> {

    Dashboard.startAutomatically = params.startAutomatically;

    if (document.getElementById('WebDollar') === null)
        document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `<div id="WebDollar" > </div>`);


    new Vue({
        el: '#WebDollar',
        render: (createElement) => {
            let dashboard = createElement(Dashboard, {
                props: {
                    startAutomatically: params.startAutomatically,
                }
            })

            return dashboard;
        }
    })
}