import MultiVue from 'vue-multivue';
//import AwesomeComponent from './Components/AwesomeComponent.vue';

// new MultiVue('.my-app', {
//     components: {
//         AwesomeComponent
//     }
// });

var Vue = require('vue')

import Profile from './Components/Profile.vue';

new Vue({
    el: '#app',
    components: { Profile }
})


console.log("hello world vue",Profile);