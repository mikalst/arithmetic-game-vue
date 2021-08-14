<template>
<div>
  <div v-show="fetched"> <a v-bind:href="'/stats?personId=' + personId"> Statistics </a> </div>
  <div v-show="stats.length === 0 && fetched"> No results found </div>
  <section class="row-bars">
    
    <template v-for="row in stats" :key="row.RowKey">
    <div class="scorebar" v-bind:style=
    " 
      { 
        'color': 'rgb(' +  Math.max(0, 255 - 10*parseInt(row.Result['_'])) + ',' + Math.min(255, 10*parseInt(row.Result['_'])) + ',0)'
      } 
    ">
      {{ new Date(row.Timestamp['_']).getDate() + "/" + (parseInt(new Date(row.Timestamp['_']).getMonth()) + 1) }} : {{ row.Result['_'] }}
    </div>
    </template>
  </section>
</div>

</template>

<script>

export default {
  name: 'Table',
  components: {
  },
  props: [
    'personId'
  ],
  data: () => ({
    stats: [],
    fetched: false
  }),
  methods: {
    fetchScore: async function(personId, numberOfDays=30) {
      console.log(`Fetching score for ${personId} ...`);
      const res = await fetch(
        process.env.VUE_APP_API_PATH+`getStatistics?person=${personId}&numberOfDays=${numberOfDays}`);
      let json = await res.json();
      this.stats = json.sort((a, b) => Date.parse(b.Timestamp['_']) - Date.parse(a.Timestamp['_']));
      this.fetched = true;
    }
  }
}
</script>

<style scoped>
</style>