<template>
  <div>
    <div class="button-group">
      <button @click="getPeople">Refresh</button>
      <button @click="enableAddMode" v-if="!addingPerson && !selectedPerson">Add</button>
    </div>
    <transition-group name="list-complete" tag="ul" mode="out-in" class="people" v-if="people && people.length">
      <li v-for="person in people" :key="person.id" class="list-container list-complete-item" :class="{selected: person === selectedPerson}">
        <div class="list-element">
          <div class="badge">{{person.id}}</div>
          <div class="item-text" @click="onSelect(person)">
            <div class="name">{{person.name}}</div>
            <div class="sub-text">{{person.birth_year}}</div>
          </div>
        </div>
        <button class="delete-button" @click="deletePersonAndReset(person)">Delete</button>
      </li>
    </transition-group>
    <PersonDetail v-if="selectedPerson || addingPerson" :person="selectedPerson" @unselect="clear" @personChanged="save">
    </PersonDetail>
  </div>
</template>

<script>
import PersonDetail from '@/components/PersonDetail.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'PeopleList',
  data() {
    return {
      addingPerson: false,
      selectedPerson: null,
    };
  },
  components: {
    PersonDetail,
  },

  created() {
    this.getPeople();
  },

  computed: {
    // people() {
    //   return this.$store.state.people.people;
    // },
    ...mapGetters('people', { people: 'sortedPeople' }),
  },

  methods: {
    ...mapActions('people', ['getPeople']),
    ...mapMutations('people', ['addPerson', 'deletePerson', 'updatePerson']),

    clear() {
      this.addingPerson = false;
      this.selectedPerson = null;
    },

    deletePersonAndReset(person) {
      this.deletePerson(person);
      this.clear();
    },

    enableAddMode() {
      this.addingPerson = true;
      this.selectedPerson = null;
    },

    onSelect(person) {
      this.selectedPerson = person;
    },

    save(arg) {
      const person = arg.person;
      console.log('person changed', person);
      if (arg.mode === 'add') {
        this.addPerson(person);
      } else {
        this.updatePerson(person);
      }
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
.people {
  @include list;
}
</style>
