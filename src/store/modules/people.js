import config from '@/shared/config';
import axios from 'axios';
import {
  ADD_PERSON,
  DELETE_PERSON,
  GET_PEOPLE,
  UPDATE_PERSON,
} from './mutation-types';

const { API } = config;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    people: [],
  },
  mutations: {
    [ADD_PERSON](state, person) {
      state.people.push(person);
    },
    [UPDATE_PERSON](state, person) {
      state.people = [...state.people.filter(p => p.id !== person.id), person];
      // const index = this.people.findIndex(h => person.id === h.id);
      // this.people.splice(index, 1, person);
    },
    [GET_PEOPLE](state, people) {
      state.people = people;
    },
    [DELETE_PERSON](state, person) {
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
          commit(GET_PEOPLE, people);
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
