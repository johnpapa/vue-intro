<template>
  <div>
    <div class="button-group">
      <button @click="getPeople">Refresh</button>
      <button @click="enableAddMode" v-if="!addingPerson && !selectedPerson">Add</button>
    </div>
    <transition-group name="list-complete" tag="ul" mode="out-in" class="people" v-if="people && people.length">
      <li v-for="person in people" :key="person.id" class="person-container list-complete-item" :class="{selected: person === selectedPerson}">
        <div class="person-element">
          <div class="badge">{{person.id}}</div>
          <div class="person-text" @click="onSelect(person)">
            <div class="name">{{person.name}}</div>
            <div class="birth-year">{{person.birth_year}}</div>
          </div>
        </div>
        <button class="delete-button" @click="deletePerson(person)">Delete</button>
      </li>
    </transition-group>
    <PersonDetail v-if="selectedPerson || addingPerson" :person="selectedPerson" @unselect="unselect" @personChanged="save">
    </PersonDetail>
  </div>
</template>

<script>
import axios from 'axios';
import PersonDetail from '@/components/PersonDetail.vue';
import config from '@/shared/config';

const { API } = config;

export default {
  data() {
    return {
      addingPerson: false,
      selectedPerson: null,
      people: [],
    };
  },
  components: {
    PersonDetail,
  },

  created() {
    this.getPeople();
  },

  methods: {
    clear() {
      this.addingPerson = false;
      this.selectedPerson = null;
    },

    deletePerson(person) {
      this.people = this.people.filter(h => h !== person);
      if (this.selectedPerson === person) {
        this.selectedPerson = null;
        this.clear();
      }
    },

    enableAddMode() {
      this.addingPerson = true;
      this.selectedPerson = null;
    },

    getPeople() {
      this.people = [];
      this.clear();
      return this.getPeopleData().then(people => (this.people = people));
    },

    getPeopleData() {
      let index = 1;
      return axios.get(`${API}/people/`).then(response => {
        const people = response.data.results.map(h => {
          h.id = index++;
          return h;
        });
        return people;
      });
    },
    onSelect(person) {
      this.selectedPerson = person;
    },

    save(arg) {
      const person = arg.person;
      console.log('person changed', person);
      if (arg.mode === 'add') {
        this.people.push(person);
      } else {
        const index = this.people.findIndex(h => person.id === h.id);
        this.people.splice(index, 1, person);
      }
    },

    unselect() {
      this.addingPerson = false;
      this.selectedPerson = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.button-group {
  margin: 0.5em;
}
button.delete-button {
  background-color: rgb(216, 59, 1);
  color: white;
  padding: 4px;
  position: relative;
  font-size: 12px;
  max-width: 50px;
}
.selected {
  background-color: rgb(0, 120, 215) !important;
  color: white;
}
.people {
  float: left;
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 20em;
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
  .birth-year {
    margin: 5px 2.3px;
  }
  .name {
    font-weight: bold;
  }
  .person-container {
    display: flex;
    flex-flow: row wrap;
  }
  > * {
    flex: 1 100%;
  }
  .person-element {
    display: flex;
    flex-flow: row wrap;
    flex: 18 auto;
    order: 1;
    padding: 0;
    margin: 0;
  }
  .delete-button {
    flex: 1 auto;
    order: 2;
    border-radius: 0 4px 4px 0;
  }
  .person-text {
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
