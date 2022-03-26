<template>
    <div>
      Correct: {{ correct }}
    </div>
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
