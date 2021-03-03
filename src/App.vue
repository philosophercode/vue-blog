<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-link :to="{ name: 'Blogs' }">
      <button>BLOGS</button>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  --purple: #2a306e;
  --yellow: #fae635;
  --lightGray: #9697b1;
  --grey: #0f0c0e;
}

#app {
  font-family: Nunito Sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
