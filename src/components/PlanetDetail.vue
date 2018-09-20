<template>
  <div class="editarea">
    <div>
      <div class="editfields">
        <div>
          <label>id: </label>
          <input v-if="addingPlanet" type="number" v-model="editingPlanet.id" ref="id" placeholder="id" />
          <label v-if="!addingPlanet" class="value">{{editingPlanet.id}}</label>
        </div>
        <div>
          <label>name: </label>
          <input v-model="editingPlanet.name" ref="name" placeholder="name" />
        </div>
        <div>
          <label>birth year: </label>
          <input v-model="editingPlanet.terrain" placeholder="terrain" @keyup.enter="save" />
        </div>
      </div>
      <button @click="clear">Cancel</button>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    planet: {
      type: Object,
      default() {},
    },
  },

  data() {
    return {
      addingPlanet: !this.planet,
      editingPlanet: { ...this.planet },
    };
  },

  watch: {
    planet(newPlanet, originalPlanet) {
      console.log(newPlanet.name);
      console.log(originalPlanet.name);
      this.editingPlanet = { ...this.planet };
      this.setFocus();
    },
  },

  mounted() {
    this.setFocus();
  },

  methods: {
    setFocus() {
      if (this.addingPlanet && this.editingPlanet) {
        this.$refs.id.focus();
      } else {
        this.$refs.name.focus();
      }
    },

    addPlanet() {
      this.emitRefresh('add');
    },

    clear() {
      this.$emit('unselect');
      this.editingPlanet = null;
    },

    emitRefresh(mode) {
      this.$emit('planetChanged', { mode, planet: this.editingPlanet });
      this.clear();
    },

    save() {
      this.addingPlanet ? this.addPlanet() : this.updatePlanet();
    },

    updatePlanet() {
      this.emitRefresh('update');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';
.editarea {
  @include editarea;
}
</style>
