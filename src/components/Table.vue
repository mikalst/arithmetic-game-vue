<template>
<div>
  {{ title }}
    <table style="margin:auto">
    <tr>
    <th>Date</th>
    <th>Score</th>
    </tr>
  <TableElement v-for="row in stats" :key="row.RowKey" :dataRow="row"
  />
  </table>
</div>
</template>

<script>
import TableElement from './TableElement'

export default {
  name: 'Table',
  components: {
    TableElement
  },
  props: ['stats', 'title']
}
</script>