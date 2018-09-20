import config from '@/shared/config';
import axios from 'axios';

const { API } = config;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    planets: [],
  },
  mutations: {
    addPlanet(state, planet) {
      state.planets.push(planet);
    },
    updatePlanet(state, planet) {
      state.planets = [
        ...state.planets.filter(p => p.id !== planet.id),
        planet,
      ];
      // const index = this.planets.findIndex(h => planet.id === h.id);
      // this.planets.splice(index, 1, planet);
    },
    getPlanets(state, planets) {
      state.planets = planets;
    },
    deletePlanet(state, planet) {
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
          commit('getPlanets', planets);
          return planets;
        })
        .catch(console.error);
    },
  },
  getters: {
    // selectors
    sortedPlanets(state) {
      return [...state.planets].sort((a, b) => {
        return a.id - b.id;
      });
    },
  },
};
