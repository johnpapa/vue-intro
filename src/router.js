import Home from '@/views/Home.vue';
// import PeopleList from '@/views/PeopleList.vue';
// import PlanetList from '@/views/PlanetList.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/people',
      name: 'PeopleList',
      // component: PeopleList,
      component: () =>
        import(/* webpackChunkName: "people" */ './views/PeopleList.vue'),
    },
    {
      path: '/planets',
      name: 'PlanetList',
      // component: PlanetList,
      component: () =>
        import(/* webpackChunkName: "planets" */ './views/PlanetList.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
