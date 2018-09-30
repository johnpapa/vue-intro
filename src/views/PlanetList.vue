<template>
  <div>
    <div class="button-group">
      <button @click="getPlanets">Refresh</button>
      <button @click="enableAddMode" v-if="!addingPlanet && !selectedPlanet">Add</button>
    </div>
    <transition-group name="list-complete" tag="ul" mode="out-in" class="planets" v-if="planets && planets.length">
      <li v-for="planet in planets" :key="planet.id" class="list-container" :class="{selected: planet === selectedPlanet}">
        <div class="list-element">
          <div class="badge">{{planet.id}}</div>
          <div class="item-text" @click="onSelect(planet)">
            <div class="name">{{planet.name}}</div>
            <div class="sub-text">{{planet.terrain | ellipsis(22)}}</div>
          </div>
        </div>
        <button class="delete-button" @click="deletePlanetAndReset(planet)">Delete</button>
      </li>
    </transition-group>
    <PlanetDetail v-if="selectedPlanet || addingPlanet" :planet="selectedPlanet" @unselect="clear" @planetChanged="save">
    </PlanetDetail>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import PlanetDetail from '@/components/PlanetDetail.vue';
import { ADD_PLANET, UPDATE_PLANET, DELETE_PLANET } from '@/store';

export default {
  data() {
    return {
      selectedPlanet: null,
      addingPlanet: false,
    };
  },
  components: {
    PlanetDetail,
  },
  computed: {
    ...mapGetters('planets', { planets: 'sortedPlanets' }),
  },
  created() {
    this.getPlanets();
  },
  methods: {
    ...mapActions('planets', ['getPlanets']),
    ...mapMutations('planets', [ADD_PLANET, UPDATE_PLANET, DELETE_PLANET]),
    clear() {
      this.addingPlanet = false;
      this.selectedPlanet = null;
    },
    deletePlanetAndReset(planet) {
      this.DELETE_PLANET(planet);
      this.clear();
    },
    enableAddMode() {
      this.addingPlanet = true;
      this.selectedPlanet = null;
    },
    onSelect(planet) {
      this.selectedPlanet = planet;
    },
    save(arg) {
      const planet = arg.planet;
      console.log('planet changed', planet);
      arg.mode === 'add' ? this.ADD_PLANET(planet) : this.UPDATE_PLANET(planet);
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
