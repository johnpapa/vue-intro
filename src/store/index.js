import Vue from 'vue';
import Vuex from 'vuex';
import peopleModule from './modules/people';
// import usersModule from './modules/planets';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    people: peopleModule,
    // users: usersModule,
  },
  state: {},
});
