import axios from 'axios';

const api = 'https://swapi.co/api/people/';

export default {
  getHeroes() {
    let index = 1;
    return axios.get(`${api}`).then(response => {
      const heroes = response.data.results.map(h => {
        h.id = index++;
        return h;
      });
      return heroes;
    });
  }
};
