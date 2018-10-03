import config from '@/shared/config';
import axios from 'axios';
import {
  ADD_PLANET,
  DELETE_PLANET,
  GET_PLANETS,
  UPDATE_PLANET,
} from './mutation-types';

const { API } = config;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    planets: [],
  },
  mutations: {
    [ADD_PLANET](state, planet) {
      // state.planets.push(planet); // mutable addition
      state.planets = [...state.planets, planet]; // replace the array, still mutating state
    },
    [UPDATE_PLANET](state, planet) {
      state.planets = [
        ...state.planets.filter(p => p.id !== planet.id),
        planet,
      ];
      // const index = this.planets.findIndex(h => planet.id === h.id);
      // this.planets.splice(index, 1, planet);
    },
    [GET_PLANETS](state, planets) {
      state.planets = planets;
    },
    [DELETE_PLANET](state, planet) {
      state.planets = state.planets.filter(p => p.id !== planet.id);
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    getPlanets({ commit }) {
      let index = 1;
      return axios
        .get(`${API}/planets`)
        .then(response => {
          const planets = response.data.results.map(p => {
            p.id = index++;
            return p;
          });
          commit(GET_PLANETS, planets);
          return planets;
        })
        .catch(console.error);
    },
  },
  getters: {
    // selectors
    planets: state => state.people,
    sortedPlanets(state) {
      return [...state.planets].sort((a, b) => a.id - b.id);
    },
  },
};
