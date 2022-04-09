<template>
  <div>
    <button class="button is-primary is-responsive is-size-3" v-on:click="onClick" v-bind:disabled="inputDisabled"> 
      <span>Start</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'StartButton',
  data: function () {
    return {
      inputDisabled: false
    }
  },
  methods: {
    onClick: function () {
      this.$emit('clicked');
    },
    setStartButtonDisabled: function() {
      this.inputDisabled=true;
    },
    setStartButtonEnabled: function() {
      this.inputDisabled=false;
    }
  },
  emits: ['clicked']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
