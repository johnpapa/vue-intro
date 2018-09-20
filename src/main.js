import ellipsisFilter from '@/shared/ellipsis-filter';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.filter('ellipsis', ellipsisFilter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
