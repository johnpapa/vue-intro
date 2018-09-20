import config from '@/shared/config';
import axios from 'axios';

const { API } = config;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    people: [],
  },
  mutations: {
    addPerson(state, person) {
      state.people.push(person);
    },
    updatePerson(state, person) {
      state.people = [...state.people.filter(p => p.id !== person.id), person];
      // const index = this.people.findIndex(h => person.id === h.id);
      // this.people.splice(index, 1, person);
    },
    getPeople(state, people) {
      state.people = people;
    },
    deletePerson(state, person) {
      state.people = state.people.filter(p => p.id !== person.id);
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    getPeople({ commit }) {
      let index = 1;
      return axios
        .get(`${API}/people`)
        .then(response => {
          const people = response.data.results.map(p => {
            p.id = index++;
            return p;
          });
          commit('getPeople', people);
          return people;
        })
        .catch(console.error);
    },
  },
  getters: {
    // selectors
    sortedPeople(state) {
      return [...state.people].sort((a, b) => {
        return a.id - b.id;
      });
    },
  },
};
