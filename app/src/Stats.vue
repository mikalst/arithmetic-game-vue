<template class="stats">
        <nav class="navbar is-primary is-flex is-align-items-center	is-size-4">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Home
        </a>
        <a class="navbar-item" v-bind:href="personId ? '/stats?personId=' + personId : '/stats'">
          Stats
        </a>
        <p class="navbar-item">
          {{ this.personId }}
        </p>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
      </div>
      <div class="navbar-end">
      </div>
    </div>
    </nav>
  <div class="stats container is-max-desktop">
    <TableComponent ref="stats" :title="'Your recent scores'" :personId="personId" :stats="mostRecentStats" />
  </div>
</template>

<script>

import TableComponent from './components/Table.vue'


export default {
  name: 'StatsComponent',
  components: {
    TableComponent,
  },
  data: function() {
    return {
      mostRecentStats: [],
      waitSeconds: 5,
      personId: "",
      timer: null
    }
  },
  methods: {
    start: function() {
      clearInterval(this.timer);
      this.waitSeconds = 1;
      this.timer = setInterval((context) => {
        context.waitSeconds--;
        if (context.waitSeconds === 0) {
          clearInterval(this.timer);
          this.$refs.stats.fetchScore(this.personId, 100);
        }
      }, 1000, this);
    }
  },
  mounted: function () {
    this.personId = new URLSearchParams(window.location.search).get("personId");
    if (this.personId) {
      this.$refs.stats.fetchScore(this.personId, 100);
      this.$refs.inputIdentifier.value = this.personId;
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 1rem;
  font-size: calc(1.5vw + 1vmin);
}
</style>