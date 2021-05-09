<template>
<div>
  <h2>{{ title }}</h2>
    <table style="margin:auto">
    <tr>
    <th>Date</th>
    <th>Score</th>
    </tr>
  <HighscoreTableElement v-for="row in stats" :key="row.RowKey" :dataRow="row"
  />
  </table>
</div>
</template>

<script>
import HighscoreTableElement from './HighscoreTableElement'

export default {
  name: 'HighscoreTable',
  components: {
    HighscoreTableElement
  },
  props: ['stats', 'title']
}
</script>