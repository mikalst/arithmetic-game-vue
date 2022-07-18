<template>
<div id="table" class="mt-2 container">
  <!-- <div v-show="showLink"> <a v-bind:href="personId ? '/stats?personId=' + personId : '/stats'"> Statistics </a> </div> -->
  <div v-show="stats.length === 0 && fetched"> No results found </div>
  <section>
    <div class="columns is-mobile is-centered is-multiline" style="width:fit-content">
      <template v-for="row in stats" :key="row.RowKey">
        <div class="column is-6 is-size-4" v-bind:style="Object.assign(styledResult(row.Result['_']), {'text-align': 'right'})">
          {{ new Date(row.Timestamp['_']).getDate() + "/" + (parseInt(new Date(row.Timestamp['_']).getMonth()) + 1) }} :
        </div>
        <div class="column is-6 is-size-4" v-bind:style="styledResult(row.Result['_'])">
          {{ row.Result['_'] }}
        </div>
        <progress class="progress" 
          v-bind:style="styledResult(row.Result['_'])"
          v-bind:value="row.Result['_']" 
          max="25">row.Result['_']
        </progress>
      </template>
    </div>
  </section>
</div>

</template>

<script>

export default {
  name: 'TableComponent',
  components: {
  },
  props: {
    personId: {
      type: String,
      default: ""
    },
    showLink: {
      type: Boolean,
      default: false
    }
  },
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
      console.log(`Fetched.`)
    },
    styledResult: function(result)
    {
        return { 
            'color': 'rgb(' +  Math.max(0, 255 - 10*parseInt(result)) + ',' + Math.min(255, 10*parseInt(result)) + ',0)'
        };
    }
  }
}
</script>

<style scoped>
#table {
  width: fit-content;
}

progress[value]::-webkit-progress-value {
  background-image:
     -webkit-linear-gradient(top, 
                             rgba(255, 255, 255, .25), 
                             rgba(0, 0, 0, .25)),
     -webkit-linear-gradient(
        left,
         hsl(348, 100%, 61%),
         hsl(141, 71%, 48%));
    border-radius: 2px; 
    background-size: 35px 20px, 100% 100%, 100% 100%;
}

</style>