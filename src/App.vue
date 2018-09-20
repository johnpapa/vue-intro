<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <nav>
      <ul>
        <li class="nav-item">
          <router-link class="nav-link" exact to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" exact to="/people">People</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" exact to="/planets">Planets</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" exact to="/about">About</router-link>
        </li>
      </ul>
      <div class="header-bar"></div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'My Vue Star Wars App',
    };
  },
};
</script>

<style lang="scss">
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  color: inherit;
}
.nav-link {
  text-decoration: none;
  color: inherit;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-top: 10px !important;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-complete-leave-active {
  position: absolute;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
.flip-list-move {
  transition: transform 1s;
}
body,
input[text],
button {
  color: #888;
  font-family: Arial;
}
button {
  color: #888;
  font-family: Arial;
  font-size: 14px;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  &:hover {
    background-color: #cfd8dc;
  }
}
body {
  margin: 2em;
}
div {
  margin: 0.1em;
}
.header-bar {
  background-color: rgb(0, 120, 215);
  height: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
}
label {
  display: inline-block;
  width: 4em;
  margin: 0.5em 0;
  color: #888;
  &.value {
    margin-left: 10px;
    font-size: 14px;
  }
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: 0.4em;
  &::placeholder {
    color: lightgray;
    font-weight: normal;
    font-size: 12px;
    letter-spacing: 3px;
  }
}
.router-link-active {
  padding: 8px;
  background-color: rgb(0, 120, 215);
  color: white;
  border-radius: 4px;
}
</style>
