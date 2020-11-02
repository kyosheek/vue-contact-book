<template>
  <nav class="app-left-aside">
    <button
      class="button-book mdc-icon-button material-icons md-36 icon-blue"
      @click="this.$router.push('/book')">
      menu_book
    </button>
  </nav>
  <router-view />
</template>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app {
  display: flex;
  flex-direction: row;
}

.button-book {
  width: 80px;
  height: 80px;
  margin-top: 20px;
  position: fixed;

  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.app-left-aside {
  flex: 1 1 20vw;
  display: flex;
  flex-direction: row-reverse;
}
</style>
