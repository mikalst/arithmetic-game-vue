<template>
<div style="min-width: 600px">
  <progress v-if="!(remainingMilliseconds === null)" class="progress" style="width: 100%;" v-bind:value="remainingMilliseconds" max="60000">{{ remainingMilliseconds / 1000 }} remains</progress>
</div>
</template>

<script>
export default {
  name: 'TimerComponent',
  data: function () {
    return {
      remainingMilliseconds: null,
      timer: null
    }
  },
  emits: ['activeEnded'],
  methods: {
    start: function() {
      clearInterval(this.timer);
      this.remainingMilliseconds = 60000;
      this.timer = setInterval((context) => {
        context.remainingMilliseconds = context.remainingMilliseconds - 100;
        if (context.remainingMilliseconds === 0) {
          clearInterval(this.timer);
          this.$emit('activeEnded');
        }
      }, 100, this);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
