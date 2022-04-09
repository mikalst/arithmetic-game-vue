<template>
    <h1 class="is-size-3">
      Correct: {{ correct }}
    </h1>
</template>

<script>
export default {
  name: 'CounterComponent',
  props: ['correct']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
