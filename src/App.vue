<template>
  <aside class="app-left-aside">
    <button
      class="button-book material-icons md-36 icon-blue"
      @click="this.$store.dispatch('clearHistory'); this.$router.push('/book')">
      menu_book
    </button>
  </aside>
  <router-view />
</template>

<style>
#app {
  text-align: center;
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
