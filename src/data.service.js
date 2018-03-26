import axios from 'axios';

const api = 'https://swapi.co/api/';

export default {
  getPeople() {
    let index = 1;
    return axios.get(`${api}people/`).then(response => {
      const people = response.data.results.map(h => {
        h.id = index++;
        return h;
      });
      return people;
    });
  },
  getPlanets() {
    let index = 1;
    return axios.get(`${api}planets/`).then(response => {
      const planets = response.data.results.map(h => {
        h.id = index++;
        return h;
      });
      return planets;
    });
  }
};
