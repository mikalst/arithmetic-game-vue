<template>
<div>
  <section class="row-bars">
    <template v-for="row in stats" :key="row.RowKey">
    <div class="scorebar" v-bind:style=
    " 
      { 
        width: (15 + Math.min(85, 3*parseInt(row.Result['_']))) + '%',
        'background-color': 'rgb(' +  Math.max(0, 255 - 10*parseInt(row.Result['_'])) + ',' + Math.min(255, 10*parseInt(row.Result['_'])) + ',0)'
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
  props: ['stats']
}
</script>
<style scoped>
.scorebar {
  display: block;
  margin: 0.1rem;
  margin-left: auto;
  margin-right: auto;
  color: azure;
  background-color:  #ff1e0e;
}

</style>