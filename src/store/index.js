import Vue from 'vue';
import Vuex from 'vuex';
import peopleModule from './modules/people';
import planetsModule from './modules/planets';

export * from './modules/mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    people: peopleModule,
    planets: planetsModule,
  },
  state: {},
});
