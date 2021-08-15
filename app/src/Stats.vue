<template class="stats">
    <InputText 
        ref="inputIdentifier"
        v-model="personId"
        v-on:keyup="start"
        :placeholder="'Please enter your name ...'"
    />
  <div class="stats">
    <Table ref="stats" :title="'Your recent scores'" :personId="personId" :stats="mostRecentStats" />
  </div>
</template>

<script>

import Table from './components/Table.vue'
import InputText from './components/InputText.vue'


export default {
  name: 'Stats',
  components: {
    Table,
    InputText
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 1rem;
  font-size: calc(1.5vw + 1vmin);
}
input, button{
  font-size: calc(1.5vw + 1vmin);
}

@media (max-width: 700px) {
  #app{
    font-size: calc(3vw + 1vmin);
  }
  input, button, div{
    font-size: calc(3vw + 1vmin);
    padding: 0.1rem;
  }
}

.pTable {
  width: 60%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 768px) {
  .pTable {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>