<template>
  <div>
    <div class="button-group">
      <button @click="getPlanets">Refresh</button>
    </div>
    <ul class="planets" v-if="planets && planets.length">
      <li v-for="planet in planets" :key="planet.id" class="list-container" :class="{selected: planet === selectedPlanet}">
        <div class="list-element">
          <div class="badge">{{planet.id}}</div>
          <div class="item-text" @click="onSelect(planet)">
            <div class="name">{{planet.name}}</div>
            <div class="sub-text">{{planet.terrain | ellipsis(30)}}</div>
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
@import '@/styles.scss';

.button-group {
  @include button-group;
}
button.delete-button {
  @include button-delete;
}
.selected {
  @include selected-item;
}
.planets {
  @include list;
}
</style>
