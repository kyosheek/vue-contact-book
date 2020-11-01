<template>
  <div class="app-left-aside">
    <button @click="this.$router.push('/book')">Book</button><div id="flexBreak"></div>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#app {
  display: flex;
  flex-direction: row;
}

.app-left-aside {
  flex: 0 1 20vw;
  text-align: left;
}
</style>
