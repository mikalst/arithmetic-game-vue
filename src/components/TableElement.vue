<template>
  <tr>
    <td>
      {{ date.getDate() + '/' + date.getMonth() }}
    </td>
    <td>
      {{ dataRow.Result['_'] }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Input',
  props: ['dataRow'],
  computed: {
    date: function () {
      return (new Date(this.dataRow.Timestamp['_'])); 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
