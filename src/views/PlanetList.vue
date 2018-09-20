<template>
  <div>
    <div class="button-group">
      <button @click="getPlanets">Refresh</button>
    </div>
    <ul class="planets" v-if="planets && planets.length">
      <li v-for="planet in planets" :key="planet.id" class="planet-container" :class="{selected: planet === selectedPlanet}">
        <div class="planet-element">
          <div class="badge">{{planet.id}}</div>
          <div class="planet-text" @click="onSelect(planet)">
            <div class="name">{{planet.name}}</div>
            <div class="terrain">{{planet.terrain}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/shared/config';

const { API } = config;

export default {
  data() {
    return {
      selectedPlanet: null,
      planets: [],
    };
  },
  created() {
    this.getPlanets();
  },
  methods: {
    clear() {
      this.selectedPlanet = null;
    },
    getPlanets() {
      this.planets = [];
      this.clear();
      return this.getPlanetsData().then(planets => (this.planets = planets));
    },
    getPlanetsData() {
      let index = 1;
      return axios.get(`${API}/planets/`).then(response => {
        const planets = response.data.results.map(h => {
          h.id = index++;
          return h;
        });
        return planets;
      });
    },
    onSelect(planet) {
      this.selectedPlanet = planet;
    },
    unselect() {
      this.selectedPlanet = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.button-group {
  margin: 0.5em;
}
.selected {
  background-color: rgb(0, 120, 215) !important;
  color: white;
}
.planets {
  float: left;
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 30em;
  li {
    cursor: pointer;
    position: relative;
    background-color: #f7f7f7;
    margin: 0.5em;
    height: 3.2em;
    border-radius: 4px;
    &:hover {
      color: #607d8b;
      color: rgb(0, 120, 215);
      background-color: #ddd;
      left: 1px;
    }
    &.selected:hover {
      color: white;
    }
  }
  .text {
    position: relative;
    top: -3px;
  }
  .terrain {
    margin: 5px 2.3px;
  }
  .name {
    font-weight: bold;
  }
  .planet-container {
    display: flex;
    flex-flow: row wrap;
  }
  > * {
    flex: 1 100%;
  }
  .planet-element {
    display: flex;
    flex-flow: row wrap;
    flex: 18 auto;
    order: 1;
    padding: 0;
    margin: 0;
  }
  .planet-text {
    flex: 1 auto;
    order: 2;
    padding: 0.2em 0.5em;
  }
  .badge {
    flex: 1 auto;
    order: 1;
    font-size: small;
    color: #ffffff;
    padding: 1.2em 1em 0em 1em;
    background-color: #607d8b;
    background-color: rgb(0, 120, 215);
    background-color: rgb(134, 183, 221);
    margin: 0em 0em 0em 0em;
    border-radius: 4px 0 0 4px;
    max-width: 1.5em;
  }
}
</style>
