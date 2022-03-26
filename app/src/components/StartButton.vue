<template>
  <div>
    <button class="button is-primary is-responsive" v-on:click="onClick"> 
      <span>Start</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'StartButton',
  methods: {
    onClick: function () {
      this.$emit('clicked');
    }
  },
  emits: ['clicked']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
