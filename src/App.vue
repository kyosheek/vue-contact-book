<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <div id="myApp">
    <div id="leftNav">
      <button @click="this.$router.go(-1)">Back</button><div id="flexBreak"></div>
      <button @click="this.$router.go(1)">Forward</button><div id="flexBreak"></div>
      <button @click="this.$router.push('/book')">Book</button><div id="flexBreak"></div>
    </div>
    <router-view/>
  </div>
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

#myApp {
  display: flex;
  flex-direction: row;
}

#leftNav {
  flex: 1 1 20vw;
  text-align: left;
}

</style>
