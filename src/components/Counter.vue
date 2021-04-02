<template>
  <div class="counter">
    <h1>Correct: {{ correct }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: ['correct']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
