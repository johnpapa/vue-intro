import Vue from 'vue';
import Router from 'vue-router';
import HeroList from '@/components/HeroList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HeroList',
      component: HeroList
    }
  ]
});
