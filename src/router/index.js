import Vue from 'vue';
import Router from 'vue-router';
import PeopleList from '@/components/PeopleList';
import PlanetList from '@/components/PlanetList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PeopleList',
      component: PeopleList
    },
    {
      path: '/planets',
      name: 'PlanetList',
      component: PlanetList
    }
  ]
});
