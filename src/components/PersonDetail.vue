<template>
  <div class="editarea">
    <div>
      <div class="editfields">
        <div>
          <label>id: </label>
          <input v-if="addingPerson" type="number" v-model="editingPerson.id" ref="id" placeholder="id" />
          <label v-if="!addingPerson" class="value">{{editingPerson.id}}</label>
        </div>
        <div>
          <label>name: </label>
          <input v-model="editingPerson.name" ref="name" placeholder="name" />
        </div>
        <div>
          <label>birth year: </label>
          <input v-model="editingPerson.birth_year" placeholder="birth year" @keyup.enter="save"/>
        </div>
      </div>
      <button @click="clear">Cancel</button>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { person: { type: Object } },

  data() {
    return {
      addingPerson: !this.person,
      editingPerson: this.cloneIt()
    };
  },

  watch: {
    person() {
      this.editingPerson = this.cloneIt();
      this.setFocus();
    }
  },

  mounted() {
    this.setFocus();
  },

  methods: {
    setFocus() {
      if (this.addingPerson && this.editingPerson) {
        this.$refs.id.focus();
      } else {
        this.$refs.name.focus();
      }
    },

    addPerson() {
      const person = this.editingPerson;
      this.emitRefresh('add');
    },

    clear() {
      this.$emit('unselect');
      this.editingPerson = null;
    },

    cloneIt() {
      return Object.assign({}, this.person);
    },

    emitRefresh(mode) {
      this.$emit('personChanged', { mode: mode, person: this.editingPerson });
      this.clear();
    },

    save() {
      if (this.addingPerson) {
        this.addPerson();
      } else {
        this.updatePerson();
      }
    },

    updatePerson() {
      const person = this.editingPerson;
      this.emitRefresh('update');
    }
  }
};
</script>

<style lang="scss" scoped>
.editarea {
  float: left;
  input {
    margin: 4px;
    height: 20px;
    color: rgb(0, 120, 215);
  }
  button {
    margin: 8px;
  }
  .editfields {
    margin-left: 12px;
  }
}
</style>
